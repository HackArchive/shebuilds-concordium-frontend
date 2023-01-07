import { createContext } from "react";
import { initialWalletState, WalletState } from "./state";

const WalletContext = createContext<WalletState>(initialWalletState);

export default WalletContext;
