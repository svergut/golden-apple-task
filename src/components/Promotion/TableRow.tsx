import { useMemo } from "react"
import Promotion from "../../interfaces/Promotion"
import styles from './tablerow.module.css'
import cn from "classnames"
import { compareDates } from "../../utils/date"

interface TableRowProps {
  promotionData: Promotion,
  startDate: Date,
  endDate: Date
}

interface TableCellProps {
  date: Date,
  isMarked: boolean
}

export default function TableRow({ 
  promotionData,
  startDate,
  endDate
}: TableRowProps) {
  const datesToRender: TableCellProps[] = useMemo(() => {
    const result: TableCellProps[] = []

    if (!startDate) {
      return result
    }

    const { campaigns } = promotionData

    let closestCampaignIndex = 0
    let currentDate = new Date(startDate)

    while (compareDates(currentDate, endDate) !== 1) {
      let isMarked = false
      const closestCampaign = campaigns[closestCampaignIndex]

      if (closestCampaign) {
        const campaignStartDateComparisonResult = compareDates(closestCampaign.startDate, currentDate) 
        const campaignEndDateComparisonResult = compareDates(closestCampaign.endDate, currentDate) 

        // current date is inside campaign time frame
        if (campaignStartDateComparisonResult <= 0 && campaignEndDateComparisonResult >= 0) {
          isMarked = true
        }

        // find next closest campaign
        if (compareDates(closestCampaign.endDate, currentDate) === 0) {
          closestCampaignIndex++ 
        } 
      }

      result.push({
        date: currentDate,
        isMarked: isMarked
      })

      currentDate = new Date(currentDate)
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return result
  }, [startDate, endDate, promotionData])

  console.log({promotionData})

  return (
    <div>
      <h3>{promotionData.CategoryName}</h3>

      {
        datesToRender.map(({ date, isMarked }, index) => {
          return (
            <span key={index} className={cn(styles.cell, isMarked && styles.cellMarked)}>{date.getDate()}.{date.getMonth() + 1  }</span>
          )
        })
      }
    </div>
  )
}