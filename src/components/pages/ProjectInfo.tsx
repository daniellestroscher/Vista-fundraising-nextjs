import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectInfo.css";
import { connect, getFundBalance } from "../../helperFunctions";

import { Crowdfund, CrowdfundWithMeta } from "../../types";
import { marketAbi, marketAddress } from "../../config";
import { ethers } from "ethers";
import axios from "axios";

export default function ProjectInfo() {
  const param = useParams();
  const fundId = param.id;

  const [crowdfund, setCrowdfund] = useState<CrowdfundWithMeta>();
  const [crowdfundContractInstance, setCrowdfundContractInstance] =
    useState<ethers.Contract>();
  const [currentContractBalance, setCurrentContractBalance] =
    useState<number>();
  const [contribution, setContribution] = useState<number>();

  useEffect(() => {
    getProject();
  }, []);

  async function getProject() {
    const { signer } = await connect();
    const marketContract = new ethers.Contract(
      marketAddress,
      marketAbi,
      signer
    );

    const crowdfundObj = (await marketContract.getCrowdfund(
      fundId
    )) as Crowdfund;
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

    updateFundBalance(crowdfund as CrowdfundWithMeta);
    setCrowdfund(crowdfund);
  }

  async function updateFundBalance(_crowdfund: CrowdfundWithMeta) {
    const { currentContractBalance, crowdfundContractInstance } =
      await getFundBalance(_crowdfund);

    setCurrentContractBalance(currentContractBalance);
    setCrowdfundContractInstance(crowdfundContractInstance);
  }

  async function donateToCause() {
    if (crowdfund && crowdfundContractInstance) {
      let transaction = await crowdfundContractInstance.donate({
        value: contribution,
      });
      let tx = await transaction.wait();
      console.log(tx);

      updateFundBalance(crowdfund);
      setContribution(0);
    }
  }

  return (
    <>
      {crowdfund && (
        <>
          <section className="main-container">
            <div
              style={{ backgroundImage: `url(${crowdfund.image})` }}
              className="header"
            >
              <h2 className="page-title">{crowdfund.name}</h2>
              <div
                style={{ position: "absolute", bottom: "10px", right: "10px" }}
              >
                <input
                  type="number"
                  className="input"
                  style={{
                    background: "transparent",
                    borderBottom: "3px solid black",
                  }}
                  onChange={(e) => setContribution(Number(e.target.value))}
                />
                <button
                  className="donate"
                  style={{
                    backgroundColor: "black",
                    border: "1px solid white",
                    color: "white",
                  }}
                  onClick={donateToCause}
                >
                  Donate
                </button>
              </div>
            </div>
            <p className="description">{crowdfund.description}</p>
            {/* TODO: add longer description input */}
            <section className="goal-stats-box">
              <div>
                <p>Raised: {currentContractBalance} Wei</p>
                <p>Goal: {crowdfund.goal} Wei</p>
              </div>
              <input
                type="number"
                className="input"
                onChange={(e) => setContribution(Number(e.target.value))}
              />
              <button className="donate" onClick={donateToCause}>
                Donate
              </button>
            </section>
          </section>
        </>
      )}
    </>
  );
}
