export const marketAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const marketAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "fundId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "crowdfundContractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "goal",
        "type": "uint256"
      }
    ],
    "name": "CrowdfundCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_goal",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_minContribution",
        "type": "uint256"
      }
    ],
    "name": "createCrowdfund",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getActiveFundraisers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "fundId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "crowdfundContract",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "goal",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "goalReached",
            "type": "bool"
          }
        ],
        "internalType": "struct CrowdfundMarket.CrowdfundObj[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyActiveFundraisers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "fundId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "crowdfundContract",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "goal",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "goalReached",
            "type": "bool"
          }
        ],
        "internalType": "struct CrowdfundMarket.CrowdfundObj[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyCompletedFundraisers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "fundId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "crowdfundContract",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "goal",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "goalReached",
            "type": "bool"
          }
        ],
        "internalType": "struct CrowdfundMarket.CrowdfundObj[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMyFundraisers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "fundId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "crowdfundContract",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "goal",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "goalReached",
            "type": "bool"
          }
        ],
        "internalType": "struct CrowdfundMarket.CrowdfundObj[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];