import "../styles/globals.css";
import type { AppProps } from "next/app";

import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { alchemyProvider } from "wagmi/providers/alchemy";
import "@rainbow-me/rainbowkit/styles.css";

import {
  connectorsForWallets,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygonMumbai, sepolia, hardhat } from "wagmi/chains";

export default function App({ Component, pageProps }: AppProps) {
  const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string;
  const { chains, publicClient } = configureChains(
    [hardhat, sepolia, polygonMumbai, mainnet],
    [
      publicProvider(),
      alchemyProvider({
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API as string,
      }),
      infuraProvider({
        apiKey: process.env.NEXT_PUBLIC_INFURA_API as string,
      }),
    ]
  );
  const { wallets } = getDefaultWallets({
    appName: "Defi-Crowdfund App",
    projectId,
    chains,
  });
  const connectors = connectorsForWallets([
    ...wallets,
  ]);

  const config = createConfig({
    autoConnect: true,
    connectors: connectors,
    publicClient
  });

  return (
    <WagmiConfig config={config}>
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
