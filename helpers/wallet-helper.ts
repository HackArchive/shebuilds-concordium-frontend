import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";

export const connectToWallet = async () => {
  const provider = await detectConcordiumProvider();
  const accountAddr = await provider.connect();

  return { provider, account: accountAddr };
};
