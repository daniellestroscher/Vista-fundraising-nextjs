import react, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { CrowdfundAbi, marketAbi, marketAddress } from "../../config";
import { Crowdfund, CrowdfundWithMeta } from "../../types";
import CrowdfundCard from "../crowdfund-card";

function ISupport() {
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
          owner: crowdfund.owner,
          goal: Number(crowdfund.goal),
          goalReached: crowdfund.goalReached,
        };
      })
    )) as CrowdfundWithMeta[];
    if (crowdfundList.length) {
      let filteredList = (await filterListISupport(
        crowdfundList,
        signer
      )) as CrowdfundWithMeta[];

      setCrowdfundArr(filteredList);
      setLoadingState("loaded");
    }
  }

  async function filterListISupport(
    crowdfundList: CrowdfundWithMeta[],
    signer: ethers.providers.JsonRpcSigner
  ) {
    for (let i = 0; i < crowdfundList.length; i++) {
      //filter out all except ones that signer has contributed to.
      let crowdfundContractInstance = new ethers.Contract(
        crowdfundList[i].crowdfundContract,
        CrowdfundAbi,
        signer
      );
      let signerAddress = await signer.getAddress();
      let donatedToContract =
        await crowdfundContractInstance.checkIfContributor(signerAddress);
      let donated = [] as CrowdfundWithMeta[];
      if (donatedToContract) {
        donated.push(crowdfundList[i]);
      }
      console.log(donated, "donated[]");
      return donated;
    }
  }

  if (loadingState === "loaded" && !crowdfundArr.length) {
    return <h2>You don't support any crowdfunds.</h2>;
  }
  return (
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
  );
}

export default ISupport;
