import React, { useEffect, useState, lazy, Suspense } from "react";
import Spinner from "../Spinner/Spinner";
import { Container } from "react-bootstrap";
import { useDatabase } from "../../contexts/DataBaseContext";
import { useStorage } from "../../contexts/StorageContext";
import "./feedStyle.css";
import { useAuth } from "../../contexts/AuthContext";
const PostSection = lazy(() => import("./CreatePostSection/PostSection"));
const Post = lazy(() => import("../PostComponents/Post"));

export default function Feed() {
  const [posts, setPosts] = useState();
  const { dbRef } = useDatabase();
  const { currentUser } = useAuth();
  const { currentUserProfilePicture } = useStorage();

  useEffect(() => {
    dbRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        setPosts(Object.entries(data).reverse());
      } else {
        setPosts([]);
      }
    });
  }, [dbRef]);

  return (
    <Container className="FeedWrapper p-1" style={{ maxWidth: "640px" }}>
      <Suspense fallback={<Spinner className="container"></Spinner>}>
        <PostSection className="border"></PostSection>
        {posts &&
          posts.map((post) => {
            return (
              <Post
                key={post[0]}
                postId={post[0]}
                text={post[1].text}
                user={post[1].user}
                hasImage={post[1].hasImage}
                image={post[1].image}
                imageName={post[1].imageName}
                preloadedProfilePicture={
                  currentUser.email === post[1].user
                    ? currentUserProfilePicture
                    : null
                }
              ></Post>
            );
          })}
      </Suspense>
    </Container>
  );
}
