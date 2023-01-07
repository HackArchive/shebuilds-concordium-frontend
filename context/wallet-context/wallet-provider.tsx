import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { useEffect, useState } from "react";
import { connectToWallet } from "../../helpers/wallet-helper";
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

  const init = (provider: WalletApi, account?: string) => {
    setState({ provider, account });
  };

  useEffect(() => {
    const connect = async () => {
      const { account, provider } = await connectToWallet();
      init(provider, account);
    };

    connect();

    return () => {};
  }, []);

  useEffect(() => {
    // TODO: Add listeners here

    return () => {
      // Remove listeners here
    };
  }, [state.provider, state.account]);

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
