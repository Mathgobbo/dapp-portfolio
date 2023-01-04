import {
  currentStateSelector,
  errorSelector,
  loadingSelector,
  useWeb3Wallet,
  walletSelector,
} from "../../context/Web3WalletContext";
import { useSelector } from "@xstate/react";
export default function Home() {
  const web3Service = useWeb3Wallet();
  const walletAddress = useSelector(web3Service, walletSelector);
  const loading = useSelector(web3Service, loadingSelector);
  const error = useSelector(web3Service, errorSelector);
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
          <button
            onClick={() => web3Service.send({ type: "connectWallet" })}
            className="border rounded-md p-4 px-12 hover:bg-gray-800 hover:text-white transition  border-gray-800 font-semibold"
          >
            Connect your Wallet
          </button>
        </div>
        <p className="mt-1 text-gray-800">And take knowledge of all your on-chain assets! ✨</p>
      </main>
    </div>
  );
}
