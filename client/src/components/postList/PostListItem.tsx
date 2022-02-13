const PostListItem = ({ post }: any) => {
  return (
    <>
      <div>{post.id}</div>
      <div>{post.title}</div>
      <div>{post.contents}</div>
      <div>{post.price}</div>
      <div>{post.image_src}</div>
    </>
  );
};

export default PostListItem;
