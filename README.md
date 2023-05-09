# Vista Fundraising
This is a fundraising app built with Next.js and Hardhat where users can add fundraising projects for causes they love, or contribute to others. The app interacts with a smart contracts currently deployed on the Mumbai testnet or alterantively, you can open the project and deploy it on a local network.

<div style="display: flex; flex-direction: row;">
  <img src="https://user-images.githubusercontent.com/110689119/237010708-9a9b29ab-47c4-44c9-880c-5f2ea03b69d0.png" alt="Image description" width="560" height="350">
  <img src="https://user-images.githubusercontent.com/110689119/237007578-d8bf2423-d89e-4d63-bce4-31301c62d2dc.png" alt="Image description" width="560" height="350">
  <img src="https://user-images.githubusercontent.com/110689119/237008139-c9978dcc-4b3b-4eb7-80c9-9da73c55be1e.png" alt="Image description" width="560" height="350">
  <img src="https://user-images.githubusercontent.com/110689119/237008208-02a7e89a-1a14-4726-b4c4-4088f78521d1.png" alt="Image description" width="560" height="350">
  <img src="https://user-images.githubusercontent.com/110689119/237008451-5321aa6e-fe58-4586-b94f-f0f1e70ebf21.png" alt="Image description" width="560" height="350">
</div>

## Getting Started
To get started with the app, you need to add the following files:

**.env folder** in the root of the project with the necessary environment variables.
```bash
NEXT_PUBLIC_INFURA_PROJECT_ID=""
NEXT_PUBLIC_INFURA_SECRET=""
NEXT_PUBLIC_INFURA_API=""
```
you can find these keys after making a free account with [infura.io](https://www.infura.io/), infura is the service used to host the node and conect to ipfs for this project. NEXT_PUBLIC_INFURA_PROJECT_ID and NEXT_PUBLIC_INFURA_SECRET will be in ipfs settings, NEXT_PUBLIC_INFURA_API key will be in Web3 Api settings.

another **.env folder** in the root of the hardhat-project folder with the necessary environment variables.
```bash
INFURA_API=""
```
this is the same variable as NEXT_PUBLIC_INFURA_API from the previous instuction.

**.secret file** in the root of the hardhat-project folder containing a private key for a crypto wallet address to deploy/compile from. <br/>
readFileSync is used to read this secret file so it is not included in the environment varibales which can be less secure for your private key. You can find this in the Hardhat config.

## Install
Download all the required dependancies:
start at the root of the project,
```bash
npm i
cd hardhat-project
npm i
cd ../
```
compile the hardhat project:
```bash
cd hardhat-project
npx hardhat compile
```

## Open the project
#### If you want to use Mumbai testnet:
This project should be deployed to the mumbai testnet and by default configured to call the proper contract address deployed there. Simply check that your connected wallet is connected to the mumbai testnet and that you have some test MATIC to pay for transactions as well. if you dont, you can use this [faucet](https://faucet.polygon.technology/) or [this one](https://mumbaifaucet.com/). 

Then run the development server:
```bash
npm run dev
# or
yarn dev
```

#### If you want to use localhost:
start a local node,
```bash
cd hardhat-project
npx harhat node
```
make sure your metamask wallet/other chosen wallet is set to be using localhost, once the node is up it will give your the full address, most likely localhost:8545. It should also display the test accounts and their private keys so you can import them into your wallet's browser extention in order to interact with the project.

deploy contracts to localhost in a new terminal
```bash
npx hardhat run scripts/deploy.ts network --localhost
```
this command sould return a market address, copy this address and update the MarketAddress varible in the config.ts file at the root of the project.

Now you can run the development server:
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Contributing:
Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or a pull request on this repository.








