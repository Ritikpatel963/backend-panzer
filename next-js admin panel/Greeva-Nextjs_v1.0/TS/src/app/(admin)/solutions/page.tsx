import { Metadata } from 'next'
import TablePage from '@/components/panzer/TablePage'
import { MOCK_SOLUTIONS, Solution } from '@/data/panzer/mock'

export const metadata: Metadata = { title: 'Solutions & Services' }

const SolutionsPage = () => {
  return (
    <TablePage<Solution>
      title="Solutions & Services"
      subTitle="Panzer IT"
      rows={MOCK_SOLUTIONS}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category' },
        { key: 'order', label: 'Order' },
        { key: 'status', label: 'Status' },
      ]}
    />
  )
}

export default SolutionsPage

