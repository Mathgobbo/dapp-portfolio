import { OwnedNft } from "alchemy-sdk/dist/src/types/types";
import { assign, createMachine } from "xstate";

export const walletAssetsMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHUCCAZdBRAKgfVQGVDdC8BZVAYQAkBJAOSwDocB5AaSwcOfTdQARRgHE87LjwDEEAPYA7MMwCW8gG6yA1krSZcBYqQrV6TVp269+Q0eIs8EqjQGMAhgBdlCgNoAGALp+-oigAA6ysMqeCiEgAB6IAIyJAGzMvgAciRkpAMwZubkpAKyJACwANCAAnogAtGW+zMUpAOxlGWW5xQCcha2+ZWUAvsNVutj4RCQ4ZJS0jCwSlnwCwgxiy9JgAE47sjvMoQA2HgBmBwC2zBP600bzpkv2Vmu2W4SO6rJu0fJBQVi4Uif1iCQQyTSmWyeQKRVKlRqSV8ACZmBkMi1isUUa1Ej0WhkeqNxhhJgYZnMTItzJJeB88NZBHgsAAlVlsVlSY6yVwQHBaMDyWCoKCuVSApAgYFRLzyMFJNrNXy5Vq5PqJXwpFIdXJVWoIHHMfJYlHYnGZTEkkC3KaGWbGBZmBgAMVmqxsGzwrtmMgUSicgpuZLu9qpTpYPtenrEUa+Lg8coBASBEVlMSl4M1TRRZQJ2TK2uKvkGKX1iFyZUSzESKJStc6rQGGUGIzGNpDdspjqezCjHvWsbdhCku32hxO5yuwb0XYe1Odw4Htjjgd+SYCkrCadBmeRObzpU6RZLhfLCA6ZWarR6daymVVQzbpNnFPnEb7S6jjLWLPZnO5XkIAYM53BFMUJRTKUZV3UAszyY0el8RJiyQqtUTyc8uivXwbzrYp1VSOsymKUZ23kWQIDgWJbTfB1HkWVMQTlBUEDqfE0hSFFazzFJOh6G8cnPOpuOKZo2jzLUUKJXJrVo+56IXZ46SY9N5T3NjygyZguJ4no+LzQSyyRTSUW0rV2gKMpWhRfIhgyOTOzo8New+ZcvQ+VTYPiepsx07jc30-ijOE-FmDxXpsi1FFuMSGyHPbeSwx7Gk3IZJksEELyWI07oxOxKS4tvXCYr1Ez2O0zpfFvPopNyHjnw7V8FJc1KXlpSwfyEP8OVZbKMzgitsWaYt6yKlESts88UiaIKBIKTUMjxEjHOa5KGMXWZ+vUwbNMLZpUmSQKih6fTzzNXJ-PrbjCm6PFb1W8kWpSzbo0Hb1h221i6h6bTSjG46UlOrjzyKasBNaIHrPaCbilaR7Q27DbIy-YcusETKvtylEenCwoiRKJ8UMRA0ijRTE726XJURyFEEbnRSP37b8mR6zksd23Icbx-J9OKIn+awso0W1M0emSayzKQ0iyKAA */
  createMachine(
    {
      id: "WALLET_ASSETS_MACHINE",
      type: "parallel",
      context: {
        loadingNfts: true,
        loadingTokens: true,
        nfts: [] as OwnedNft[],
        tokens: [] as string[],
        loadTokenError: undefined as string | undefined,
        loadNftsError: undefined as string | undefined,
      },
      tsTypes: {} as import("./walletAssetsMachine.typegen").Typegen0,
      schema: {
        services: {} as {
          loadTokens: {
            data: string[];
          };
          loadNfts: {
            data: OwnedNft[];
          };
        },
      },
      states: {
        TOKENS: {
          initial: "LOADING_TOKENS",
          states: {
            LOADING_TOKENS: {
              invoke: [
                {
                  src: "loadTokens",
                  onDone: {
                    target: "TOKENS_LOADED",
                    actions: "assignTokensToContext",
                  },
                  onError: {
                    target: "TOKENS_LOAD_ERROR",
                    actions: "assignTokenErrorToContext",
                  },
                },
              ],
            },

            TOKENS_LOADED: {},

            TOKENS_LOAD_ERROR: {
              on: {
                loadTokensAgain: "LOADING_TOKENS",
              },
            },
          },
        },
        NFTS: {
          initial: "LOADING_NFTS",
          states: {
            LOADING_NFTS: {
              invoke: [
                {
                  src: "loadNfts",
                  onDone: {
                    target: "NFTS_LOADED",
                    actions: "assignNftsToContext",
                  },
                  onError: {
                    target: "NFTS_LOAD_ERROR",
                    actions: "assignNftsErrorToContext",
                  },
                },
              ],
            },
            NFTS_LOADED: {},
            NFTS_LOAD_ERROR: {
              on: {
                loadNftsAgain: "LOADING_NFTS",
              },
            },
          },
        },
      },
    },
    {
      actions: {
        assignNftsToContext: assign((context, event) => {
          return {
            loadingNfts: false,
            loadNftsError: undefined,
            nfts: event.data,
          };
        }),
        assignTokensToContext: assign((context, event) => {
          return {
            loadingTokens: false,
            loadTokenError: undefined,
            tokens: event.data,
          };
        }),
        assignTokenErrorToContext: assign((context, event) => {
          return {
            loadingTokens: false,
            loadTokenError: (event.data as Error).message,
          };
        }),
        assignNftsErrorToContext: assign((context, event) => {
          return {
            loadingNfts: false,
            loadNftsError: (event.data as Error).message,
          };
        }),
      },
    }
  );
