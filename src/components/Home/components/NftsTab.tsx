import { OwnedNft } from "alchemy-sdk";

export const NFTsTab = ({ error, loading, nfts }: { nfts: OwnedNft[]; loading: boolean; error: any }) => {
  return (
    <div>
      {/* <p>{JSON.stringify({ error, loading, nfts })}</p> */}
      {loading && "LOADING..."}
      {!loading && (
        <section className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {nfts.length > 0
            ? nfts.map((nft) => {
                let imageSrc =
                  !!nft?.rawMetadata?.image || !!nft.rawMetadata?.img
                    ? nft.rawMetadata.image || nft.rawMetadata?.img
                    : undefined;
                if (imageSrc && imageSrc.indexOf("ipfs://") > -1)
                  imageSrc = "https://ipfs.io/ipfs/" + imageSrc.split("ipfs://")[1];
                return (
                  <div
                    className=" space-x-2 border border-gray-500 rounded-xl p-2"
                    key={nft.contract + "-" + nft.tokenId}
                  >
                    {!!imageSrc && <img className="h-24 rounded-xl" src={imageSrc} />}
                    <div>
                      <h4 className="text-xl text-gray-800 font-bold">{nft.title}</h4>
                      <p className="text-sm text-gray-600">Token id: {nft.tokenId}</p>
                      {!!nft.contract.name && <p className="text-sm text-gray-600">Collection: {nft.contract.name}</p>}
                      <p className="text-sm text-gray-600">{nft.contract.tokenType}</p>
                    </div>
                    {/* <p>{JSON.stringify(nft)}</p> */}
                    {!!nft.description && (
                      <>
                        <hr className="my-2" />
                        <p className="text-sm text-gray-700 overflow-auto">{nft.description}</p>
                      </>
                    )}
                  </div>
                );
              })
            : "You dont have any nft yet"}
        </section>
      )}
    </div>
  );
};
