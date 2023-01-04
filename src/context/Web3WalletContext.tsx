import { useInterpret, useSelector } from "@xstate/react";
import { createContext, ReactNode, useContext } from "react";
import { InterpreterFrom, State } from "xstate";
import { web3WalletMachine } from "../machines/web3WalletMachine";

export const Web3WalletContext = createContext({} as InterpreterFrom<typeof web3WalletMachine>);

const sleep = async (delay = 1500) =>
  await new Promise((resolve, reject) => {
    setTimeout(() => resolve(""), delay);
  });

export const Web3WalletProvider = ({ children }: { children: ReactNode }) => {
  const web3WalletService = useInterpret(web3WalletMachine, {
    services: {
      connectWallet: async () => {
        await sleep();
        // throw new Error("SNATA CLAUS");
        return "aaa";
      },
      loadLoggedWallet: async () => {
        await sleep(3000);
        throw new Error("HO NOE");
        return "asas";
      },
    },
  });

  return <Web3WalletContext.Provider value={web3WalletService}>{children}</Web3WalletContext.Provider>;
};

export const useWeb3Wallet = () => useContext(Web3WalletContext);

type Web3State = State<{
  walletAddress: string | undefined;
  errorMessage: string | undefined;
  loading: boolean;
}>;
export const walletSelector = (state: Web3State) => state.context.walletAddress;
export const errorSelector = (state: Web3State) => state.context.errorMessage;
export const loadingSelector = (state: Web3State) => state.context.loading;
export const currentStateSelector = (state: Web3State) => state.value;
