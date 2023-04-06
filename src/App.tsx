import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Discover from "./components/pages/Discover";
import Create from "./components/pages/Create";
import MyProjects from "./components/pages/MyProjects";
import ISupport from "./components/pages/ISupport";
import ProjectInfo from "./components/pages/ProjectInfo";

import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { infuraProvider } from "wagmi/providers/infura";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import {
  configureChains,
  createClient,
  useAccount,
  useConnect,
  useNetwork,
  useSwitchNetwork,
  WagmiConfig,
} from "wagmi";
import { arbitrum, mainnet, polygon, goerli, localhost } from "wagmi/chains";

const chains = [goerli, localhost, arbitrum, mainnet, polygon];
const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string;

function App() {
  const { provider } = configureChains(chains, [
    w3mProvider({ projectId }),
    // infuraProvider({ apiKey: process.env.REACT_APP_INFURA_SECRET as string }),
    jsonRpcProvider({ rpc: () => ({ http: "https://rpc.ankr.com/gnosis" }) }), //<<<< New RPC Provider
    publicProvider(),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider,
  });
  const ethereumClient = new EthereumClient(wagmiClient, chains);
  const { chain } = useNetwork();

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        {
          <div className="App">
            <header className="App-header">
              <div className="title">
                <h2 className="name">Vista Fundraising,</h2>
                <h4>support projects that make a difference.</h4>
                <section>
                  {chain && <div>Connected to {chain.name}</div>}
                  <Web3Button />
                </section>
              </div>
              <nav className="nav">
                <a href="/">
                  <h3>Find places to give.</h3>
                </a>
                <a href="/create">
                  <h3>Create a new funding project.</h3>
                </a>
                <a href="/my-projects">
                  <h3>My funding projects.</h3>
                </a>
                <a href="/i-support">
                  <h3>Funding project's i support.</h3>
                </a>
              </nav>
            </header>
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
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
