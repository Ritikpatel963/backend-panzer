import EntityListPage from '@/components/crud/EntityListPage';
import { ENDPOINTS } from '@/lib/apiEndpoints';

export const metadata = { title: 'Downloads' };

const DownloadsPage = () => {
  return (
    <EntityListPage
      title="Downloads"
      subTitle="Resources"
      endpoint={`${ENDPOINTS.downloads}?limit=50&sort=-createdAt`}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'slug', label: 'Slug' },
        { key: 'downloadCount', label: 'Downloads', render: (r) => r.downloadCount ?? 0 },
        { key: 'createdAt', label: 'Created', render: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleString() : '-') }
      ]}
    />
  );
};

export default DownloadsPage;

