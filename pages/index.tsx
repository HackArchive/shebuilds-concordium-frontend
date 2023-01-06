import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Button } from "@mui/material";
import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";
import type { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [state, setState] = useState<{
    provider?: WalletApi;
    account?: string;
  }>({
    provider: undefined,
    account: undefined,
  });

  const onConnectClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    try {
      const provider = await detectConcordiumProvider();
      const accountAddr = await provider.connect();
      setState({ provider, account: accountAddr });

      detectConcordiumProvider().then((provider) => {});
    } catch (err) {
      console.error(`Error connecting to wallet: ${err}`);
    }
  };

  return (
    <>
      <Head>
        <title>Team Concoders</title>
      </Head>
      <div>
        <h1>Team Concoders</h1>

        <button onClick={onConnectClick}>Connect</button>

        <p>Account Address: {state.account}</p>
      </div>
    </>
  );
}
