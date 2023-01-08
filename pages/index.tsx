import Head from "next/head";
import { Button, Container, Grid } from "@mui/material";
import NavBarHome from "../components/app/navbar/navbar-main";
import ItemCard from "../components/cards/item-card";
import useWallet from "../context/wallet-context/use-wallet";
import CardsGroup from "../components/home/cards-group";
import { addItem } from "../helpers/wallet-helper";

export default function Home() {
  const wallet = useWallet();

  return (
    <>
      <Head>
        <title>Team Concoders</title>
      </Head>

      <NavBarHome />

      <Button
        variant="contained"
        fullWidth
        color="error"
        onClick={() => {
          addItem(wallet.state.provider!, wallet.state.account!);
        }}
      >
        ADD ITEM
      </Button>

      <Container>
        <CardsGroup />

        <div
          style={{
            height: "5rem",
          }}
        ></div>
      </Container>
    </>
  );
}
