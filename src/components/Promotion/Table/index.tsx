import Promotion from '../../../interfaces/Promotion'
import TableHeader from './Header'
import TableRow from './Row'
import styles from './table.module.css'

interface PromotionTableProps {
  data: Promotion[]
}

const startDate = new Date('2023-01-01')
const endDate = new Date('2023-04-25')

export default function PromotionTable({
  data
}: PromotionTableProps) {
  return (
    <div className={styles.table}>
      <TableHeader 
        title='Вид акции'
        startDate={startDate}
        endDate={endDate}
      />

      {
        data.map((promotionData) => {
          return (
            <TableRow 
              promotionData={promotionData} 
              startDate={startDate}
              endDate={endDate}
            />
          ) 
        })
      }
    </div>
  )
}