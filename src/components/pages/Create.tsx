import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import DropdownMenu from "../custom-dropdown";

import Web3Modal from "web3modal";
//@ts-ignore
import { create } from "ipfs-http-client";
import { marketAddress, marketAbi } from "../../config";
import { ethers } from "ethers";

import { Buffer } from "buffer";
window.Buffer = window.Buffer || Buffer;

const infuraProjectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const apiKeySecret = process.env.REACT_APP_INFURA_SECRET;

async function setUpIpfsClient() {
  const auth =
    "Basic " +
    Buffer.from(infuraProjectId + ":" + apiKeySecret).toString("base64");
  console.log(auth, "this is the auth string");
  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });
  return client;
}

function Create() {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [formInput, setFormInput] = useState({
    name: "",
    description: "",
    goal: 0,
    category: "",
  });
  let navigate = useNavigate();

  async function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    try {
      const client = await setUpIpfsClient();
      const added = await client.add(file as File, {
        progress: (prog) => console.log(`received ${prog}`),
      });
      const url = `https://fund-meta.infura-ipfs.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (err) {
      console.log(err);
    }
  }

  async function createCrowdfund() {
    const { name, description, goal, category } = formInput;
    console.log(name, description, goal, category, fileUrl);
    if (!name || !description || !goal || !fileUrl || !category) {
      alert("all felids are required");
      return;
    }

    const data = JSON.stringify({
      name,
      description,
      goal,
      category,
      image: fileUrl,
    });

    try {
      const client = await setUpIpfsClient();
      const added = await client.add(data);
      const url = `https://fund-meta.infura-ipfs.io/ipfs/${added.path}`;
      postCrowdfund(goal, url);
    } catch (err) {
      console.log(err);
    }
  }

  async function postCrowdfund(goal: number, url: string) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      marketAddress,
      marketAbi,
      signer
    );

    let transaction = await marketContract.createCrowdfund(goal, url);
    await transaction.wait();
    navigate("/");
  }

  return (
    <div className="page">
      <div className="form">
        <input
          placeholder="Name"
          className="input"
          onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="input"
          onChange={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="financial goal"
          className="input"
          type="number"
          onChange={(e) =>
            setFormInput({ ...formInput, goal: Number(e.target.value) })
          }
        />
        <DropdownMenu setFormInput={setFormInput} formInput={formInput}/>

        <input type="file" name="Asset" className="" onChange={onFileChange} />
        {fileUrl && <img className="" width="350" src={fileUrl} />}
        <button onClick={createCrowdfund} className="submit">
          Create Defi Crowdfund
        </button>
      </div>
    </div>
  );
}

export default Create;
