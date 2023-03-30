import React, { useEffect, useState } from "react";
import "./Discover.css";

import axios from "axios";
import Web3Modal from "web3modal";
import Web3 from "web3";
//import CoinbaseWalletSDK, { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import { marketAddress, marketAbi } from "../../config";
import { AbiItem } from "web3-utils";
import CrowdfundCard from "../crowdfund-card";
import { Crowdfund, CrowdfundWithMeta } from "../../types";
import { setWeb3 } from "../../helperFunctions";
import { ethers } from "ethers";
//import CrowdfundMarket from "../../../artifacts/contracts/CrowdfundMarket.sol/CrowdfundMarket.json";

const RPC_URL = process.env.RPC_URL;
const CHAIN_ID = process.env.CHAIN_ID;

function Discover() {
  //const [walletSDKProvider, setWalletSDKProvider] = useState<CoinbaseWalletProvider>();
  const [crowdfundArr, setCrowdfundArr] = useState<CrowdfundWithMeta[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadCrowdfunds();
  }, []);

  async function loadCrowdfunds() {
    if (!window.ethereum) alert("no eth object found");
    const provider = ethers.getDefaultProvider("http://localhost:8545");
    console.log(provider)

    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();

    // const metaMaskProvider = new ethers.providers.Web3Provider(connection);
    // const signer = metaMaskProvider.getSigner();

    const marketContract = new ethers.Contract(
      marketAddress,
      marketAbi,
      provider
    );
    console.log(marketContract);
    const allCrowdfunds =
      (await marketContract.getActiveFundraisers()) as Crowdfund[];


    const crowdfundList = (await Promise.all(
      allCrowdfunds.map(async (crowdfund: Crowdfund) => {
        const meta = await axios.get(crowdfund.metaUrl);
        return {
          fundId: Number(crowdfund.fundId),
          crowdfundContract: crowdfund.crowdfundContract,
          name: meta.data.name,
          description: meta.data.description,
          image: meta.data.image,
          owner: crowdfund.owner,
          goal: Number(crowdfund.goal),
          goalReached: crowdfund.goalReached,
        };
      })
    )) as CrowdfundWithMeta[];
    setCrowdfundArr(crowdfundList);
    setLoadingState("loaded");
    console.log(crowdfundList, "list");
  }

  if (loadingState === "loaded" && !crowdfundArr.length) {
    return <h2>No Crowdfunds in this marketplace.</h2>;
  }

  return (
    <section>
      <div className="crowdfund-list">
        {crowdfundArr.map((crowdfund, i) => {
          return (
            <div key={i}>
              <CrowdfundCard crowdfund={crowdfund} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Discover;
