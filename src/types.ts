export interface Crowdfund {
  fundId: number,
  metaUrl: string,
  crowdfundContract: string;
  owner: string;
  goal: number;
  goalReached: boolean;
}
export interface CrowdfundWithMeta {
  fundId: number,
  crowdfundContract: string;
  name: string;
  description: string;
  image: string;
  owner: string;
  goal: number;
  goalReached: boolean;
}