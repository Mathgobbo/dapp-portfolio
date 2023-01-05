import { useSelector } from "@xstate/react";
import { useWeb3Wallet, Web3State } from "../../../context/Web3WalletContext";

const nftsSelector = (state: Web3State) => {
  const { nfts, loadNftsError, loadingNfts } = state.context;
  return {
    nfts,
    loading: loadingNfts,
    error: loadNftsError,
  };
};
export const NFTsTab = () => {
  const web3Service = useWeb3Wallet();
  // const { error, loading, nfts } = useSelector(web3Service, nftsSelector);

  return (
    <div>
      {/* <p>{JSON.stringify({ error, loading, nfts })}</p> */}
      {/* {loading && "LOADING..."}
      {!loading && (
        <>
          {nfts.length > 0
            ? nfts.map((nft) => (
                <p key={nft.contract + "-" + nft.tokenId}>
                  {nft.tokenId} - {nft.title}
                </p>
              ))
            : "You dont have any nft yet"}
        </>
      )} */}
    </div>
  );
};
