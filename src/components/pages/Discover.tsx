import { useEffect, useState } from "react";
import "./Discover.css";

import axios from "axios";
import { marketAddress, marketAbi } from "../../config";
import { Crowdfund, CrowdfundWithMeta } from "../../types";
import { ethers } from "ethers";
import SearchBar from "../SearchBar";
import { filterFunds } from "../../helperFunctions";
import CategoryList from "../categoryList";
import { useAccount, useContract, useContractRead, useSigner } from "wagmi";
import { readContract } from "@wagmi/core";

function Discover() {
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [crowdfundArr, setCrowdfundArr] = useState<CrowdfundWithMeta[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  //const { data: signer } = useSigner();
  // const marketContract = useContract({
  //   address: marketAddress,
  //   abi: marketAbi,
  //   signerOrProvider: signer
  // }) as ethers.Contract;

  useEffect(() => {
      loadCrowdfunds();
  }, []);

  async function loadCrowdfunds() {
    const allActiveFundraisers = await readContract({
      address: marketAddress,
      abi: marketAbi,
      functionName: "getActiveFundraisers",
    }) as Crowdfund[];

    const crowdfundList = (await Promise.all(
      allActiveFundraisers.map(async (crowdfund: Crowdfund) => {
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
  }
  const searchableCrowdfunds = filterFunds(crowdfundArr, searchQuery);

  if (loadingState === "loaded" && !crowdfundArr.length) {
    return <h2>No Crowdfunds in this marketplace.</h2>;
  }

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <section>
        <CategoryList
          category={"Environment & Wildlife"}
          list={searchableCrowdfunds}
        />
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
