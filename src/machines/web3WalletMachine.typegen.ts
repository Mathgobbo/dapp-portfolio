// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.web3WalletMachine.CONNECTING_WALLET:invocation[0]": {
      type: "done.invoke.web3WalletMachine.CONNECTING_WALLET:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.web3WalletMachine.LOOKING_FOR_LOGGED_WALLET:invocation[0]": {
      type: "done.invoke.web3WalletMachine.LOOKING_FOR_LOGGED_WALLET:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.web3WalletMachine.CONNECTING_WALLET:invocation[0]": {
      type: "error.platform.web3WalletMachine.CONNECTING_WALLET:invocation[0]";
      data: unknown;
    };
    "error.platform.web3WalletMachine.LOOKING_FOR_LOGGED_WALLET:invocation[0]": {
      type: "error.platform.web3WalletMachine.LOOKING_FOR_LOGGED_WALLET:invocation[0]";
      data: unknown;
    };
    "xstate.after(3000)#web3WalletMachine.CONNECT_WALLET_ERROR": {
      type: "xstate.after(3000)#web3WalletMachine.CONNECT_WALLET_ERROR";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    connectWallet: "done.invoke.web3WalletMachine.CONNECTING_WALLET:invocation[0]";
    loadLoggedWallet: "done.invoke.web3WalletMachine.LOOKING_FOR_LOGGED_WALLET:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: "connectWallet" | "loadLoggedWallet";
  };
  eventsCausingActions: {
    assignErrorToContext:
      | "error.platform.web3WalletMachine.CONNECTING_WALLET:invocation[0]"
      | "error.platform.web3WalletMachine.LOOKING_FOR_LOGGED_WALLET:invocation[0]";
    assignWalletAddressToContext:
      | "done.invoke.web3WalletMachine.CONNECTING_WALLET:invocation[0]"
      | "done.invoke.web3WalletMachine.LOOKING_FOR_LOGGED_WALLET:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    connectWallet: "connectWallet";
    loadLoggedWallet: "xstate.init";
  };
  matchesStates:
    | "CONNECTING_WALLET"
    | "CONNECT_WALLET_ERROR"
    | "LOGGED_IN"
    | "LOOKING_FOR_LOGGED_WALLET"
    | "NOT_LOGGED_IN";
  tags: never;
}
