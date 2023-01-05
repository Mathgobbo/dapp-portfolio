import {
  currentStateSelector,
  errorSelector,
  isLoggedInSelector,
  loadingSelector,
  useWeb3Wallet,
  walletSelector,
} from "../../context/Web3WalletContext";
import { useSelector } from "@xstate/react";
import { TabMenu } from "./components/TabMenu";
export default function Home() {
  const web3Service = useWeb3Wallet();
  const walletAddress = useSelector(web3Service, walletSelector);
  const loading = useSelector(web3Service, loadingSelector);
  const error = useSelector(web3Service, errorSelector);
  const isLoggedIn = useSelector(web3Service, isLoggedInSelector);
  const currentState = useSelector(web3Service, currentStateSelector);

  return (
    <div className="App">
      <header className="flex items-center justify-center w-full shadow-md p-5">
        <h1 className="font-bold text-2xl">DAPP Portfolio</h1>
      </header>

      <main className="p-4 items-center flex flex-col">
        <div>
          <h2>{JSON.stringify(currentState)}</h2>
          <h2>{JSON.stringify({ walletAddress, error, loading })}</h2>
          {!isLoggedIn && (
            <>
              <button
                onClick={() => web3Service.send({ type: "connectWallet" })}
                className="border rounded-md p-4 px-12 hover:bg-gray-800 hover:text-white transition  border-gray-800 font-semibold"
              >
                Connect your Wallet
              </button>
              <p className="mt-1 text-gray-800">And take knowledge of all your on-chain assets! ✨</p>
            </>
          )}

          {isLoggedIn && <TabMenu />}
        </div>
      </main>
    </div>
  );
}
