import EntityListPage from '@/components/crud/EntityListPage';
import { ENDPOINTS } from '@/lib/apiEndpoints';

export const metadata = { title: 'Media Library' };

const MediaPage = () => {
  return (
    <EntityListPage
      title="Media Library"
      subTitle="Uploads"
      endpoint={`${ENDPOINTS.media}?limit=50&sort=-createdAt`}
      columns={[
        { key: 'filename', label: 'File', render: (r) => r.filename || r.originalName || r.name || '-' },
        { key: 'type', label: 'Type', render: (r) => r.mimeType || r.type || '-' },
        { key: 'size', label: 'Size', render: (r) => (r.size ? `${Math.round(r.size / 1024)} KB` : '-') },
        { key: 'createdAt', label: 'Created', render: (r) => (r.createdAt ? new Date(r.createdAt).toLocaleString() : '-') }
      ]}
    />
  );
};

export default MediaPage;

