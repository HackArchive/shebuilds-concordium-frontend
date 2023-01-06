import type { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface WalletState {
  // provider?: WalletApi;
  account?: string;
}

const initialState: WalletState = {
  // provider: undefined,
  account: undefined,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState: initialState,
  reducers: {
    setWalletState: (
      state: WalletState,
      action: PayloadAction<WalletState>
    ) => {
      state = action.payload;
    },

    setAccount: (
      state: WalletState,
      action: PayloadAction<string | undefined>
    ) => {
      state.account = action.payload;
    },

    clearWalletState: (state: WalletState) => {
      state = initialState;
    },
  },
});

const walletActions = walletSlice.actions;

export default walletSlice;
export { walletActions };
