import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../../custom-dropdown";
import "./Create.css";

//@ts-ignore
import { create } from "ipfs-http-client";
import { marketAddress, marketAbi } from "../../../config";
import { ethers } from "ethers";

import { Buffer } from "buffer";
import { useContract, useSigner, useAccount } from "wagmi";
import NavBar from "../../navBar";
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
    descriptionShort: "",
    descriptionLong: "",
    goal: 0,
    category: "",
  });
  let navigate = useNavigate();
  const { isConnected } = useAccount();
  const { data: signer } = useSigner();

  const marketContract = useContract({
    address: marketAddress,
    abi: marketAbi,
    signerOrProvider: signer,
  }) as ethers.Contract;

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
    const { name, descriptionShort, descriptionLong, goal, category } =
      formInput;
    console.log(name, descriptionShort, goal, category, fileUrl);
    if (!name || !descriptionShort || !goal || !fileUrl || !category) {
      alert("missing felids are required");
      return;
    }

    const data = JSON.stringify({
      name,
      descriptionShort,
      descriptionLong,
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
    let transaction = await marketContract.createCrowdfund(goal, url);
    await transaction.wait();
    navigate("/");
  }

  return (
    <>
      <NavBar searchQuery={""} setSearchQuery={undefined} />
      {isConnected && (
        <div className="page">
          <div className="form">
            <input
              placeholder="Name"
              className="input"
              onChange={(e) =>
                setFormInput({ ...formInput, name: e.target.value })
              }
            />
            <textarea
              placeholder="Short Description"
              maxLength={250}
              className="input textarea"
              onChange={(e) =>
                setFormInput({ ...formInput, descriptionShort: e.target.value })
              }
              style={{ height: "15px" }}
            />
            <textarea
              placeholder="Long Description (optional)"
              className="input textarea"
              onChange={(e) =>
                setFormInput({ ...formInput, descriptionLong: e.target.value })
              }
              style={{ height: "15px" }}
            />
            <input
              placeholder="Financial goal in Wei"
              className="input"
              type="number"
              onChange={(e) =>
                setFormInput({ ...formInput, goal: Number(e.target.value) })
              }
            />
            <DropdownMenu setFormInput={setFormInput} formInput={formInput} />

            <input
              type="file"
              name="Asset"
              className="input"
              onChange={onFileChange}
            />
            {fileUrl && <img className="" width="350" src={fileUrl} />}
            <button onClick={createCrowdfund} className="submit">
              Create Defi Crowdfund
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Create;
