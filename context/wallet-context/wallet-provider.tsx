import { useState } from "react";
import { WalletState } from "./state";
import WalletContext from "./wallet-context";

interface WalletProviderProps {
  children: React.ReactNode;
}

const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [state, setState] = useState<WalletState>({
    account: undefined,
    provider: undefined,
  });

  return (
    <WalletContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
