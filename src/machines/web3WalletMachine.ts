import { assign, createMachine } from "xstate";

export const web3WalletMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHcwCMDMB1AhgGzzABcBZHAYwAsBLAOzADoA5AeQBUB9AGRYHFeAogBEOASSYBicgHta9ckVwFiAbQAMAXUSgADtNjUi1WdpAAPRACYA7AA4GagJwA2VwEZrlty8cYANCAAnogALI4MAKzObm4hlpa+ERG2GBgAvmkBqJhKhKQUNPQMPCwA0uK8HABiLABK3HyCIlgAglxcAmwSELKMdABu0gDWjNnY+HlkVHSMJeVMlTX1PPzCHK3tnQgD0uQ4RrLqGkemegYHtKYWCAC0HtYOyRFutm4Yjt62ISEBwQjeIQYjkszksanirzslgi1gyWXQ42U+WmRTmFWqdQaq2abQ6XTAACcCdICQwdHh9gAzEkAWwYY1yxCmhVmLDK6KWWKa61xWx2ewuRxOSBAZ0MxkuIuud2sDzUTxebw+ji+PyCiDcajcQOsGE1Wucjhc0WccJADImTIKMwYAGEWEwmAJbWx0Rs8d1egwdiN6QjGciWXaHU6XW7eWxtrRBgKJULNKd9OKTFLENY3BEGNYImCQhFjTmXr9EBg5TFLLZVSFbAk1BgQmaLUjmTb7Y7na6FjzNviiSSyRSiNSCXSm5NrUU26HO5V3Xzo7t9nHNMLdEmLlcrHYHMbop5vIb-OrbjFwilUhgcyE1M5XirG-7LYHWyGO928RwBLVanUJLAdGAkAAKo6KuorrhKm4nrKjy2M8rzvJ83zFggYSRNEbwQhgYLprCmTmo+zYTowU5vnOnBfj+tQSGYsBEPsjA4JSRCEgAFBgaicQAlBIY5WiiJGvi676dJ+351GBYobqm0FygqCHKqqKFqAwCSvM4N5qNmGZglqGT4bQ0gQHAph8c+9CJuckEyTcETfAwriOU5jnWChNw4QwF6pFeN53rYD45E+LZFKwnArNy4iWcmkqgNcjiAuCsS2OCXgaW4lhqn8EQqTe5bxJ4cH5v5+FmcFrLYmITBRdJsWIMC2p1rElipPu8q2ChXgqW8NbZTY1a2HYDYlYR44CcUbLzIsmLhWs5HVdZtW3GEzgOc5a2uceHj2GoNZgpqji6rEsoBYio1BqRYZdnNIpSQt5ihK8QLOEk14aRE9ZfChMSqYa1jVnmTjXk1J0BmVwbtsJ5FiVR80potNx5it8pJDWzghIN2ZHn8GD2NYO2xI1GYeN8+lpEAA */
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
        events: {} as { type: "connectWallet" } | { type: "speedUp" },
      },
      states: {
        NOT_LOGGED_IN: {
          on: {
            connectWallet: {
              target: "CONNECTING_WALLET",
            },
          },
        },

        LOGGED_IN: {},

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
