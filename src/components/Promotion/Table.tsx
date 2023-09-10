import Promotion from "../../interfaces/Promotion"
import TableRow from "./TableRow"

interface PromotionTableProps {
  data: Promotion[]
}

const startDate = new Date('2023-01-01')
const endDate = new Date('2023-04-25')

export default function PromotionTable({ data }: PromotionTableProps) {
  return (
    <div>
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