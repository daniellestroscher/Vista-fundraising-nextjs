import { useEffect, useState } from "react";
import "./Discover.css";

import axios from "axios";
import { marketAddress, marketAbi } from "../../../config";
import { Crowdfund, CrowdfundWithMeta } from "../../../types";
import { filterFunds } from "../../../helperFunctions";
import CategoryList from "../../categoryList";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import NavBar from "../../navBar";

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

    console.log(allActiveFundraisers, "all active");
    const crowdfundList = (await Promise.all(
      allActiveFundraisers.map(async (crowdfund: Crowdfund) => {
        const meta = await axios.get(crowdfund.metaUrl);
        return {
          fundId: Number(crowdfund.fundId),
          crowdfundContract: crowdfund.crowdfundContract,
          name: meta.data.name,
          descriptionShort: meta.data.descriptionShort,
          descriptionLong: meta.data.descriptionLong,
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

  return (
    <>
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {loadingState === "loaded" && !crowdfundArr.length && isConnected && (
        <div className="page">
          <p className="page-heading">No Crowdfunds in this marketplace.</p>
        </div>
      )}
      {crowdfundArr.length !== 0 && isConnected && (
        <div>
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
