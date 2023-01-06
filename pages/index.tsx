import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Team Concoders</title>
      </Head>
      <div>
        <h1>Team Concoders</h1>
      </div>
    </>
  );
}
