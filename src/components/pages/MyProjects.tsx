import { useEffect, useState } from "react";
import "./MyProjects.css";
import axios from "axios";
import { marketAbi, marketAddress } from "../../config";
import { Crowdfund, CrowdfundWithMeta } from "../../types";
import CrowdfundCard from "../crowdfund-card";
import { useAccount } from "wagmi";
import { readContract } from "@wagmi/core";

function MyProjects() {
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
      address: marketAddress,
      abi: marketAbi,
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

  if (loadingState === "loaded" && !crowdfundArr.length && isConnected) {
    return <div className="page"><p className="page-heading">You haven't created any crowdfunds.</p></div>;
  }

  return (
    <>
      {crowdfundArr.length !== 0 && (
        <div className="page">
          <p className="page-heading">You created these awesome projects. see how they're doing!</p>
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

export default MyProjects;
