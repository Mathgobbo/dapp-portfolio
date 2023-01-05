import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: "s0VTPm7zBsLzsEivRzhF2UasWWDZiEyS",
  network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);
