import React, { useState } from "react";
import styles from "../../styles/components/donateBox.module.css";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import { CrowdfundWithMeta } from "../types";

import CrowdfundArtifact from "../constants/Crowdfund.json";

type props = {
  crowdfund: CrowdfundWithMeta;
};
export default function DonateBox({ crowdfund }: props) {
  const [contribution, setContribution] = useState<number | string>("");

  async function donateToCause() {
    try {
      const config = await prepareWriteContract({
        address: crowdfund.crowdfundContract as `0x${string}`,
        abi: CrowdfundArtifact,
        functionName: "donate",
        overrides: {
          value: contribution as number,
        },
      });
      const data = await writeContract(config);
      await data.wait();
      setContribution("");
    } catch (err) {
      console.log(err, "error donating to cause.");
      alert("Donation amount cannot be 0.");
    }
  }

  return (
    <div role="donate">
      <input
        className={styles.donateBox}
        type="number"
        value={contribution}
        onChange={(e) => setContribution(Number(e.target.value))}
        data-testid="donate-input"
      />
      <button onClick={donateToCause} className={styles.donate}>
        Donate
      </button>
    </div>
  );
}
