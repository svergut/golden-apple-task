import { useMemo } from "react"
import Promotion, { PromotionCampaign } from "../../interfaces/Promotion"
import styles from './tablerow.module.css'
import cn from "classnames"
import { compareDates, getDifferenceInDates } from "../../utils/date"

interface TableRowProps {
  promotionData: Promotion,
  startDate: Date,
  endDate: Date
}

interface TableCellProps {
  date: Date,
  campaigns: PromotionCampaign[],
}

interface RowProps {
  cells: CellProps[][]
}

interface CellProps {
  offsetY: number,
  length: number,
  value?: PromotionCampaign,
}

const itemWidthPx = 40

export default function TableRow({ 
  promotionData,
  startDate,
  endDate
}: TableRowProps) {
  const slicesToRender: CellProps[][] = useMemo(() => {
    const result: CellProps[][] = []

    if (!startDate) {
      return result
    }

    const { campaigns } = promotionData

    const sortedCampaigns = campaigns.sort(({ startDate: a }, { startDate: b }) => {
      return a.getTime() - b.getTime()
    })

    for (let i = 0; i < sortedCampaigns.length; i++) {
      const campaign = sortedCampaigns[i]
      const campaignLengthInDays = getDifferenceInDates(campaign.endDate, campaign.startDate)

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
          const differenceInDays = getDifferenceInDates(entry.value.startDate, previousSliceEndDate)

          if (differenceInDays) {
            formattedLine.push({ offsetY: i, length: differenceInDays })
          }

          formattedLine.push(entry)

          previousSliceEndDate = new Date(entry.value.endDate)
        }
      }

      const lastSliceEndDifferenceInDays = getDifferenceInDates(endDate, previousSliceEndDate)

      if (lastSliceEndDifferenceInDays) {
        formattedLine.push({ offsetY: i, length: lastSliceEndDifferenceInDays })
      }

      result[i] = formattedLine
    }

    return result
  }, [startDate, endDate, promotionData])

  const datesToRender: TableCellProps[] = useMemo(() => {
    const result: TableCellProps[] = []

    if (!startDate) {
      return result
    }

    const { campaigns } = promotionData

    let currentDate = new Date(startDate)

    while (compareDates(currentDate, endDate) !== 1) {
      const dateCampaigns: PromotionCampaign[] = []

      for (const campaign of campaigns) {
        const campaignStartDateComparisonResult = compareDates(campaign.startDate, currentDate) 
        const campaignEndDateComparisonResult = compareDates(campaign.endDate, currentDate) 

        if (campaignStartDateComparisonResult <= 0 && campaignEndDateComparisonResult >= 0) {
          dateCampaigns.push(campaign)
        }
      }

      result.push({
        date: currentDate,
        campaigns: dateCampaigns
      })

      currentDate = new Date(currentDate)
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return result
  }, [startDate, endDate, promotionData])


  return (
    <div>
      <h3>{promotionData.CategoryName}</h3>

      <div style={{ display: 'inline-flex'}}>
      {
        datesToRender.map(({ date, campaigns }, index) => {
          return (
            <span key={index} style={{width: itemWidthPx}} className={cn(styles.cell, campaigns.length && styles.cellMarked)}>{date.getDate()}.{date.getMonth() + 1}</span>
          )
        })
      }
      </div>

      {
        slicesToRender.map((line, sliceIndex) => {
          return (
            <div style={{
              display: 'inline-flex',
            }} key={sliceIndex}>
              {
                line.map(({ length, value }, index) => {
                  return (
                    <span key={index} style={{
                      width: length * itemWidthPx,
                      border: '1px red solid',
                      borderStyle: 'inset'
                    }} className={styles.cell}>{value?.title || length}</span>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}