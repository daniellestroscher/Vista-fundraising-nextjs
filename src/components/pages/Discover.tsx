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
    let web3 = await setWeb3();
    if (web3) {
      const marketContract = new web3.eth.Contract(
        marketAbi as AbiItem[],
        marketAddress
      );
      const allCrowdfunds = await marketContract.methods.getActiveFundraisers().call() as Crowdfund[];

      const crowdfundList = (await Promise.all(
        allCrowdfunds.map(async (i: Crowdfund) => {
          const meta = await axios.get(i.metaUrl);
          return {
            fundId: i.fundId,
            crowdfundContract: i.crowdfundContract,
            name: meta.data.name,
            description: meta.data.description,
            image: meta.data.image,
            owner: i.owner,
            goal: i.goal,
            goalReached: i.goalReached,
          };
        })
      )) as CrowdfundWithMeta[];
      setCrowdfundArr(crowdfundList);
      setLoadingState("loaded");
      console.log(crowdfundList, "list");
    }
  }

  if (loadingState === "loaded" && !crowdfundArr.length) {
    return <h2>No Crowdfunds in this marketplace.</h2>;
  }

  return (
    <section>
      <div className="crowdfund-list">
        {
          crowdfundArr.map((crowdfund, i) => {
            return (
              <div key={i}>
                <CrowdfundCard crowdfund={crowdfund}/>
              </div>
            )
          })

        }
      </div>
    </section>
  );
}

export default Discover;
