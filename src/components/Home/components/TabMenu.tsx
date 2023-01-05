import { useMachine, useSelector } from "@xstate/react";
import { useState } from "react";
import { alchemy } from "../../../configs/alchemy";
import { useWeb3Wallet, walletSelector } from "../../../context/Web3WalletContext";
import { walletAssetsMachine } from "../../../machines/walletAssetsMachine";
import { NFTsTab } from "./NftsTab";

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
        // await sleep(3000);
        return [];
      },
    },
  });
  const [selectedTab, setSelectedTab] = useState<"NFTS" | "TOKENS">("NFTS");
  return (
    <section>
      <div className="flex justify-around">
        <h3>NFTs</h3>
        <h3>Tokens</h3>
      </div>

      <div>{selectedTab === "NFTS" ? <NFTsTab /> : <></>}</div>
    </section>
  );
};
