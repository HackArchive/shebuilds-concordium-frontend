import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { Dispatch, SetStateAction } from "react";

export interface WalletState {
  provider?: WalletApi;
  account?: string;
  setState?: Dispatch<SetStateAction<WalletState>>;
}

export const initialWalletState: WalletState = {
  provider: undefined,
  account: undefined,
  setState: undefined,
};
