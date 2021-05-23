import React, { lazy, Suspense } from "react";
import Spinner from "../Spinner/Spinner";
const Post = lazy(() => import("../PostComponents/Post"));

export default function PostsSection({ userPosts, profilePicture }) {
  return (
    <Suspense fallback={<Spinner className="container"></Spinner>}>
      <div className="mb-3">
        {userPosts &&
          profilePicture &&
          userPosts.map((post) => {
            return (
              <Post
                key={post[0]}
                postId={post[0]}
                text={post[1].text}
                user={post[1].user}
                hasImage={post[1].hasImage}
                image={post[1].image}
                imageName={post[1].imageName}
                preloadedProfilePicture={profilePicture}
              >
                {post.text}
              </Post>
            );
          })}
      </div>
    </Suspense>
  );
}
