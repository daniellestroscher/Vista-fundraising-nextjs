import { useEffect, useState } from "react";
import "./ISupport.css";

import CrowdfundCard from "../crowdfund-card";
import axios from "axios";
import { CrowdfundAbi, marketAbi, marketAddress } from "../../config";
import { Crowdfund, CrowdfundWithMeta } from "../../types";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";

function ISupport() {
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
      address: marketAddress,
      abi: marketAbi,
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
          description: meta.data.description,
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
    for (let i = 0; i < crowdfundList.length; i++) {
      //filter out all except ones that signer has contributed to.
      const donatedToContract = (await readContract({
          address: crowdfundList[i].crowdfundContract as `0x${string}`,
          abi: CrowdfundAbi,
          functionName: "checkIfContributor",
          args: [address],
          overrides: { from: address },
        })) as Crowdfund[];

      let donated = [] as CrowdfundWithMeta[];
      if (donatedToContract) {
        donated.push(crowdfundList[i]);
      }
      return donated;
    }
  }

  if (loadingState === "loaded" && !crowdfundArr.length && isConnected) {
    return <div className="page"><p className="page-heading">You don't support any active projects.</p></div>;
  }
  return (
    <>
      {crowdfundArr.length !== 0 && (
        <div className="page">
          <p className="page-heading">You support these awesome projects. see how they're doing!</p>
          <div className="crowdfund-list">
            {crowdfundArr.map((crowdfund, i) => {
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
