import { TokenResponse } from "../../../types/TokenResponse";

export const TokensTab = ({ error, loading, tokens }: { tokens: TokenResponse[]; loading: boolean; error: any }) => {
  return (
    <div>
      {/* <p>{JSON.stringify({ error, loading, nfts })}</p> */}
      {loading && "LOADING..."}
      {!loading && (
        <section className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {tokens.length > 0
            ? tokens.map((token) => {
                return (
                  <div className="flex space-x-2 border border-gray-500 rounded-xl p-2" key={token.symbol}>
                    {!!token.logo && <img src={token.logo} alt={token.name || ""} />}
                    <div>
                      <p className="font-semibold text-lg">{token.name}</p>
                      <p className="text-lg">
                        Your balance:{" "}
                        <strong className="text-gray-800">
                          {token.balance} {token.symbol}
                        </strong>
                      </p>
                    </div>
                  </div>
                );
              })
            : "You dont have any Token yet"}
        </section>
      )}
    </div>
  );
};
