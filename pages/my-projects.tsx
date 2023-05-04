import React, { useEffect, useState } from "react";
import styles from "../styles/pages/my-projects.module.css";
import axios from "axios";
import { MarketAbi, MarketAddress } from "../config";
import { Crowdfund, CrowdfundWithMeta } from "../src/types";
import CrowdfundCard from "../src/components/crowdfundCard";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import NavBar from "../src/components/navBar";
import { filterFunds } from "../src/helperFunctions";

function MyProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [crowdfundArr, setCrowdfundArr] = useState<CrowdfundWithMeta[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      loadCrowdfunds();
    }
  }, [isConnected, address]);

  async function loadCrowdfunds() {
    const allMyCrowdfunds = (await readContract({
      address: MarketAddress,
      abi: MarketAbi,
      functionName: "getMyFundraisers",
      overrides: { from: address },
    })) as Crowdfund[];

    const crowdfundList = (await Promise.all(
      allMyCrowdfunds.map(async (crowdfund: Crowdfund) => {
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
        <div className={styles.page}>
          <p className={styles.pageHeading}>
            You haven't created any fundraisers.
          </p>
        </div>
      )}
      {crowdfundArr.length !== 0 && (
        <div className={styles.page}>
          <p className={styles.pageHeading}>
            You created these awesome projects. see how they're doing!
          </p>
          <div className={styles.crowdfundGrid}>
            {searchableCrowdfunds.map((crowdfund, i) => {
              return (
                <div key={i}>
                  <CrowdfundCard crowdfund={crowdfund} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default MyProjects;
