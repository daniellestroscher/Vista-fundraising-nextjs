import { useState } from "react";
import "./donate-box.css";
import { prepareSendTransaction, sendTransaction } from "@wagmi/core";
import { CrowdfundWithMeta } from "../types";

type props = {
  crowdfund: CrowdfundWithMeta;
}
export default function DonateBox({ crowdfund }:props) {
  const [contribution, setContribution] = useState<number | undefined>(0);

  async function donateToCause() {
    const config = await prepareSendTransaction({
      request: { to: crowdfund.crowdfundContract, value: contribution },
    });
    const { hash } = await sendTransaction(config);
    console.log(hash, "transaction hash");
  }

  return (
    <div>
      <input
        className="donate-box"
        type="number"
        onChange={(e) => setContribution(Number(e.target.value))}
      />
      <button onClick={donateToCause} className="donate">
        Donate
      </button>
    </div>
  );
}
