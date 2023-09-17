export interface PromotionRule {
  ruleId: number,
  brandName: string,
  brandId: number,
  discount: number
}

export interface PromotionCampaign {
  title: string,
  startDate: Date,
  endDate: Date,
  rules: PromotionRule[]
}

export default interface Promotion {
  id: number,
  CategoryId: number,
  CategoryName: string,
  color: string,
  campaigns: PromotionCampaign[]
}