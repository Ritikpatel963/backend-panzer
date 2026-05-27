import EntityListPage from '@/components/crud/EntityListPage';
import { ENDPOINTS } from '@/lib/apiEndpoints';

export const metadata = { title: 'Admin Users' };

const UsersPage = () => {
  return (
    <EntityListPage
      title="Admin Users"
      subTitle="Access Control"
      endpoint={`${ENDPOINTS.users}?limit=100&sort=-createdAt`}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role', render: (r) => r.role || '-' },
        { key: 'active', label: 'Active', render: (r) => (r.active === false ? 'No' : 'Yes') }
      ]}
    />
  );
};

export default UsersPage;

