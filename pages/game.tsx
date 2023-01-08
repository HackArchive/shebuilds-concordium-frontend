import Head from "next/head";
import GameComp from "../components/game/game";

export default function Game() {
  return (
    <>
      <Head>
        <title>Pokemon</title>
      </Head>

      <GameComp />
    </>
  );
}
