export const marketAddress = "0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB";
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
        name: "_value",
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
        name: "_goal",
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
    stateMutability: "view",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_fundContract",
        type: "address",
      },
    ],
    name: "setGoalReached",
    outputs: [],
    stateMutability: "nonpayable",
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
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_checkAddress",
        type: "address",
      },
    ],
    name: "checkIfContributor",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
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
