import "../styles/globals.css";
import type { AppProps } from "next/app";

import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { w3mProvider } from "@web3modal/ethereum";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, goerli, localhost } from "wagmi/chains";

const chainList = [goerli, polygon, localhost, arbitrum, mainnet];
const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string;

export default function App({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(chainList, [
    w3mProvider({ projectId }),
    publicProvider({ priority: 1 }),
    infuraProvider({
      apiKey: process.env.REACT_APP_INFURA_SECRET as string,
      priority: 1,
    }),
  ]);
  const { connectors } = getDefaultWallets({
    appName: "Defi-Crowdfund",
    chains,
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors, //connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "#7789ee", //color of wallet  try #703844
          accentColorForeground: "white", //color of text
          borderRadius: "large", //rounded edges
          fontStack: "rounded",
        })}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
