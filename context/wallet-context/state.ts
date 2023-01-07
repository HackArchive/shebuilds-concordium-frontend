import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { Dispatch, SetStateAction } from "react";

export interface WalletState {
  provider?: WalletApi;
  account?: string;
}

export interface WalletContextState {
  state: WalletState;
  setState: Dispatch<SetStateAction<WalletState>>;
}

export const initialWalletState: WalletContextState = {
  state: {
    provider: undefined,
    account: undefined,
  },
  setState: () => {},
};
