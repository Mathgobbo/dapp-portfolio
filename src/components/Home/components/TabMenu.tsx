import { useMachine, useSelector } from "@xstate/react";
import { useState } from "react";
import { alchemy } from "../../../configs/alchemy";
import { useWeb3Wallet, walletSelector } from "../../../context/Web3WalletContext";
import { walletAssetsMachine } from "../../../machines/walletAssetsMachine";
import { TokenResponse } from "../../../types/TokenResponse";
import { NFTsTab } from "./NftsTab";
import { TokensTab } from "./TokensTab";

export const TabMenu = () => {
  const web3Service = useWeb3Wallet();
  const walletAddress = useSelector(web3Service, walletSelector);

  const [state, send] = useMachine(walletAssetsMachine, {
    services: {
      loadNfts: async (context, event) => {
        if (!walletAddress) throw new Error("Wallet not connected");
        const nfts = await alchemy.nft.getNftsForOwner(walletAddress);
        return nfts.ownedNfts;
      },
      loadTokens: async () => {
        if (!walletAddress) throw new Error("Wallet not connected");
        const finalArr: TokenResponse[] = [];
        const balances = await alchemy.core.getTokenBalances(walletAddress);
        const nonZeroBalances = balances.tokenBalances.filter((token) => {
          return token.tokenBalance !== "0";
        });

        let i = 1;
        for (let token of nonZeroBalances) {
          let balance = token.tokenBalance as any;
          const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
          let formattedBalance = balance / Math.pow(10, metadata.decimals as number);
          let formattedBalanceStr = formattedBalance.toFixed(2);
          finalArr.push({
            ...metadata,
            balance: formattedBalanceStr,
          });
        }
        return finalArr;
      },
    },
  });
  const [selectedTab, setSelectedTab] = useState<"NFTS" | "TOKENS">("NFTS");

  const { loadingNfts, nfts, loadNftsError, loadTokenError, loadingTokens, tokens } = state.context;
  return (
    <section className="w-full">
      <div className="flex justify-around">
        <h3
          onClick={() => setSelectedTab("NFTS")}
          className={`${selectedTab === "NFTS" ? "font-bold" : "font-normal"} cursor-pointer`}
        >
          NFTs
        </h3>
        <h3
          onClick={() => setSelectedTab("TOKENS")}
          className={`${selectedTab === "TOKENS" ? "font-bold" : "font-normal"} cursor-pointer`}
        >
          Tokens
        </h3>
      </div>
      <hr className="my-2" />
      <div>
        {selectedTab === "NFTS" ? (
          <NFTsTab error={loadNftsError} loading={loadingNfts} nfts={nfts} />
        ) : (
          <TokensTab error={loadTokenError} loading={loadingTokens} tokens={tokens} />
        )}
      </div>
    </section>
  );
};
