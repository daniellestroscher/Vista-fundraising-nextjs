import Web3 from "web3";

export async function setWeb3() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://localhost:8545")
  );
  return web3;
}