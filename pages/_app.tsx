import "../styles/globals.css";

import { InjectedConnector, StarknetConfig } from "@starknet-react/core";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useMemo } from "react";
import { Provider as ReactReduxProvider } from "react-redux";
import { Provider as StrkProvider } from "starknet";

import { store, useStoreDispatch } from "../store";
import { useStarknetNetwork } from "../utils";
import TopNav from "../components/topNav";
import Layout from "../components/layout";

const StarknetStatusComponent = () => {
  const dispatch = useStoreDispatch();
  const network = useStarknetNetwork();
  useEffect(() => {
    dispatch.setNetwork(network || "");
  }, [dispatch, network]);
  return <></>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const connectors = useMemo(
    () => [
      new InjectedConnector({ options: { id: "argentX" } }),
      new InjectedConnector({ options: { id: "braavos" } }),
    ],
    []
  );
  return (
    <ReactReduxProvider store={store}>
      <StarknetConfig
        connectors={connectors}
        defaultProvider={
          new StrkProvider({
            sequencer: {
              baseUrl: "http://alpha4-2.starknet.io",
              feederGatewayUrl: "feeder_gateway",
              gatewayUrl: "gateway",
            },

          })
        }
      >
        <Head>
          <title>StarkLoc</title>
          <meta property="og:title" content="StarkLoc" />



        </Head>
        <StarknetStatusComponent />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StarknetConfig>
    </ReactReduxProvider>
  );
}

export default MyApp;
