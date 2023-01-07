import Head from "next/head";
import { Container, Grid } from "@mui/material";
import NavBarHome from "../components/app/navbar/navbar-main";
import ItemCard from "../components/cards/item-card";
import useWallet from "../context/wallet-context/use-wallet";
import CardsGroup from "../components/home/cards-group";

export default function Home() {
  return (
    <>
      <Head>
        <title>Team Concoders</title>
      </Head>

      <NavBarHome />

      <Container>
        <CardsGroup />
      </Container>
    </>
  );
}
