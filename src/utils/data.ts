import Promotion, { PromotionCampaign } from "../interfaces/Promotion"
import { compareDates, getDifferenceInDates } from "./date"

interface DataSlice {
  offsetY: number,
  length: number,
  value?: PromotionCampaign,
}

export function getPromotionDataSlices(promotionData: Promotion, startDate: Date, endDate: Date) {
  if (compareDates(endDate, startDate) < 0) {
    throw new Error('startDate cannot be greater than endDate')
  }

  const result: DataSlice[][] = []

  const { campaigns } = promotionData

  const sortedCampaigns = campaigns.sort(({ startDate: a }, { startDate: b }) => {
    return a.getTime() - b.getTime()
  })

  for (let i = 0; i < sortedCampaigns.length; i++) {
    const campaign = sortedCampaigns[i]
    const campaignLengthInDays = getDifferenceInDates(campaign.endDate, campaign.startDate, { 
      includeEndDate: true,
      includeStartDate: true 
    })

    const currentCell = {
      value: campaign,
      length: campaignLengthInDays,
      offsetY: 0,
    }

    for (const anotherCampaign of sortedCampaigns) {
      const campaignStartDateComparisonResult = compareDates(campaign.startDate, anotherCampaign.startDate) 
      const campaignEndDateComparisonResult = compareDates(campaign.endDate, anotherCampaign.endDate)
      
      if (campaignStartDateComparisonResult === 0 && campaignEndDateComparisonResult === 0) {
        continue;
      }

      const otherCampaignEndDateComparisonResult = compareDates(campaign.startDate, anotherCampaign.endDate)

      if (campaignStartDateComparisonResult >= 1 && otherCampaignEndDateComparisonResult <= 0) {
        currentCell.offsetY = i
      }
    } 

    if (result[currentCell.offsetY]) {
      result[currentCell.offsetY].push(currentCell)
    }
    else {
      result[currentCell.offsetY] = [currentCell]
    }
  }

  for (let i = 0; i < result.length; i++) {
    const formattedLine = []
    const line = result[i]

    let previousSliceEndDate = new Date(startDate)

    for (const entry of line) {
      if (entry.value) {
        const differenceInDays = getDifferenceInDates(entry.value.startDate, previousSliceEndDate, { 
          includeStartDate: compareDates(previousSliceEndDate, startDate) === 1 ? false : true,
          includeEndDate: false,
        })

        if (differenceInDays) {
          for (let i = 0; i < differenceInDays; i++) {
            formattedLine.push({ offsetY: i, length: 1 })
          }
        }

        formattedLine.push(entry)

        previousSliceEndDate = new Date(entry.value.endDate)
      }
    }

    const lastSliceEndDifferenceInDays = getDifferenceInDates(endDate, previousSliceEndDate)

    if (lastSliceEndDifferenceInDays) {
      for (let i = 0; i < lastSliceEndDifferenceInDays; i++) {
        formattedLine.push({ offsetY: i, length: 1 })
      }
    }

    result[i] = formattedLine
  }

  return result
}

interface DateRangeData {
  dates: string[],
  months: { name: string, length: number }[]
}

export function getDateRangeData(startDate: Date, endDate: Date): DateRangeData {
  if (compareDates(endDate, startDate) < 0) {
    throw new Error('startDate cannot be greater than endDate')
  }

  const result: DateRangeData = {
    dates: [],
    months: []
  }

  let currentDate = new Date(startDate)
  let currentMonthIndex = -1

  while (compareDates(currentDate, endDate) !== 1) {    
    result.dates.push(currentDate.getDate().toString())

    const monthIndex = currentDate.getMonth()

    if (monthIndex !== currentMonthIndex) {
      result.months.push({ name: currentDate.toLocaleString('default', { month: 'long' }), length: 1 })

      currentMonthIndex = monthIndex
    }
    else {
      result.months[result.months.length - 1].length += 1
    }

    currentDate = new Date(currentDate)
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return result
}
