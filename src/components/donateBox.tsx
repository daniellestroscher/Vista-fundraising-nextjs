import React, { useState } from "react";
import styles from "../../styles/components/donateBox.module.css";
import { ethers } from "ethers";
import {
  prepareSendTransaction,
  prepareWriteContract,
  sendTransaction,
  writeContract,
} from "@wagmi/core";
import { CrowdfundWithMeta } from "../types";
import { CrowdfundAbi } from "../../config";
import { useAccount } from "wagmi";

type props = {
  crowdfund: CrowdfundWithMeta;
};
export default function DonateBox({ crowdfund }: props) {
  const [contribution, setContribution] = useState<number | undefined>(0);
  const { address } = useAccount();

  async function donateToCause() {
    const config = await prepareSendTransaction({
      //address: crowdfund.crowdfundContract as `0x${string}`,
      //abi: CrowdfundAbi,
      //functionName: "donate",
      // overrides: {
      //   from: address,
      //   value: contribution,
      // },
      request: {
        to: crowdfund.crowdfundContract,
        value: contribution,
      },
    });
    const { hash } = await sendTransaction(config);
    console.log(hash, "transaction hash");
  }

  return (
    <div role="donate">
      <input
        className={styles.donateBox}
        type="number"
        onChange={(e) => setContribution(Number(e.target.value))}
        data-testid="donate-input"
      />
      <button onClick={donateToCause} className={styles.donate}>
        Donate
      </button>
    </div>
  );
}
