import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  account?: string;
}

const initialState: WalletState = {
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
