const PostComp = ({ post }) => {
  return (
    <div className="postComp">
      Title: {post.title} <br />
      <br />
      Body: {post.body}
    </div>
  );
};

export default PostComp;
