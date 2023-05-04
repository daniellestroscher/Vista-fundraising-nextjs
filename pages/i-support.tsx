import React, { useEffect, useState } from "react";
import styles from "../styles/pages/i-support.module.css";

import CrowdfundCard from "../src/components/crowdfundCard";
import axios from "axios";
import { CrowdfundAbi, MarketAbi, MarketAddress } from "../config";
import { Crowdfund, CrowdfundWithMeta } from "../src/types";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";
import NavBar from "../src/components/navBar";
import { filterFunds } from "../src/helperFunctions";

function ISupport() {
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
    const allActiveCrowdfunds = (await readContract({
      address: MarketAddress,
      abi: MarketAbi,
      functionName: "getActiveFundraisers",
      overrides: { from: address },
    })) as Crowdfund[];

    let crowdfundList = (await Promise.all(
      allActiveCrowdfunds.map(async (crowdfund: Crowdfund) => {
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

    if (crowdfundList.length) {
      let filteredList = (await filterListISupport(
        crowdfundList
      )) as CrowdfundWithMeta[];

      setCrowdfundArr(filteredList);
    }
    setLoadingState("loaded");
  }

  async function filterListISupport(crowdfundList: CrowdfundWithMeta[]) {
    let donated = [] as CrowdfundWithMeta[];
    for (let i = 0; i < crowdfundList.length; i++) {
      //filter out all except ones that signer has contributed to.
      const donatedToContract = (await readContract({
        address: crowdfundList[i].crowdfundContract as `0x${string}`,
        abi: CrowdfundAbi,
        functionName: "checkIfContributor",
        args: [address],
        overrides: { from: address },
      })) as Crowdfund[];

      if (donatedToContract) {
        donated.push(crowdfundList[i]);
      }
    }
    return donated;
  }
  const searchableCrowdfunds = filterFunds(crowdfundArr, searchQuery);

  return (
    <>
      <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {loadingState === "loaded" && !crowdfundArr.length && isConnected && (
        <div className={styles.page}>
          <p className={styles.pageHeading}>
            You don't support any active projects.
          </p>
        </div>
      )}
      {crowdfundArr.length !== 0 && isConnected && (
        <div className={styles.page}>
          <p className={styles.pageHeading}>
            You support these awesome projects. see how they're doing!
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

export default ISupport;
