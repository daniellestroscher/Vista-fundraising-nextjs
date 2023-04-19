import { useEffect, useState } from "react";
import { CrowdfundWithMeta } from "../types";
import styles from "../../styles/components/crowdfundCard.module.css";
import DonateBox from "./donateBox";
import { useRouter } from "next/router";

import { CrowdfundAbi } from "../../config";
import { useContractRead } from "wagmi";
import Link from "next/link";

type props = {
  crowdfund: CrowdfundWithMeta;
};
function CrowdfundCard({ crowdfund }: props) {
  const [totalRaised, setTotalRaised] = useState<number>(0);
  const router = useRouter();

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
              <img
                src={crowdfund.image}
                width={350}
                className="image"
                alt="Fundraiser"
              />
            </div>
            <section className="info">
              <Link
                href="/projects/[id]"
                as={`/projects/${crowdfund.fundId}`}
                onClick={() =>
                  window.location.replace(`/projects/${crowdfund.fundId}`)
                }
              >
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
                    <img
                      src="charity.png"
                      width={75}
                      className="category"
                      alt="category symbol"
                    />
                  )) ||
                    (crowdfund.category === "Environment & Wildlife" && (
                      <img
                        src="charity.png"
                        width={75}
                        className="category"
                        alt="category symbol"
                      />
                    )) ||
                    (crowdfund.category === "Poverty" && (
                      <img
                        src="charity.png"
                        width={75}
                        className="category"
                        alt="category symbol"
                      />
                    )) ||
                    (crowdfund.category === "Research" && (
                      <img
                        src="charity.png"
                        width={75}
                        className="category"
                        alt="category symbol"
                      />
                    )) ||
                    (crowdfund.category === "Religious" && (
                      <img
                        src="charity.png"
                        width={75}
                        className="category"
                        alt="category symbol"
                      />
                    )) ||
                    (crowdfund.category === "Other" && (
                      <img
                        src="charity.png"
                        width={75}
                        className="category"
                        alt="category symbol"
                      />
                    ))}
                </div>
              </Link>

              <div className="box">
                <p className="desc">{crowdfund.descriptionShort}</p>

                <div className="status">
                  <p className="progress">
                    <strong>{String(crowdfund.goal - totalRaised)}</strong> Wei
                    needed to reach our goal.
                  </p>
                  {!goalReached && router.pathname !== "/my-projects" ? (
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
