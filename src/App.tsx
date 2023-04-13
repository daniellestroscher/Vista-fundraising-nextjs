import { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Discover from "./components/pages/Discover";
import Create from "./components/pages/Create";
import MyProjects from "./components/pages/MyProjects";
import ISupport from "./components/pages/ISupport";
import ProjectInfo from "./components/pages/ProjectInfo";
import Menu from "./components/Menu";

import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { w3mProvider } from "@web3modal/ethereum";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createClient,
  useAccount,
  WagmiConfig,
} from "wagmi";
import { arbitrum, mainnet, polygon, goerli, localhost } from "wagmi/chains";

const chainList = [goerli, polygon, localhost, arbitrum, mainnet];
const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string;

function App() {
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
  const [menuState, setMenuState] = useState(false);
  const { isConnected } = useAccount();

  return (
    <>
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
          {
            <div className="App">
              <header className="App-header">
                <div className="upper-header">
                  <div className="title">
                    <h2 className="name">Vista Fundraising,</h2>
                    <h4>support projects that make a difference.</h4>
                  </div>
                  <section className="connect-button-menu">
                    <ConnectButton
                      chainStatus="icon"
                      showBalance={false}
                      accountStatus={{
                        smallScreen: "avatar",
                        largeScreen: "full",
                      }}
                    />
                    {isConnected && (
                      <FontAwesomeIcon
                        icon={faBars}
                        onClick={(e) => setMenuState(!menuState)}
                        className="menu-bars"
                      />
                    )}
                  </section>
                </div>
              </header>
              <div>{!isConnected && <LandingPage />}</div>

              <Menu setMenuState={setMenuState} menuState={menuState} />

              <Router>
                <Routes>
                  <Route path="/" element={<Discover />} />
                  <Route path="/create" element={<Create />} />
                  <Route path="/my-projects" element={<MyProjects />} />
                  <Route path="/i-support" element={<ISupport />} />
                  <Route path="/projects/:id" element={<ProjectInfo />} />
                </Routes>
              </Router>
            </div>
          }
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
