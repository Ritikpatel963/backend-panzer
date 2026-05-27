import EntityListPage from '@/components/crud/EntityListPage';
import { ENDPOINTS } from '@/lib/apiEndpoints';

export const metadata = { title: 'Solutions & Services' };

const SolutionsPage = () => {
  return (
    <EntityListPage
      title="Solutions & Services"
      subTitle="Offerings"
      endpoint={`${ENDPOINTS.solutions}?limit=50&sort=order`}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'category', label: 'Category', render: (r) => r.category?.name || r.category || '-' },
        { key: 'order', label: 'Order', render: (r) => r.order ?? '-' },
        { key: 'status', label: 'Status', render: (r) => r.status || '-' }
      ]}
    />
  );
};

export default SolutionsPage;

