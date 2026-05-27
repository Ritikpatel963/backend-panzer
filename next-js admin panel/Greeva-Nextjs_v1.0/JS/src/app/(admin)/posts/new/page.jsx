import PageTitle from '@/components/PageTitle';
import PostEditor from '@/components/posts/PostEditor';

export const metadata = { title: 'New Post' };

const NewPostPage = () => {
  return (
    <>
      <PageTitle title="New Post" subTitle="Blog Posts" />
      <PostEditor mode="create" />
    </>
  );
};

export default NewPostPage;

