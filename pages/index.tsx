import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Button, Container, Grid } from "@mui/material";
import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";
import type { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { walletActions } from "../store/wallet-store";
import NavBarHome from "../components/app/navbar/navbar-main";
import ItemCard from "../components/cards/item-card";
import useWallet from "../context/wallet-context/use-wallet";

export default function Home() {
  const walletState = useWallet();

  const onConnectClick = async () => {
    try {
      const provider = await detectConcordiumProvider();
      const accountAddr = await provider.connect();
      walletState?.setState({
        account: accountAddr,
        provider: provider,
      });
    } catch (err) {
      console.error(`Error connecting to wallet: ${err}`);
    }
  };

  const items = Array(5).fill({
    name: "Dark Elixer",
    price: 100,
    img_url: "https://wallpapercave.com/wp/wp2424020.jpg",
    creator: "4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ",
    owners: ["4KuyV4gYjp5vwsPm33NPPknxzUv8AG8uvGK1NLLfzjW8KtcAtQ"],
  });

  return (
    <>
      <Head>
        <title>Team Concoders</title>
      </Head>

      <NavBarHome />

      <Container>
        <h1>Team Concoders</h1>

        <button onClick={onConnectClick}>Connect</button>

        <p>Account Address: {walletState.state.account}</p>

        <Grid container gap={3} justifyContent="center">
          {items.map((item, i) => {
            return (
              <Grid item key={i}>
                <ItemCard {...item} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
