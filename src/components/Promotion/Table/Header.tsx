import { useMemo } from "react"
import cn from "classnames"
import styles from "./table.module.css"
import { tableItemLengthPx } from "../../../constants/ui"
import { getDateRangeData } from "../../../utils/data"

interface TableHeaderProps {
  title: string,
  startDate: Date,
  endDate: Date,
}

export default function TableHeader({
  title,
  startDate,
  endDate
}: TableHeaderProps) {
  const dataToRender = useMemo(
    () => getDateRangeData(startDate, endDate), 
    [startDate, endDate]
  )

  return (
    <div className={cn(styles.row, styles.headerRow)}>
      <div className={styles.tableRowHeader}>
        <h4>{title}</h4>
      </div>

      <div className={styles.rowContent}>
        <div className={styles.dataSlice}>
          {
            dataToRender.months.map(({ name, length }, index) => {
              return (
                <div 
                  key={index}
                  style={{ width: length * tableItemLengthPx }}
                  className={styles.cell}
                >
                  <a>{name}</a>
                </div>
              )
            })
          }
        </div>  

        <div className={styles.dataSlice}>
          {
            dataToRender.dates.map((date, index) => {
              return (
                <div 
                  key={index}
                  style={{ width: tableItemLengthPx }}
                  className={styles.cell}
                >
                  <a>{date}</a>
                </div>
              )
            })
          }
        </div> 
      </div>
    </div>
  )
}