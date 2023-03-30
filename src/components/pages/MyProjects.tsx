import axios from "axios";
import { ethers } from "ethers";
import react, { useEffect, useState } from "react";
import { marketAbi, marketAddress } from "../../config";
import { Crowdfund, CrowdfundWithMeta } from "../../types";
import CrowdfundCard from "../crowdfund-card";
import Web3Modal from "web3modal";

function MyProjects() {
  const [crowdfundArr, setCrowdfundArr] = useState<CrowdfundWithMeta[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadCrowdfunds();
  }, []);

  async function loadCrowdfunds() {
    if (!window.ethereum) alert("no eth object found");
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      marketAddress,
      marketAbi,
      signer
    );

    const allCrowdfunds =
      (await marketContract.getMyFundraisers()) as Crowdfund[];
    console.log(allCrowdfunds, "funds");
    const crowdfundList = (await Promise.all(
      allCrowdfunds.map(async (crowdfund: Crowdfund) => {
        const meta = await axios.get(crowdfund.metaUrl);
        return {
          fundId: Number(crowdfund.fundId),
          crowdfundContract: crowdfund.crowdfundContract,
          name: meta.data.name,
          description: meta.data.description,
          image: meta.data.image,
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
