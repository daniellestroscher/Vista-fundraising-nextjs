import React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/pages/create.module.css";
import NavBar from "../src/components/navBar";
import DropdownMenu from "../src/components/customDropdown";

import { create, IPFSHTTPClient } from "ipfs-http-client";
import { MarketAddress } from "../config";
import MarketArtifact from "../hardhat-project/artifacts/contracts/CrowdfundMarket.sol/CrowdfundMarket.json";

import { Buffer } from "buffer";
import { useAccount } from "wagmi";
import { prepareWriteContract, writeContract } from "@wagmi/core";

const infuraProjectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const apiKeySecret = process.env.NEXT_PUBLIC_INFURA_SECRET;

async function createIpfsClient() {
  const auth =
    "Basic " +
    Buffer.from(infuraProjectId + ":" + apiKeySecret).toString("base64");

  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  }) as IPFSHTTPClient;
  return client;
}

function Create() {
  const [hasMounted, setHasMounted] = useState(false);
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string | ArrayBuffer>("");
  const [formInput, setFormInput] = useState({
    name: "",
    descriptionShort: "",
    descriptionLong: "",
    goal: 0,
    category: "",
  });
  const router = useRouter();
  const { isConnected } = useAccount();
  useEffect(() => {
    if (!isConnected) router.push("/");
  }, [isConnected]);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  useEffect(() => {
    if (file) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (e) => {
        const { result } = e.target as FileReader;
        if (result) {
          setFileUrl(result);
        }
      };
    }
  }, [file]);
  if (!hasMounted) {
    return null;
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (!file.type.match(imageMimeType)) {
        alert("Image mime type is not valid");
        return;
      }
      setFile(file);
    }
  }

  async function createFundraiser(e: React.MouseEvent) {
    e.preventDefault();
    const { name, descriptionShort, descriptionLong, goal, category } =
      formInput;
    if (!name || !descriptionShort || !goal || !fileUrl || !category) {
      alert("missing felids are required");
      return;
    }
    console.log(name, descriptionShort, goal, category, fileUrl);

    const data = JSON.stringify({
      name,
      descriptionShort,
      descriptionLong,
      goal,
      category,
      image: fileUrl,
    });

    try {
      const client = await createIpfsClient();
      const result = await client.add(data);
      const url = `https://fund-meta.infura-ipfs.io/ipfs/${result.path}`;
      postCrowdfund(goal, url);
    } catch (err) {
      console.log(err, "Error creating IPFS client or posting crowdfund");
    }
  }

  async function postCrowdfund(goal: number, url: string) {
    try {
      let config = await prepareWriteContract({
        address: MarketAddress,
        abi: MarketArtifact.abi,
        functionName: "createCrowdfund",
        args: [goal, url],
      });
      const data = await writeContract(config);
      await data.wait();
      //TODO: ADD LOADING PAGE WHEN WAITING FOR TRANSACTION, BEFORE REDIRECT
      router.push("/");
    } catch (err) {
      console.log(
        err,
        "Error calling createCrowdfund function on Market contract."
      );
    }
  }

  return (
    <div role="create-component">
      <NavBar searchQuery={""} setSearchQuery={undefined} />
      {isConnected && (
        <div className={styles.page}>
          <form className={styles.form}>
            <input
              placeholder="Name"
              className={styles.input}
              onChange={(e) =>
                setFormInput({ ...formInput, name: e.target.value })
              }
            />
            <textarea
              placeholder="Short Description"
              maxLength={250}
              className={`${styles.input} ${styles.textarea}`}
              onChange={(e) =>
                setFormInput({ ...formInput, descriptionShort: e.target.value })
              }
              style={{ height: "15px" }}
            />
            <textarea
              placeholder="Long Description (optional)"
              className={`${styles.input} ${styles.textarea}`}
              onChange={(e) =>
                setFormInput({ ...formInput, descriptionLong: e.target.value })
              }
              style={{ height: "15px" }}
            />
            <input
              placeholder="Financial goal in Wei"
              className={styles.input}
              type="number"
              onChange={(e) =>
                setFormInput({ ...formInput, goal: Number(e.target.value) })
              }
            />
            <DropdownMenu setFormInput={setFormInput} formInput={formInput} />

            <input
              type="file"
              name="Asset"
              className={styles.input}
              onChange={onFileChange}
            />
            {fileUrl && (
              <img
                width="350"
                src={fileUrl as string}
                className={styles.displayPhoto}
              />
            )}
            <button onClick={createFundraiser} className={styles.submit}>
              Create Defi Fundraiser
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Create;
