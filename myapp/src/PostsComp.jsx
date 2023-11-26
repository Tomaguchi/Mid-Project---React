import { useState, useEffect } from "react";
import { getUserPosts } from "./utils";
import PostComp from "./PostComp";

const PostsComp = ({ userId }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [togglePosts, setTogglePosts] = useState(true);
  const [toggleAddPost, setToggleAddPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await getUserPosts(userId);
      setUserPosts(data);
    };
    getPosts();
  }, []);

  const addPostInput = () => {
    setTogglePosts(false);
    setToggleAddPost(true);
  };

  const addPost = () => {
    let postId = userPosts[userPosts.length - 1].id;
    const newPost = { id: postId + 1, title: newPostTitle, body: newPostBody };
    setUserPosts([...userPosts, newPost]);
    setTogglePosts(true);
    setToggleAddPost(false);
  };

  const cancelAction = () => {
    setTogglePosts(true);
    setToggleAddPost(false);
  };

  return (
    <div className="postsChild">
      Posts - User {userId}
      <button onClick={addPostInput}>Add</button>
      {togglePosts && (
        <>
          {userPosts.map((post) => {
            return <PostComp key={post.id} post={post} />;
          })}
        </>
      )}
      {toggleAddPost && (
        <>
          <br />
          <br />
          Title: <input type="text" onChange={(e) => setNewPostTitle(e.target.value)} />
          <br />
          <br />
          Body: <input type="text" onChange={(e) => setNewPostBody(e.target.value)} />
          <br />
          <button onClick={cancelAction}>Cencel</button>
          <button onClick={addPost}>Add</button>
        </>
      )}
    </div>
  );
};

export default PostsComp;
