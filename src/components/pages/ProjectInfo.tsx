import { Crowdfund, CrowdfundWithMeta } from "../../types";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { marketAbi, marketAddress } from "../../config";
import axios from "axios";

export default function ProjectInfo() {
  const param = useParams();
  const fundId = param.id;
  console.log(fundId);
  const [crowdfund, setCrowdfund] = useState<CrowdfundWithMeta>();

  useEffect(() => {
    getProject();
  }, []);

  async function getProject() {
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

    const crowdfundObj = (await marketContract.getCrowdfund(fundId)) as Crowdfund;
    const meta = await axios.get(crowdfundObj.metaUrl);
    const crowdfund = {
      fundId: Number(crowdfundObj.fundId),
      crowdfundContract: crowdfundObj.crowdfundContract,
      name: meta.data.name,
      description: meta.data.description,
      image: meta.data.image,
      category: meta.data.category,
      owner: crowdfundObj.owner,
      goal: Number(crowdfundObj.goal),
      goalReached: crowdfundObj.goalReached,
    } as CrowdfundWithMeta;
    setCrowdfund(crowdfund);
    console.log(crowdfund, 'fund')
  }

  return (
    <>{crowdfund && <h2>{crowdfund.name}</h2>}</>
  );
}
