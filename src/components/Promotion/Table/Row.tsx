import { useMemo } from "react"
import Promotion, { PromotionCampaign } from "../../../interfaces/Promotion"
import styles from './table.module.css'
import { tableItemLengthPx } from "../../../constants/ui"
import { getPromotionDataSlices } from "../../../utils/data"

interface TableRowProps {
  promotionData: Promotion,
  startDate: Date,
  endDate: Date
}

export default function TableRow({ 
  promotionData,
  startDate,
  endDate
}: TableRowProps) {
  const slicesToRender = useMemo(
    () => getPromotionDataSlices(promotionData, startDate, endDate), 
    [startDate, endDate, promotionData]
  )

  return (
    <div className={styles.row}>
      <div className={styles.tableRowHeader}>
        <h4>{promotionData.CategoryName}</h4>
      </div>

      <div className={styles.rowContent}>
      {
        slicesToRender.map((line, sliceIndex) => {
          return (
            <div className={styles.dataSlice} key={sliceIndex}>
              {
                line.map(({ length, value }, index) => {
                  const additionalStyles: React.CSSProperties = {
                    width: length  * tableItemLengthPx,
                    backgroundColor: value ? promotionData.color : 'inherit',
                  }

                  return (
                    <div key={index} style={additionalStyles} className={styles.cell}>{value?.title}</div>
                  )
                })
              }
            </div>
          )
        })
      }
      </div>
    </div>
  )
}