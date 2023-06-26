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
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygonMumbai, sepolia, hardhat } from "wagmi/chains";

const chainList = [polygonMumbai, sepolia, hardhat, mainnet];

export default function App({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(chainList, [
    publicProvider({ priority: 1 }),
    infuraProvider({
      apiKey: process.env.NEXT_PUBLIC_INFURA_API as string,
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
