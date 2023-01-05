import { OwnedNft } from "alchemy-sdk/dist/src/types/types";
import { assign, createMachine } from "xstate";
import { walletAssetsMachine } from "./walletAssetsMachine";

export const web3WalletMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHcwCMDMB1AhgGzzABcBZHAYwAsBLAOzADoA5AeQBUB9AGRYHFeAogBEOASSYBicgHta9ckVwFiAbQAMAXUSgADtNjUi1WdpAAPRAFoAjNYCcGBgDYMAFgCsatfbUAmVxgANCAAnoju1q4MAOzuvtF21n4AHAm+vgC+GcGomEqEpBQ09Aw8-MJiTKUsAIJC4rwcNQDKzQJszRIQsox0AG7SANaMudj4BWRUdIxlgiLi1XUNTa3tzQj90uQ4RrLqGvumega7tKYWCDbRjsm+ya7eTr5qrr6RwWEIGL6Otu7uGDULic9hBWRy6DGykKUxKswqCx4SyYjRabQ6EjAACcsdIsQwdHgdgAzPEAWwYo3yxEmxRmfDmlUW9RRK3R60221O+0OSBAx0MxjOfIuVxudwe1ieLzerg+iFevgYALedjsbz8tgw4JAVPGNKK02q5XmVSRLNRqwx3RKm2GlMh1JhdONjMRtQtbLWG1oAy5QpU1gOmiO+kFJhFVms1wYt3uj2er3eoQV0TUDDU33s6qSb2s2uyusd+udRvhpuZyzRa0xOLxBKJRFJWIpeuhtLLDIRZo9VatHN9Wx2AaDvN0YdO5yjMbjkulSblKYQ8Xczms-0BwNB1h1bYmhrhXYrbBYAGkBExmtwPRwBAAlO8sO8SPDSHAQNhDMC0WA1KA4Ogx35CchSnS5o3FeMpUTWV5S+aIlUzVUATsf5Il3Yt2wPekTSZJgADEOmvOpbwfJ8XzfD8vx-P8ANoICBUnSNwJnCUExlZNPnSVc-gBIEMBBOwwULPcDVhekz2WfCn2vXCsBqLguHaLoegYO0Rkw-dxOqSTWWku9ZMZeTFPaH0-WHPZNAYkCI1AUU7DUaIYjuXwAXcVxbGiWI4OSX41DiNxIlcVwEKcDC8hLDtD10xp9MMipjKUtha1xfFCRJckHQirDtJ4GKODi8sOES0zOQs+irJDPlGNA5jLAcpyENuNyPOjbyl3q2MQuSeN3Acvq0zscKoS0l0AGEWCYJgBDGthlhK5KbV6Qd7VE0sSgmqaZrm1kFrModuUqrRqps4U7KsWIoicTxrFVUFAUXT5XGSdMklQpx7nc3zMhEzSxPGybptm+aFKSlL63SptMrWqLGE2oGdsaPaysO4NjvHE5avO8DrF85w3E8bwHP8IIlyTGI1WuuxomSOIqYLCFstGo14e24rQfaUjH2fWAdDASAAFUdGszHbPMKwHCcBhcfza5kicEF3OiODLCcdM3BphwvFpl5afcYanVhhhWdm9mTM4e9uYkMxYCIHZGBwYkiGxAAKQEvAASgkGHsONwG2YWrmnxF8MzvFy5Jel5JZYweXFZClWkic+5Nee1zfA++4skLWhpAgOBTB98TQ1FsPRVuiJ8Y8LwfBJxPUIYDXkjsNO6Z61wDci33WE4IrxBL0OwNV5uo9l2wXjUdVfBVvqupphIhNppPok7nKXT7pgB6Y7HLFcD7lQwdcM-nWCl3zHj1z4rchJ3X6mf+ztcPdZFLXZLesfD3fngPo+FZgzjEDpGTtdFU0c1bpDsMkVezNDxPyqCec8l5iJCGEO-MWFxIgMDeCnDAGAEjuBpgNOC3wlS8U3AJbc0CH6wLdPAs8F4rzmiDneNBZdECYOwSFXB+DCHU2IS9NcG5+KCWEozEa1CcK0OYIRRhHpUEnVLmBdwyQsG4y4Xg1CNMnBwU8EqASG5XIBHcnvfWd9xHrUkd2aRREmGWyfKwsC0ZVxoRek4aIt1Ej2DgtxaWl8aapGjE4IaZjDa+zyqeKSMkioLQcXVW6mYq6E1rgEOCbiMzR38RXH4WcQld20ibRGZskqxJ3tTFRWY1QOWbnEGmcFuqNwoT8dxyjuphVyWvFm-tTaBzsSwhRg84nPEcC4auRM-ApI6mmZydxYgfWUdEVwqFs4ZCAA */
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
