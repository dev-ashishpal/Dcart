import { useEffect, Fragment, useState } from "react";
import "../styles/globals.css";
import Navigation from "../components/navigation/Navigation";
import NextNProgress from "nextjs-progressbar";
import { Web3ContextProvider } from "../context/Web3Context";
import { RefreshContextProvider } from "../context/RefreshContextProvider";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Web3ContextProvider>
      <RefreshContextProvider>
        <NextNProgress
          color="hsl(197, 37%, 24%)"
          startPosition={0.3}
          stopDelayMs={100}
          height={3}
          showOnShallow={true}
        />
        <Navigation />
        <Component {...pageProps} />
      </RefreshContextProvider>
    </Web3ContextProvider>
  );
};

export default MyApp;
