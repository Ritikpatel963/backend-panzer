import EntityListPage from '@/components/crud/EntityListPage';
import { ENDPOINTS } from '@/lib/apiEndpoints';

export const metadata = { title: 'Leads' };

const LeadsPage = () => {
  return (
    <EntityListPage
      title="Leads"
      subTitle="Lead Management"
      endpoint={`${ENDPOINTS.leads}?limit=50&sort=-createdAt`}
      actions={{
        row: [{ label: 'View', href: (r) => `/leads/${r._id || r.id}`, variant: 'outline-primary' }]
      }}
      columns={[
        { key: 'name', label: 'Name', render: (r) => r.name || r.fullName || '-' },
        { key: 'email', label: 'Email' },
        { key: 'status', label: 'Status', render: (r) => r.status || 'new' },
        {
          key: 'createdAt',
          label: 'Created',
          render: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleString() : '-')
        }
      ]}
    />
  );
};

export default LeadsPage;

