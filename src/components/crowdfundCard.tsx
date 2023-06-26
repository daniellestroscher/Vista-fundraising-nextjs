import React, { useEffect, useState } from "react";
import { CrowdfundWithMeta } from "../types";
import styles from "../../styles/components/crowdfundCard.module.css";
import DonateBox from "./donateBox";
import { useRouter } from "next/router";

import CrowdfundArtifact from "../constants/Crowdfund.json";
import { useContractRead } from "wagmi";
import Link from "next/link";

type props = {
  crowdfund: CrowdfundWithMeta;
};
export default function CrowdfundCard({ crowdfund }: props) {
  const [totalRaised, setTotalRaised] = useState<number>(0);
  const router = useRouter();

  const { data: raised } = useContractRead({
    address: crowdfund.crowdfundContract as `0x${string}`,
    abi: CrowdfundArtifact,
    functionName: "getRaised",
    watch: true,
  });
  const { data: goalReached } = useContractRead({
    address: crowdfund.crowdfundContract as `0x${string}`,
    abi: CrowdfundArtifact,
    functionName: "getGoalReached",
    watch: true,
  });

  useEffect(() => {
    setTotalRaised(Number(raised));
  }, [raised, goalReached]);

  //TODO: set different symbols for each card category.
  let symbolSrc = "";
  if (crowdfund.category === "Children") {
    symbolSrc = "charity.png";
  } else if (crowdfund.category === "Environment & Wildlife") {
    symbolSrc = "charity.png";
  } else if (crowdfund.category === "Poverty") {
    symbolSrc = "charity.png";
  } else if (crowdfund.category === "Research") {
    symbolSrc = "charity.png";
  } else if (crowdfund.category === "Religious") {
    symbolSrc = "charity.png";
  } else if (crowdfund.category === "Other") {
    symbolSrc = "charity.png";
  } else {
    symbolSrc = "charity.png";
  }

  function removeCrowdfund() {
    console.log("TODO: create remove function.");
  }

  return (
    <>
      {
        <div className={styles.container} role="article">
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
                  <img
                    src={symbolSrc}
                    width={75}
                    className={styles.category}
                    alt="category symbol"
                  />
                </div>
              </Link>

              <div className={styles.box}>
                <p className={styles.desc}>{crowdfund.descriptionShort}</p>

                <div className={styles.status}>
                  <p className={styles.progress}>
                    <strong>{String(crowdfund.goal - totalRaised)}</strong>
                    <br /> Wei needed to reach our goal.
                  </p>
                </div>
                <div className={styles.donateOrRemove}>
                  {!goalReached && router.pathname !== "/my-projects" ? (
                    <DonateBox crowdfund={crowdfund} />
                  ) : (
                    <button onClick={removeCrowdfund} className={styles.remove}>
                      Remove
                    </button>
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
