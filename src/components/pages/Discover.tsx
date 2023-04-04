import React, { useEffect, useState } from "react";
import "./Discover.css";

import axios from "axios";
import Web3Modal from "web3modal";
import Web3 from "web3";
//import CoinbaseWalletSDK, { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import { marketAddress, marketAbi } from "../../config";
import CrowdfundCard from "../crowdfund-card";
import { Crowdfund, CrowdfundWithMeta } from "../../types";
import { ethers } from "ethers";
import SearchBar from "../SearchBar";
import { filterFunds } from "../../helperFunctions";
import CategoryList from "../categoryList";

const RPC_URL = process.env.RPC_URL;
const CHAIN_ID = process.env.CHAIN_ID;

function Discover() {
  const [crowdfundArr, setCrowdfundArr] = useState<CrowdfundWithMeta[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadCrowdfunds();
  }, []);

  async function loadCrowdfunds() {
    if (!window.ethereum) alert("no eth object found");
    const provider = ethers.getDefaultProvider("http://localhost:8545");
    console.log(provider);

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
          category: meta.data.category,
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
  const searchableCrowdfunds = filterFunds(crowdfundArr, searchQuery);


  if (loadingState === "loaded" && !crowdfundArr.length) {
    return <h2>No Crowdfunds in this marketplace.</h2>;
  }

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <section>
        <CategoryList category={"Environment & Wildlife"} list={searchableCrowdfunds} />
        <CategoryList category={"Children"} list={searchableCrowdfunds} />
        <CategoryList category={"Poverty"} list={searchableCrowdfunds} />
        <CategoryList category={"Research"} list={searchableCrowdfunds} />
        <CategoryList category={"Other"} list={searchableCrowdfunds} />
      </section>
      {/* <section>
        <div className="crowdfund-list">
          {searchableCrowdfunds.map((crowdfund, i) => {
            return (
              <div key={i}>
                <CrowdfundCard crowdfund={crowdfund} />
              </div>
            );
          })}
        </div>
      </section> */}
    </div>
  );
}

export default Discover;
