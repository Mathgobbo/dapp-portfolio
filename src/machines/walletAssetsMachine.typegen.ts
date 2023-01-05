// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.WALLET_ASSETS_MACHINE.NFTS.LOADING_NFTS:invocation[0]": {
      type: "done.invoke.WALLET_ASSETS_MACHINE.NFTS.LOADING_NFTS:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.WALLET_ASSETS_MACHINE.TOKENS.LOADING_TOKENS:invocation[0]": {
      type: "done.invoke.WALLET_ASSETS_MACHINE.TOKENS.LOADING_TOKENS:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.WALLET_ASSETS_MACHINE.NFTS.LOADING_NFTS:invocation[0]": {
      type: "error.platform.WALLET_ASSETS_MACHINE.NFTS.LOADING_NFTS:invocation[0]";
      data: unknown;
    };
    "error.platform.WALLET_ASSETS_MACHINE.TOKENS.LOADING_TOKENS:invocation[0]": {
      type: "error.platform.WALLET_ASSETS_MACHINE.TOKENS.LOADING_TOKENS:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadNfts: "done.invoke.WALLET_ASSETS_MACHINE.NFTS.LOADING_NFTS:invocation[0]";
    loadTokens: "done.invoke.WALLET_ASSETS_MACHINE.TOKENS.LOADING_TOKENS:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: "loadNfts" | "loadTokens";
  };
  eventsCausingActions: {
    assignNftsErrorToContext: "error.platform.WALLET_ASSETS_MACHINE.NFTS.LOADING_NFTS:invocation[0]";
    assignNftsToContext: "done.invoke.WALLET_ASSETS_MACHINE.NFTS.LOADING_NFTS:invocation[0]";
    assignTokenErrorToContext: "error.platform.WALLET_ASSETS_MACHINE.TOKENS.LOADING_TOKENS:invocation[0]";
    assignTokensToContext: "done.invoke.WALLET_ASSETS_MACHINE.TOKENS.LOADING_TOKENS:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    loadNfts: "loadNftsAgain" | "xstate.init";
    loadTokens: "loadTokensAgain" | "xstate.init";
  };
  matchesStates:
    | "NFTS"
    | "NFTS.LOADING_NFTS"
    | "NFTS.NFTS_LOADED"
    | "NFTS.NFTS_LOAD_ERROR"
    | "TOKENS"
    | "TOKENS.LOADING_TOKENS"
    | "TOKENS.TOKENS_LOADED"
    | "TOKENS.TOKENS_LOAD_ERROR"
    | {
        NFTS?: "LOADING_NFTS" | "NFTS_LOADED" | "NFTS_LOAD_ERROR";
        TOKENS?: "LOADING_TOKENS" | "TOKENS_LOADED" | "TOKENS_LOAD_ERROR";
      };
  tags: never;
}
