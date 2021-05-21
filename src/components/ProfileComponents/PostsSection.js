import React from "react";
import Post from "../PostComponents/Post.js";

export default function PostsSection({ userPosts, profilePicture }) {
  return (
    <div className="mb-3">
      {userPosts &&
        userPosts.map((post) => {
          return (
            <Post
              key={post[0]}
              postId={post[0]}
              text={post[1].text}
              user={post[1].user}
              preloadedProfilePicture={profilePicture}
              hasImage={post[1].hasImage}
            >
              {post.text}
            </Post>
          );
        })}
    </div>
  );
}
