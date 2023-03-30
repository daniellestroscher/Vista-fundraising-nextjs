export const marketAddress = "0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1";
export const marketAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fundId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "metaUrl",
        type: "string",
      },
      {
        indexed: true,
        internalType: "address",
        name: "crowdfundContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "goal",
        type: "uint256",
      },
    ],
    name: "CrowdfundCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "_fundsGoalsMet",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "fundContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_goal",
        type: "uint256",
      },
    ],
    name: "checkActiveStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_goal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minContribution",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_metaUrl",
        type: "string",
      },
    ],
    name: "createCrowdfund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveFundraisers",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "fundId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metaUrl",
            type: "string",
          },
          {
            internalType: "address",
            name: "crowdfundContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "goal",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "goalReached",
            type: "bool",
          },
        ],
        internalType: "struct CrowdfundMarket.CrowdfundObj[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyActiveFundraisers",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "fundId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metaUrl",
            type: "string",
          },
          {
            internalType: "address",
            name: "crowdfundContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "goal",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "goalReached",
            type: "bool",
          },
        ],
        internalType: "struct CrowdfundMarket.CrowdfundObj[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyCompletedFundraisers",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "fundId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metaUrl",
            type: "string",
          },
          {
            internalType: "address",
            name: "crowdfundContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "goal",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "goalReached",
            type: "bool",
          },
        ],
        internalType: "struct CrowdfundMarket.CrowdfundObj[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyFundraisers",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "fundId",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "metaUrl",
            type: "string",
          },
          {
            internalType: "address",
            name: "crowdfundContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "goal",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "goalReached",
            type: "bool",
          },
        ],
        internalType: "struct CrowdfundMarket.CrowdfundObj[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const CrowdfundAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_goal",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_minContribution",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
