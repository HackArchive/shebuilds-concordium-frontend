import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Button } from "@mui/material";
import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";
import type { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { walletActions } from "../store/wallet-store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useAppDispatch();
  const walletState = useAppSelector((state) => state.wallet);

  const onConnectClick: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    try {
      const provider = await detectConcordiumProvider();
      const accountAddr = await provider.connect();

      console.log(accountAddr);

      dispatch(walletActions.setAccount(accountAddr));

      console.log(walletState.account);

      // walletActions.setWalletState({ provider, account: accountAddr })
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

        <p>Account Address: {walletState.account}</p>
      </div>
    </>
  );
}
