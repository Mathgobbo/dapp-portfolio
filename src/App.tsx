import Home from "./components/Home";
import { Web3WalletProvider } from "./context/Web3WalletContext";

function App() {
  return (
    <Web3WalletProvider>
      <Home />
    </Web3WalletProvider>
  );
}

export default App;
