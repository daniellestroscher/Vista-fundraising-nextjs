import { Crowdfund, CrowdfundWithMeta } from "../types";
import "./crowdfund-card.css";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CrowdfundAbi, marketAbi, marketAddress } from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  connect,
  getFundBalance,
  setCrowdfundGoalReached,
} from "../helperFunctions";

type props = {
  crowdfund: CrowdfundWithMeta;
};
function CrowdfundCard({ crowdfund }: props) {
  const [contribution, setContribution] = useState<number | undefined>(0);
  const [currentContractBalance, setCurrentContractBalance] = useState<number>(0);
  const [crowdfundContractInstance, setCrowdfundContractInstance] =
    useState<ethers.Contract>();

  useEffect(() => {
    updateFundBalance(crowdfund);
  }, []);

  async function updateFundBalance(_crowdfund: CrowdfundWithMeta) {
    const { currentContractBalance, crowdfundContractInstance } =
      await getFundBalance(_crowdfund);

    setCurrentContractBalance(currentContractBalance);
    setCrowdfundContractInstance(crowdfundContractInstance);
  }

  async function donateToCause() {
    if (crowdfundContractInstance) {
      let transaction = await crowdfundContractInstance.donate({
        value: contribution,
      });
      await transaction.wait();

      setContribution(0);
      updateFundBalance(crowdfund);
    }
  }

  return (
    <>
      {!crowdfund.goalReached ? (
        <div className="container">
          <div className="crowdfund-item">
            <img src={crowdfund.image} width={350} className="image" />
            <section className="info">
              <div className="box">
                <a href={`/projects/${crowdfund.fundId}`}>
                  <div className="box">
                    <h3 className="fund-name">{crowdfund.name}</h3>
                    {(crowdfund.category === "Children" && (
                      <img src="charity.png" width={75} className="category" />
                    )) ||
                      (crowdfund.category === "Environment & Wildlife" && (
                        <img
                          src="charity.png"
                          width={75}
                          className="category"
                        />
                      )) ||
                      (crowdfund.category === "Poverty" && (
                        <img
                          src="charity.png"
                          width={75}
                          className="category"
                        />
                      )) ||
                      (crowdfund.category === "Research" && (
                        <img
                          src="charity.png"
                          width={75}
                          className="category"
                        />
                      )) ||
                      (crowdfund.category === "Religious" && (
                        <img
                          src="charity.png"
                          width={75}
                          className="category"
                        />
                      )) ||
                      (crowdfund.category === "Other" && (
                        <img
                          src="charity.png"
                          width={75}
                          className="category"
                        />
                      ))}
                  </div>
                  <p className="desc">{crowdfund.description}</p>
                </a>
              </div>
              <div className="box">
                <h5 className="progress">Raised: {currentContractBalance} Wei</h5>
                <h5 className="progress">Our goal: {crowdfund.goal} Wei</h5>
                <input
                  type="number"
                  onChange={(e) => setContribution(Number(e.target.value))}
                />
                <button onClick={donateToCause} className="donate">
                  Donate
                </button>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="crowdfund-item-completed">
          <img src={crowdfund.image} width={350} className="image" />
          <section className="info">
            <div className="box">
              <h3 className="fund-name">{crowdfund.name}</h3>
              <p className="desc">{crowdfund.description}</p>
            </div>
            <div className="box">
              <h5 className="progress">Raised: {currentContractBalance} Wei</h5>
              <h5 className="progress">Our goal: {crowdfund.goal} Wei</h5>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default CrowdfundCard;
