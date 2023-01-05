import { useInterpret } from "@xstate/react";
import { ethers } from "ethers";
import { createContext, ReactNode, useContext } from "react";
import { InterpreterFrom, State } from "xstate";
import { alchemy } from "../configs/alchemy";
import { web3WalletMachine } from "../machines/web3WalletMachine";
import { OwnedNft } from "alchemy-sdk/dist/src/types/types";

export const Web3WalletContext = createContext({} as InterpreterFrom<typeof web3WalletMachine>);

const sleep = async (delay = 1500) =>
  await new Promise((resolve, reject) => {
    setTimeout(() => resolve(""), delay);
  });

const getProvider = () => {
  if (!!(window as any).ethereum) return new ethers.providers.Web3Provider((window as any).ethereum);
  throw new Error("Metamask not installed");
  // return ethers.providers.getDefaultProvider();
};

export const Web3WalletProvider = ({ children }: { children: ReactNode }) => {
  const web3WalletService = useInterpret(web3WalletMachine, {
    services: {
      connectWallet: async () => {
        // await sleep();
        const provider = getProvider();
        const response = await provider.send("eth_requestAccounts", []);
        return response[0];
      },
      loadLoggedWallet: async () => {
        const provider = getProvider();
        const response = await provider.listAccounts();
        if (response.length === 0) throw new Error("");
        return response[0];
      },
    },
  });

  return <Web3WalletContext.Provider value={web3WalletService}>{children}</Web3WalletContext.Provider>;
};

export const useWeb3Wallet = () => useContext(Web3WalletContext);

export type Web3State = State<{
  walletAddress: string | undefined;
  errorMessage: string | undefined;
  loading: boolean;
  loadingNfts: boolean;
  loadingTokens: boolean;
  nfts: OwnedNft[];
  tokens: string[];
  loadTokenError: string | undefined;
  loadNftsError: string | undefined;
}>;
export const walletSelector = (state: Web3State) => state.context.walletAddress;
export const errorSelector = (state: Web3State) => state.context.errorMessage;
export const loadingSelector = (state: Web3State) => state.context.loading;
export const currentStateSelector = (state: Web3State) => state.value;
export const isLoggedInSelector = (state: Web3State) => state.matches("LOGGED_IN");
