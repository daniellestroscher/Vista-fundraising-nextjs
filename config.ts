export const MarketAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const MarketAbi = [
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
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getCrowdfund",
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
        ],
        internalType: "struct CrowdfundMarket.CrowdfundObj",
        name: "",
        type: "tuple",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "idToCrowdfund",
    outputs: [
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
    ],
    stateMutability: "view",
    type: "function",
  },
];

// CROWDFUND CONTRACT //

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
    name: "goal",
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
    name: "goalReached",
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
    name: "raised",
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


