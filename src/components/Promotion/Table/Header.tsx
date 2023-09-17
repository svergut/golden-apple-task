import { useMemo } from "react"
import { PromotionCampaign } from "../../../interfaces/Promotion"
import { compareDates } from "../../../utils/date"
import styles from "./table.module.css"

interface TableHeaderProps {
  title: string,
  startDate: Date,
  endDate: Date,
}

interface TableHeaderCellProps {
  value: string
}

export default function TableHeader({
  title,
  startDate,
  endDate
}: TableHeaderProps) {
  const datesToRender: TableHeaderCellProps[] = useMemo(() => {
    const result: TableHeaderCellProps[] = []

    if (!startDate) {
      return result
    }

    let currentDate = new Date(startDate)

    while (compareDates(currentDate, endDate) !== 1) {
      result.push({
        value: currentDate.getDate().toString(),
      })

      currentDate = new Date(currentDate)
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return result
  }, [startDate, endDate])

  return (
    <div className={styles.row}>
      <div className={styles.tableRowHeader}>
        <h4>{title}</h4>
      </div>
      

      {
        datesToRender.map(({ value }) => {
          return (
            <span style={{
              minWidth: 40,
              textAlign: 'center',
            }}>
              <a>{value}</a>
            </span>
          )
        })
      }
    </div>
  )
}