import { ethers } from "ethers";
import { CrowdfundWithMeta } from "./types";
import { CrowdfundAbi, marketAbi, marketAddress } from "./config";


// export async function setCrowdfundGoalReached(
//   marketContractInstance: ethers.Contract,
//   crowdfundAddress: string
// ) {
//   let transactionToSetGoalReached = await marketContractInstance.setGoalReached(
//     crowdfundAddress
//   );
//   let tx = await transactionToSetGoalReached.wait();
//   console.log(tx);
// }

// export async function getFundBalance(
//   _crowdfund: CrowdfundWithMeta,
//   signer: ethers.Signer
// ) {
//   //const signer = provider.getSigner();
//   const crowdfundContractInstance = new ethers.Contract(
//     _crowdfund.crowdfundContract,
//     CrowdfundAbi,
//     signer
//   );

//   let currentContractBalance = await crowdfundContractInstance.getBalance();
//   currentContractBalance = currentContractBalance.toNumber();
//   if (
//     currentContractBalance >= _crowdfund.goal &&
//     _crowdfund.goalReached !== true
//   ) {
//     const marketContract = new ethers.Contract(
//       marketAddress,
//       marketAbi,
//       signer
//     );
//     setCrowdfundGoalReached(marketContract, _crowdfund.crowdfundContract);
//   }

//   return { currentContractBalance, crowdfundContractInstance };
// }

export const filterFunds = (fundList: CrowdfundWithMeta[], query: string) => {
  if (!query) {
    return fundList;
  }

  return fundList.filter((fund) => {
    const crowdfundName = fund.name;
    const crowdfundNameLowercase = fund.name.toLowerCase();
    const crowdfundCategory = fund.category;
    const crowdfundCategoryLowerCase = fund.category.toLowerCase();

    return (
      crowdfundName.includes(query) ||
      crowdfundNameLowercase.includes(query) ||
      crowdfundCategory.includes(query) ||
      crowdfundCategoryLowerCase.includes(query)
    );
  });
};
