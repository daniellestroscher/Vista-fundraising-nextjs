import react, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { CrowdfundAbi, marketAbi, marketAddress } from "../../config";
import { Crowdfund, CrowdfundWithMeta } from "../../types";
import CrowdfundCard from "../crowdfund-card";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { getContract, getProvider, getAccount } from "@wagmi/core";

function ISupport() {
  const [crowdfundArr, setCrowdfundArr] = useState<CrowdfundWithMeta[]>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      loadCrowdfunds();
    }
  }, []);

  async function loadCrowdfunds() {
    const provider = getProvider();
    const marketContract = getContract({
      address: marketAddress,
      abi: marketAbi,
      signerOrProvider: provider,
    });

    const allCrowdfunds =
      (await marketContract.getActiveFundraisers()) as Crowdfund[];

    let crowdfundList = (await Promise.all(
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
    if (crowdfundList.length) {
      let filteredList = (await filterListISupport(
        crowdfundList
      )) as CrowdfundWithMeta[];

      setCrowdfundArr(filteredList);
      setLoadingState("loaded");
    }
  }

  async function filterListISupport(crowdfundList: CrowdfundWithMeta[]) {
    for (let i = 0; i < crowdfundList.length; i++) {
      //filter out all except ones that signer has contributed to.
      const provider = getProvider();
      const crowdfundContractInstance = getContract({
        address: crowdfundList[i].crowdfundContract,
        abi: CrowdfundAbi,
        signerOrProvider: provider,
      });
      const account = getAccount();
      let signerAddress = account.address;
      let donatedToContract =
        await crowdfundContractInstance.checkIfContributor(signerAddress);
      let donated = [] as CrowdfundWithMeta[];
      if (donatedToContract) {
        donated.push(crowdfundList[i]);
      }
      return donated;
    }
  }

  if (loadingState === "loaded" && !crowdfundArr.length) {
    return <h2>You don't support any active projects.</h2>;
  }
  return (
    <>
      {crowdfundArr.length !== 0 && (
        <div>
          <h4>You support these awesome projects. see how they're doing!</h4>
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
