import { CrowdfundWithMeta } from "../types";
import "./crowdfund-card.css";

import { CrowdfundAbi, marketAbi, marketAddress } from "../config";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { getContract, getProvider, sendTransaction, prepareSendTransaction } from '@wagmi/core'

type props = {
  crowdfund: CrowdfundWithMeta;
};
function CrowdfundCard({ crowdfund }: props) {
  const [contribution, setContribution] = useState<number | undefined>(0);
  const [currentContractBalance, setCurrentContractBalance] =
    useState<number>(0);

  const { data: amountRaised } = useContractRead({
    address: crowdfund.crowdfundContract as `0x${string}`,
    abi: CrowdfundAbi,
    functionName: "getBalance",
    watch: true,
  });

  useEffect(() => {
    setCurrentContractBalance(Number(amountRaised));
    updateCrowdfundStatus(crowdfund);
  }, [amountRaised]);


  async function updateCrowdfundStatus(_crowdfund: CrowdfundWithMeta) {
    if (
      currentContractBalance >= _crowdfund.goal &&
      _crowdfund.goalReached !== true
    ) {
      const provider = getProvider()
      const marketContractInstance = getContract({
        address: marketAddress,
        abi: marketAbi,
        signerOrProvider: provider,
      })
      let transactionToSetGoalReached = await marketContractInstance.setGoalReached(
        _crowdfund.crowdfundContract
      );
      let tx = await transactionToSetGoalReached.wait();
      console.log(tx);
    }
  }

  async function donateToCause() {
    const config = await prepareSendTransaction({
      request: { to: crowdfund.crowdfundContract, value: contribution },
    });
    const { hash } = await sendTransaction(config)
    console.log(hash);
    setContribution(0);
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
                <h5 className="progress">
                  Raised: {currentContractBalance} Wei
                </h5>
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
