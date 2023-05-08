# Vista Fundraising
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`]

This is a fundraising app built with Next.js where users can add fundraising projects for causes they love, or contribute to others. The app interacts with a smart contracts currently deployed on the Mumbai testnet or alterantively, you can open the project and deploy it on a local network.

## Getting Started
To get started with the app, you need to add the following files:

**.env folder** in the root of the project with the necessary environment variables.
```bash
NEXT_PUBLIC_INFURA_PROJECT_ID=""
NEXT_PUBLIC_INFURA_SECRET=""
NEXT_PUBLIC_INFURA_API=""
```
you can find these keys after making a free account with [infura.io](https://www.infura.io/), infura is the service used to host the node and conect to ipfs for this project.

**.secret file** in the root of the hardhat-project folder containing a private key for a crypto wallet.
-readFileSync is used to read this secret file so it is not included in the environment varibales which can be less secure for your private key.

## Install
Download all the required dependancies:
start at the root of the project,
```bash
npm i
cd hardhat-project
npm i
cd ../
```

## Open the project
#### If you want to use localhost:</u>

start a local node,
```bash
cd hardhat-project
npx harhat node
```
make sure your metamask wallet/other chosen wallet is set to be using localhost, once the node is up it will give your the full address, most likely localhost:8545.

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

#### If you want to use Mumbai testnet:
this project should be deployed to the mumbai testnet and by dafault configured to call the proper addresses deployed there. Simply check that your connected wallet is connected to the mumbai testnet as well. Then run the development server:
```bash
npm run dev
# or
yarn dev
```

# Contributing:
Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or a pull request on this repository.








