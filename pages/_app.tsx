import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />

  return (
    <Provider store={store}>
      {/* <ThemeProvider theme={theme}> */}
      <Head>
        <title>Team Concoders</title>
      </Head>
      <Component {...pageProps} />
      {/* <ToastContainer position="bottom-center" theme="light" /> */}
      {/* </ThemeProvider> */}
    </Provider>
  );
}
