import data from '../data/promotions.json'
import colorsData from '../data/promotionColors.json'
import Promotion, { PromotionCampaign } from '../interfaces/Promotion'

const promotionColors: {
  [key: string]: string | undefined
} = { ...colorsData.promotionColors }

export function getPromotions(): Promotion[] {
  const { promotions } = data

  return promotions.reduce<Promotion[]>((previousValue, currentPromotion, index, sourceData) => {
    const { startDate: startDateRaw, endDate: endDateRaw, title, rules } = currentPromotion

    const startDate = new Date(startDateRaw)
    const endDate = new Date(endDateRaw)

    const campaign: PromotionCampaign = {
      title,
      startDate,
      endDate,
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
        color: promotionColors[CategoryId] || colorsData.promotionColors.default,
        campaigns: [campaign]
      }

      previousValue.push(promotion)
    }

    return previousValue
  }, [])
} 