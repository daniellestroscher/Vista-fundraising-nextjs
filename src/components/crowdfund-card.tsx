import { useEffect, useState } from "react";
import { CrowdfundWithMeta } from "../types";
import "./crowdfund-card.css";
import DonateBox from "./donate-box";
import { useLocation } from 'react-router-dom';

import { CrowdfundAbi } from "../config";
import { useContractRead } from "wagmi";


type props = {
  crowdfund: CrowdfundWithMeta;
};
function CrowdfundCard({ crowdfund }: props) {
  const [totalRaised, setTotalRaised] =
    useState<number>(0);
    const location = useLocation();

  const { data: raised } = useContractRead({
    address: crowdfund.crowdfundContract as `0x${string}`,
    abi: CrowdfundAbi,
    functionName: "raised",
    watch: true,
  });
  const { data: goalReached } = useContractRead({
    address: crowdfund.crowdfundContract as `0x${string}`,
    abi: CrowdfundAbi,
    functionName: "goalReached",
    watch: true,
  });

  useEffect(() => {
    setTotalRaised(Number(raised));
  }, [raised, goalReached]);

  function removeCrowdfund() {
    alert("TODO: create remove function.");
  }

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
                <a href={`/projects/${crowdfund.fundId}`}>
                  <p className="desc">{crowdfund.descriptionShort}</p>
                </a>
                <div className="status">
                  <p className="progress">
                    <strong>
                      {String(crowdfund.goal - totalRaised)}
                    </strong>{" "}
                    Wei needed to reach our goal.
                  </p>
                  {!goalReached && location.pathname != "/my-projects" ? (
                    <DonateBox crowdfund={crowdfund} />
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
