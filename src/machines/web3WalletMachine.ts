import { OwnedNft } from "alchemy-sdk/dist/src/types/types";
import { assign, createMachine } from "xstate";
import { walletAssetsMachine } from "./walletAssetsMachine";

export const web3WalletMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHcwCMDMB1AhgGzzABcBZHAYwAsBLAOzADoA5AeQBUB9AGRYHFeAogBEOASSYBicgHta9ckVwFiAbQAMAXUSgADtNjUi1WdpAAPRAHYAHBgYA2AKz2ATJZePLATgwYnAGhAAT0Q3NQYvSyd7AEZ7NRd7a2dHAF9UwNRMJUJSChp6Bh4WAGlxXg4AMRYAJW4+QREsAEEuLgE2CQhZRjoAN2kAa0Ys7Hxcsio6RmKypgrqup5+YQ4Wto6EfulyHCNZdQ1D0z0DfdpTCwR7e0sGRLcvRy8ktVcXQJCEABZHawZHBgXpEvMlvpE0hkQKMcsRJgUZixSuUqrV6ismq12p0wAAnXHSXEMHR4PYAM0JAFsGDDxnD8tMiki5gs0ctGmssZttrtzodjkgQKdDMYLoKrhhvncvG8XN8pRhrC4XDE3p9EBgVQwpdEMHFvjFvDFvulMugxso8lNCgBhFhMJgCG1sFHrbFdHoMbbDGnm2FWhEMO0Op0u+acjZsLa0Aa80X8zQnfQikzixAxFUuBzfWWOBKWRyOD7BRCRbVxJxeRLyxzGk1Q2mW+GM4OO52urk4-GE4mkogU3HUxsTBm2+1tsMVN3cmM7PbxzQC3TJ86XKy2BzONweby+AIlhDWGLarynrzymLWb4uDB-U3Qv10gMt8ehiPYjgCGo1WoSWA6MBIAAVR0JchRXUU1wQSVpVleVLEVZVVXsdUEDCCIomcc9YhlLwYkhM1sifZsxxDZ13w6T9v1-MxYCIPZGBwMkiDxAAKDA1E4gBKCRh3pa1GFbN9p04L8fxqMDhVXNNoKlCI4IVJUVTVA9lTsHVnEsVUYNPSx0ihWhpAgOBTD4596CTM5IJkgBaFCDzs+8zJIxhWE4dlVnESyUzFUArniO5JQwBD7FBb5gu8VC3GPDTQu+HC1DwgiHyIptR0RDExCYbzpL89MpSzNQbBiQ03GCtRrGsVDVS8BhrB8G9IgNKIj2sJzHzSgSmWRcNFnRDkRJy6y8p+Ysvl8Ownj1G9LHcN5YnrQiLRHLqhPbcNBsFKThvMUtKoiJIbHiaw1D8G9UKebNNWCg1jTlFV2tSlbAzWzgRKo8ShtTEaTu1QESuU46EmqkqHDUfD7Clb5bE49x9NSIA */
  createMachine(
    {
      id: "web3WalletMachine",
      context: {
        walletAddress: undefined as string | undefined,
        errorMessage: undefined as string | undefined,
        loading: true,
      },
      tsTypes: {} as import("./web3WalletMachine.typegen").Typegen0,
      schema: {
        services: {} as {
          loadLoggedWallet: {
            data: string;
          };
          connectWallet: {
            data: string;
          };
        },
        events: {} as { type: "connectWallet" } | { type: "speedUp" } | { type: "loadTokensAgain" },
      },
      states: {
        NOT_LOGGED_IN: {
          on: {
            connectWallet: {
              target: "CONNECTING_WALLET",
            },
          },
        },

        LOGGED_IN: {
          type: "final",
          invoke: {
            src: walletAssetsMachine,
          },
        },

        LOOKING_FOR_LOGGED_WALLET: {
          invoke: {
            src: "loadLoggedWallet",
            onDone: {
              target: "LOGGED_IN",
              actions: "assignWalletAddressToContext",
            },
            onError: {
              target: "NOT_LOGGED_IN",
              actions: "assignErrorToContext",
            },
          },
        },

        CONNECTING_WALLET: {
          invoke: {
            src: "connectWallet",
            onDone: {
              target: "LOGGED_IN",
              actions: "assignWalletAddressToContext",
            },
            onError: {
              target: "CONNECT_WALLET_ERROR",
              actions: "assignErrorToContext",
            },
          },
        },

        CONNECT_WALLET_ERROR: {
          on: {
            speedUp: "NOT_LOGGED_IN",
          },

          after: {
            "3000": "NOT_LOGGED_IN",
          },
        },
      },

      initial: "LOOKING_FOR_LOGGED_WALLET",
    },
    {
      actions: {
        assignWalletAddressToContext: assign((context, event) => {
          return {
            loading: false,
            walletAddress: event.data,
            errorMessage: undefined,
          };
        }),
        assignErrorToContext: assign((context, event) => {
          return {
            loading: false,
            errorMessage: (event.data as Error).message,
          };
        }),
      },
    }
  );
