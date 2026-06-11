import { Metadata } from 'next'
import TablePage from '@/components/panzer/TablePage'
import { MOCK_POSTS, Post } from '@/data/panzer/mock'

export const metadata: Metadata = { title: 'Blog Posts' }

const PostsPage = () => {
  return (
    <TablePage<Post>
      title="Blog Posts"
      subTitle="Panzer IT"
      rows={MOCK_POSTS}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'status', label: 'Status' },
        { key: 'slug', label: 'Slug' },
        {
          key: 'publishedAt',
          label: 'Published',
          format: 'dateTime',
        },
      ]}
    />
  )
}

export default PostsPage
