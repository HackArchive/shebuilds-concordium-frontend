import { useContext } from "react";
import WalletContext from "./wallet-context";

const useWallet = () => useContext(WalletContext);

export default useWallet;
