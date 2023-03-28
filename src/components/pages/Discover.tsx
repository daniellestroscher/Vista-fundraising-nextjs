import React, { Provider, useEffect, useState } from "react";
import "./Discover.css";

import Web3Modal from "web3modal";
import Web3 from "web3";
//import CoinbaseWalletSDK, { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import { marketAddress, marketAbi } from "../../config";
import { AbiItem } from "web3-utils";
import CrowdfundCard from "../crowdfund-card";
//import CrowdfundMarket from "../../../artifacts/contracts/CrowdfundMarket.sol/CrowdfundMarket.json";

const RPC_URL = process.env.RPC_URL;
const CHAIN_ID = process.env.CHAIN_ID;

function Discover() {
  //const [walletSDKProvider, setWalletSDKProvider] = useState<CoinbaseWalletProvider>();
  const [crowdfundArr, setCrowdfundArr] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [web3, setWeb3Provider] = useState<Web3>();

  useEffect(() => {
    loadCrowdfunds();
  }, []);

  async function setWeb3() {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    );
    setWeb3Provider(web3);
  }
  async function loadCrowdfunds() {
    if (!window.ethereum) alert("no eth object found");
    await setWeb3();
    if (web3) {
      const marketContract = new web3.eth.Contract(
        marketAbi as AbiItem[],
        marketAddress
      );
      const allCrowdfunds = await marketContract.methods.getActiveFundraisers() as [];
      const crowdfundList = await Promise.all(
        allCrowdfunds.map((crowdfund, i) => {
          return (
            <CrowdfundCard key={i} crowdfund={crowdfund}/>
          )
        })
      )
      console.log(allCrowdfunds, 'crowdfunds');
    }

  }

  return (
    <section>
      this is the discovery page.
      <div className="crowdfund-list"></div>
    </section>
  );
}

export default Discover;
