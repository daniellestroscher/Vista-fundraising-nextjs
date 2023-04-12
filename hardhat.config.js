require("@nomiclabs/hardhat-waffle");
const infura_api = process.env.REACT_APP_INFURA_API;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${infura_api}`,
      chainId:5,
    }
  },
};
