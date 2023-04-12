import { CrowdfundWithMeta } from "../types";
import "./crowdfund-card.css";

import { CrowdfundAbi, marketAbi, marketAddress } from "../config";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import {
  sendTransaction,
  prepareSendTransaction,
  writeContract,
  prepareWriteContract,
  waitForTransaction
} from "@wagmi/core";

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
  const { data: goalReached } = useContractRead({
    address: crowdfund.crowdfundContract as `0x${string}`,
    abi: CrowdfundAbi,
    functionName: "goalReached",
    watch: true,
  });

  useEffect(() => {
    setCurrentContractBalance(Number(amountRaised));
    console.log(goalReached, 'goal reached?');

  }, [amountRaised, goalReached]);

  async function donateToCause() {
    //check balance
    const config = await prepareSendTransaction({
      request: { to: crowdfund.crowdfundContract, value: contribution },
    });
    const { hash } = await sendTransaction(config);
    console.log(hash, "transaction hash");
  }

  return (
    <>
      {
        <div className="container">
          <div
            className={
              !goalReached
                ? "crowdfund-item"
                : "crowdfund-item-complete"
            }
          >
            <div className="image-box">
              <img src={crowdfund.image} width={350} className="image" />
            </div>
            <section className="info">
              <a href={`/projects/${crowdfund.fundId}`}>
                <div className="card-header">
                  <h3
                    className="fund-name"
                    style={{
                      color: goalReached
                        ? "rgb(9, 103, 18)"
                        : "inherit",
                    }}
                  >
                    {crowdfund.name}
                  </h3>
                  {(crowdfund.category === "Children" && (
                    <img src="charity.png" width={75} className="category" />
                  )) ||
                    (crowdfund.category === "Environment & Wildlife" && (
                      <img src="charity.png" width={75} className="category" />
                    )) ||
                    (crowdfund.category === "Poverty" && (
                      <img src="charity.png" width={75} className="category" />
                    )) ||
                    (crowdfund.category === "Research" && (
                      <img src="charity.png" width={75} className="category" />
                    )) ||
                    (crowdfund.category === "Religious" && (
                      <img src="charity.png" width={75} className="category" />
                    )) ||
                    (crowdfund.category === "Other" && (
                      <img src="charity.png" width={75} className="category" />
                    ))}
                </div>
              </a>

              <div className="box">
                <p className="desc">{crowdfund.description}</p>
                <div className="status">
                  <p className="progress">
                    <strong>
                      {String(crowdfund.goal - currentContractBalance)}
                    </strong>{" "}
                    Wei needed to reach our goal.
                  </p>
                  <div
                    style={{
                      visibility: goalReached ? "hidden" : "visible",
                    }}
                  >
                    <input
                      className="donate-box"
                      type="number"
                      onChange={(e) => setContribution(Number(e.target.value))}
                    />
                    <button onClick={donateToCause} className="donate">
                      Donate
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      }
    </>
  );
}

export default CrowdfundCard;
