import { CrowdfundWithMeta } from "../types";
import "./crowdfund-card.css";

import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CrowdfundAbi } from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type props = {
  crowdfund: CrowdfundWithMeta;
};
function CrowdfundCard({ crowdfund }: props) {
  const [contribution, setContribution] = useState<number | undefined>(0);
  const [fundBalance, setFundBalance] = useState<number>(0);
  let navigate = useNavigate();

  useEffect(()=> {
    getFundBalance();
  }, []);

  async function donateToCause() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const crowdfundContract = new ethers.Contract(
      crowdfund.crowdfundContract,
      CrowdfundAbi,
      signer
    );
    let transaction = await crowdfundContract.donate({ value: contribution });
    let tx = await transaction.wait();
    console.log(tx);

    getFundBalance();
    navigate("/");
  }
  async function getFundBalance() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const crowdfundContract = new ethers.Contract(
      crowdfund.crowdfundContract,
      CrowdfundAbi,
      signer
    );
    let transactionToGetRaised = await crowdfundContract.getBalance();
    transactionToGetRaised = transactionToGetRaised.toNumber();
    setFundBalance(transactionToGetRaised);

  }

  return (
    <div className="crowdfund-item">
      <img src={crowdfund.image} width={350} className="image" />
      <section className="info">
        <div className="box">
          <h3 className="fund-name">{crowdfund.name}</h3>
          <p className="desc">{crowdfund.description}</p>
        </div>
        <div className="box">
          <h5 className="progress">Raised: {fundBalance} Wei</h5>
          <h5 className="progress">Our goal: {crowdfund.goal} Wei</h5>
          <input
            type="number"
            onChange={(e) => setContribution(Number(e.target.value))}
          />
          <button onClick={donateToCause} className="donate">
            Donate
          </button>
        </div>
      </section>
    </div>
  );
}

export default CrowdfundCard;
