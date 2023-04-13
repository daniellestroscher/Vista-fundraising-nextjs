import { useEffect, useState } from "react";
import "./Discover.css";

import axios from "axios";
import { marketAddress, marketAbi } from "../../config";
import { Crowdfund, CrowdfundWithMeta } from "../../types";
import SearchBar from "../SearchBar";
import { filterFunds } from "../../helperFunctions";
import CategoryList from "../categoryList";
import { useAccount, useProvider, useSigner } from "wagmi";
import { readContract } from "@wagmi/core";

function Discover() {
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [crowdfundArr, setCrowdfundArr] = useState<CrowdfundWithMeta[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (isConnected) {
      loadCrowdfunds();
    }
  }, [isConnected, address]);

  async function loadCrowdfunds() {
    const allActiveFundraisers = (await readContract({
      address: marketAddress,
      abi: marketAbi,
      functionName: "getActiveFundraisers",
    })) as Crowdfund[];

    console.log(allActiveFundraisers, 'all active')
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

  if (loadingState === "loaded" && !crowdfundArr.length && isConnected) {
    return <div className="page"><p className="page-heading">No Crowdfunds in this marketplace.</p></div>;
  }
  return (
    <>
      {crowdfundArr.length !== 0 && isConnected && (
        <div>
          {/* <div style={{ position: "fixed", top : "55px", right: "35px"}}> */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              top={65}
              right={30}
            />
          {/* </div> */}
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
        </div>
      )}
    </>
  );
}

export default Discover;
