import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DonateBox from "../../src/components/donateBox";
import styles from "../../styles/pages/project-info.module.css";

import { Crowdfund, CrowdfundWithMeta } from "../../src/types";
import { CrowdfundAbi, MarketAbi, MarketAddress } from "../../config";
import axios from "axios";
import { useContractRead, useAccount, useBalance } from "wagmi";
import { readContract, prepareWriteContract, writeContract } from "@wagmi/core";
import NavBar from "../../src/components/navBar";

export default function ProjectInfo() {
  const router = useRouter();
  const { id } = router.query;

  const [crowdfund, setCrowdfund] = useState<CrowdfundWithMeta>();
  const [totalRaised, setTotalRaised] = useState<Number>();
  const { address } = useAccount();

  const { data: raised } = useContractRead({
    address: crowdfund?.crowdfundContract as `0x${string}`,
    abi: CrowdfundAbi,
    functionName: "raised",
    watch: true,
  });

  const { data } = useBalance({
    address: crowdfund?.crowdfundContract as `0x${string}`,
  });

  useEffect(() => {
    if (id) {
      getProject();
    }
  }, [id, data]);

  useEffect(() => {
    setTotalRaised(Number(raised));
  }, [raised]);

  async function getProject() {
    const crowdfundObj = (await readContract({
      address: MarketAddress,
      abi: MarketAbi,
      functionName: "getCrowdfund",
      args: [Number(id)],
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
    } as CrowdfundWithMeta;
    setCrowdfund(crowdfund);
  }

  async function withdrawFunds() {
    if (Number(data) == 0) {
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
    }
  }

  return (
    <>
      {crowdfund && (
        <>
          <NavBar searchQuery={""} setSearchQuery={undefined} />
          <section className={styles.mainContainer}>
            <div
              style={{ backgroundImage: `url(${crowdfund.image})` }}
              className={styles.header}
            >
              <h2 className={styles.pageTitle}>{crowdfund.name}</h2>
              {address === crowdfund.owner ? (
                <div className={styles.contentContainer}>
                  <p>Current Contract Balance: {Number(data?.value)} Wei</p>
                  <button className={styles.button} onClick={withdrawFunds}>
                    Withdraw
                  </button>
                  {/* TODO: maybe add change goal feature */}
                </div>
              ) : (
                <div className={styles.contentContainer}>
                  <DonateBox crowdfund={crowdfund} />
                </div>
              )}
            </div>
            <section className={styles.descriptionBox}>
              <p className={styles.descriptionShort}>
                {crowdfund.descriptionShort}
              </p>
              <div></div>
              <p className={styles.descriptionLong}>
                {crowdfund.descriptionLong}
              </p>
            </section>
            <section className={styles.goalStatsBox}>
              <h4>Raised: {totalRaised as number} Wei</h4>
              <h4>Goal: {crowdfund.goal as number} Wei</h4>
            </section>
          </section>
        </>
      )}
    </>
  );
}
