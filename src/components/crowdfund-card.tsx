import { CrowdfundWithMeta } from "../types";
import "./crowdfund-card.css";

import { CrowdfundAbi } from "../config";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { sendTransaction, prepareSendTransaction } from "@wagmi/core";

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
  }, [amountRaised, goalReached]);

  async function donateToCause() {
    const config = await prepareSendTransaction({
      request: { to: crowdfund.crowdfundContract, value: contribution },
    });
    const { hash } = await sendTransaction(config);
    console.log(hash, "transaction hash");
  }
  function removeCrowdfund() { alert('TODO: create remove function.') }

  return (
    <>
      {
        <div className="container">
          <div
            className={
              !goalReached ? "crowdfund-item" : "crowdfund-item-complete"
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
                      color: goalReached ? "rgb(9, 103, 18)" : "inherit",
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
                  {!goalReached ? (
                    <div>
                      <input
                        className="donate-box"
                        type="number"
                        onChange={(e) =>
                          setContribution(Number(e.target.value))
                        }
                      />
                      <button onClick={donateToCause} className="donate">
                        Donate
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={removeCrowdfund} className="donate">
                        Remove
                      </button>
                    </div>
                  )}
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
