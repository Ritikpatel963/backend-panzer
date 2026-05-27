import EntityListPage from '@/components/crud/EntityListPage';
import { ENDPOINTS } from '@/lib/apiEndpoints';

export const metadata = { title: 'Blog Posts' };

const PostsPage = () => {
  return (
    <EntityListPage
      title="Blog Posts"
      subTitle="Content"
      endpoint={`${ENDPOINTS.posts}?limit=50&sort=-createdAt`}
      actions={{
        primary: { label: 'New Post', href: '/posts/new' },
        row: [{ label: 'Edit', href: (r) => `/posts/${r._id || r.id}/edit` }]
      }}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'status', label: 'Status', render: (r) => r.status || 'draft' },
        { key: 'slug', label: 'Slug' },
        { key: 'publishedAt', label: 'Published', render: (r) => (r.publishedAt ? new Date(r.publishedAt).toLocaleString() : '-') }
      ]}
    />
  );
};

export default PostsPage;

