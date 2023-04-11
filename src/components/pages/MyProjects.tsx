import axios from "axios";
import { ethers } from "ethers";
import react, { useEffect, useState } from "react";
import { marketAbi, marketAddress } from "../../config";
import { Crowdfund, CrowdfundWithMeta } from "../../types";
import CrowdfundCard from "../crowdfund-card";
import Web3Modal from "web3modal";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { getContract, getProvider, readContract } from "@wagmi/core";

function MyProjects() {
  const [crowdfundArr, setCrowdfundArr] = useState<CrowdfundWithMeta[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const { data: signer } = useSigner();
  console.log(signer);
  const { address, isConnected } = useAccount();
  const marketContract = useContract({
    address: marketAddress,
    abi: marketAbi,
    signerOrProvider: signer,
  }) as ethers.Contract;

  useEffect(() => {
    if (isConnected) {
      loadCrowdfunds();
    }
  }, [isConnected, marketContract]);

  async function loadCrowdfunds() {
    // const allCrowdfunds = (await readContract({
    //   address: marketAddress,
    //   abi: marketAbi,
    //   functionName: "getMyFundraisers",
    // })) as Crowdfund[];

    // const marketContract = getContract({
    //   address: marketAddress,
    //   abi: marketAbi,
    //   signerOrProvider: signer as ethers.Signer,
    // });
    console.log(marketContract, "contact");

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

  if (loadingState === "loaded" && !crowdfundArr.length) {
    return <h2>You haven't created any crowdfunds.</h2>;
  }

  return (
    <>
      {crowdfundArr.length !== 0 && (
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
      )}
    </>
  );
}

export default MyProjects;
