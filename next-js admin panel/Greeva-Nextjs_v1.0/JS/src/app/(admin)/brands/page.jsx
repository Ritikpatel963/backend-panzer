import EntityListPage from '@/components/crud/EntityListPage';
import { ENDPOINTS } from '@/lib/apiEndpoints';

export const metadata = { title: 'Brands & Partners' };

const BrandsPage = () => {
  return (
    <EntityListPage
      title="Brands & Partners"
      subTitle="Vendors"
      endpoint={`${ENDPOINTS.brands}?limit=100&sort=-createdAt`}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'website', label: 'Website' },
        { key: 'featured', label: 'Featured', render: (r) => (r.featured ? 'Yes' : 'No') },
        { key: 'createdAt', label: 'Created', render: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleDateString() : '-') }
      ]}
    />
  );
};

export default BrandsPage;

