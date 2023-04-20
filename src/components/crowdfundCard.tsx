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
        <div className={styles.container}>
          <div
            className={`${styles.crowdfundItem}
              ${goalReached ? styles.crowdfundItemComplete : ""}`}
          >
            <div className={styles.imageBox}>
              <img
                src={crowdfund.image}
                width={350}
                className={styles.image}
                alt="Fundraiser"
              />
            </div>
            <section className={styles.info}>
              <Link
                href="/projects/[id]"
                as={`/projects/${crowdfund.fundId}`}
                onClick={() =>
                  window.location.replace(`/projects/${crowdfund.fundId}`)
                }
                className={styles.link}
              >
                <div className={styles.cardHeader}>
                  <h3
                    className={styles.fundName}
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
                      className={styles.category}
                      alt="category symbol"
                    />
                  )) ||
                    (crowdfund.category === "Environment & Wildlife" && (
                      <img
                        src="charity.png"
                        width={75}
                        className={styles.category}
                        alt="category symbol"
                      />
                    )) ||
                    (crowdfund.category === "Poverty" && (
                      <img
                        src="charity.png"
                        width={75}
                        className={styles.category}
                        alt="category symbol"
                      />
                    )) ||
                    (crowdfund.category === "Research" && (
                      <img
                        src="charity.png"
                        width={75}
                        className={styles.category}
                        alt="category symbol"
                      />
                    )) ||
                    (crowdfund.category === "Religious" && (
                      <img
                        src="charity.png"
                        width={75}
                        className={styles.category}
                        alt="category symbol"
                      />
                    )) ||
                    (crowdfund.category === "Other" && (
                      <img
                        src="charity.png"
                        width={75}
                        className={styles.category}
                        alt="category symbol"
                      />
                    ))}
                </div>
              </Link>

              <div className={styles.box}>
                <p className={styles.desc}>{crowdfund.descriptionShort}</p>

                <div className={styles.status}>
                  <p className={styles.progress}>
                    <strong>{String(crowdfund.goal - totalRaised)}</strong> Wei
                    needed to reach our goal.
                  </p>
                  {!goalReached && router.pathname !== "/my-projects" ? (
                    <DonateBox crowdfund={crowdfund} />
                  ) : (
                    <div>
                      <button
                        onClick={removeCrowdfund}
                        className={styles.donate}
                      >
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
