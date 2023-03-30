import axios from "axios";
import react, { useEffect, useState } from "react";
import { AbiItem } from "web3-utils";
import { marketAbi, marketAddress } from "../../config";
import { setWeb3 } from "../../helperFunctions";
import { Crowdfund, CrowdfundWithMeta } from "../../types";
import CrowdfundCard from "../crowdfund-card";

function MyProjects() {
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
      let accounts = await web3.eth.getAccounts();
      const allCrowdfunds = (await marketContract.methods
        .getMyFundraisers()
        .call({ from: accounts[0] })) as Crowdfund[];

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
    return <h2>You haven't created any crowdfunds.</h2>;
  }

  return (
    <div>
      <h4>You created these awesome projects. see how they're doing!</h4>
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
  );
}

export default MyProjects;
