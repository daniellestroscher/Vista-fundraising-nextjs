import { HardhatUserConfig } from "hardhat/config";
//import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-waffle";
require("dotenv").config();

const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();
const projectId = process.env.INFURA_API;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${projectId}`,
      chainId: 5,
      accounts: [mnemonic],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${projectId}`,
      chainId: 80001,
      accounts: [mnemonic],
    },
  },
};

export default config;
