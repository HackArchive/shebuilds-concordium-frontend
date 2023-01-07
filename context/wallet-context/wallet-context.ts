import { createContext } from "react";
import { initialWalletState, WalletContextState } from "./state";

const WalletContext = createContext<WalletContextState>(initialWalletState);

export default WalletContext;
