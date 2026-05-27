import PageTitle from '@/components/PageTitle';
import PostEditor from '@/components/posts/PostEditor';

export const metadata = { title: 'Edit Post' };

const EditPostPage = ({ params }) => {
  return (
    <>
      <PageTitle title="Edit Post" subTitle="Blog Posts" />
      <PostEditor mode="edit" postId={params?.id} />
    </>
  );
};

export default EditPostPage;

