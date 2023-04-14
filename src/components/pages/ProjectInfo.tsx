import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DonateBox from "../donate-box";
import "./ProjectInfo.css";

import { Crowdfund, CrowdfundWithMeta } from "../../types";
import { CrowdfundAbi, marketAbi, marketAddress } from "../../config";
import axios from "axios";
import { useContractRead, useAccount } from "wagmi";
import { readContract, prepareWriteContract, writeContract } from "@wagmi/core";

export default function ProjectInfo() {
  const param = useParams();
  const fundId = param.id;

  const [crowdfund, setCrowdfund] = useState<CrowdfundWithMeta>();
  const [currentContractBalance, setCurrentContractBalance] =
    useState<number>(0);
  const [totalRaised, setTotalRaised] = useState<number>(0);
  const { address } = useAccount();

  const { data: amountRaised } = useContractRead({
    address: crowdfund?.crowdfundContract as `0x${string}`,
    abi: CrowdfundAbi,
    functionName: "raised",
    watch: true,
  });
  const { data: contractBalance } = useContractRead({
    address: crowdfund?.crowdfundContract as `0x${string}`,
    abi: CrowdfundAbi,
    functionName: "getBalance",
    watch: true,
  });

  useEffect(() => {
    getProject();
  }, []);
  useEffect(() => {
    setTotalRaised(Number(amountRaised));
    setCurrentContractBalance(Number(contractBalance));
  }, [amountRaised, contractBalance]);

  console.log(Number(amountRaised), Number(contractBalance));

  async function getProject() {
    const crowdfundObj = (await readContract({
      address: marketAddress,
      abi: marketAbi,
      functionName: "getCrowdfund",
      args: [fundId],
    })) as Crowdfund;

    const meta = await axios.get(crowdfundObj.metaUrl);
    const crowdfund = {
      fundId: Number(crowdfundObj.fundId),
      crowdfundContract: crowdfundObj.crowdfundContract,
      name: meta.data.name,
      descriptionShort: meta.data.descriptionShort,
      descriptionLong: meta.data.descriptionLong,
      image: meta.data.image,
      category: meta.data.category,
      owner: crowdfundObj.owner,
      goal: Number(crowdfundObj.goal),
      goalReached: crowdfundObj.goalReached,
    } as CrowdfundWithMeta;

    setCrowdfund(crowdfund);
  }

  async function withdrawFunds() {
    if (currentContractBalance == 0) {
      alert("This contract has no funds to withdraw.");
      return;
    }
    if (crowdfund) {
      const config = await prepareWriteContract({
        address: crowdfund.crowdfundContract as `0x${string}`,
        abi: CrowdfundAbi,
        functionName: "withdraw",
      });
      const { hash } = await writeContract(config);
      console.log(hash);
      setCurrentContractBalance(Number(contractBalance));
    }
  }

  return (
    <>
      {crowdfund && (
        <section className="main-container">
          <div
            style={{ backgroundImage: `url(${crowdfund.image})` }}
            className="header"
          >
            <h2 className="page-title">{crowdfund.name}</h2>
            {address === crowdfund.owner ? (
              <div className="content-container">
                <p>Current Contract Balance: {currentContractBalance} Wei</p>
                <button className="button" onClick={withdrawFunds}>
                  Withdraw
                </button>
                {/* TODO: maybe add change goal feature */}
              </div>
            ) : (
              <div className="content-container">
                <DonateBox crowdfund={crowdfund} />
              </div>
            )}
          </div>
          <section className="description-box">
            <p className="description-short">{crowdfund.descriptionShort}</p>
            <div></div>
            {/* TODO: add longer description input */}
            <p className="description-long">{crowdfund.descriptionLong}</p>
          </section>
          <section className="goal-stats-box">
            <h4>Raised: {totalRaised} Wei</h4>
            <h4>Goal: {crowdfund.goal} Wei</h4>
          </section>
        </section>
      )}
    </>
  );
}
