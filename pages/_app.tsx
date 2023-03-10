import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import WalletProvider from "../context/wallet-context/wallet-provider";

const theme = createTheme({
  typography: {
    fontFamily: `"Poppins", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Team Concoders</title>
            <meta name="description" content="Generated by create next app" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <CssBaseline />

          <Component {...pageProps} />

          {/* <ToastContainer position="bottom-center" theme="light" /> */}
        </ThemeProvider>
      </Provider>
    </WalletProvider>
  );
}
