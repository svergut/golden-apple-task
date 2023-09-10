import data from '../data/promotions.json'
import Promotion, { PromotionCampaign } from '../interfaces/Promotion'

export function getPromotions(): Promotion[] {
  const { promotions } = data

  return promotions.reduce<Promotion[]>((previousValue, currentPromotion, index, sourceData) => {
    const { startDate, endDate, title, rules } = currentPromotion

    const campaign: PromotionCampaign = {
      title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      rules
    }

    const existingCategory = previousValue.find(({ CategoryId }) => CategoryId === currentPromotion.CategoryId)

    if (existingCategory) {
      existingCategory.campaigns.push(campaign)
    } 
    else {
      const { id, CategoryId, CategoryName } = currentPromotion

      const promotion: Promotion = {
        id,
        CategoryId,
        CategoryName,
        campaigns: [campaign]
      }

      previousValue.push(promotion)
    }

    return previousValue
  }, [])
} 