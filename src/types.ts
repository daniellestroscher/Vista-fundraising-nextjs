export interface Crowdfund {
  fundId: number;
  metaUrl: string;
  crowdfundContract: string;
  owner: string;
  goal: number;
  goalReached: boolean;
}
export interface CrowdfundWithMeta {
  fundId: number;
  crowdfundContract: string;
  name: string;
  descriptionShort: string;
  descriptionLong?: string;
  image: string;
  category: string;
  owner: string;
  goal: number;
  goalReached: boolean;
}
export interface NetworkMappingType {
  [key: number]: {
    CrowdfundMarketplace: string[];
  };
}
