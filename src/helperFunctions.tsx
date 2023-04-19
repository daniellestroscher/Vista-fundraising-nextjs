import { ethers } from "ethers";
import { CrowdfundWithMeta } from "./types";
import { CrowdfundAbi, MarketAbi, MarketAddress } from "../config";

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
