import React, { useEffect, useState, lazy, Suspense } from "react";
import Spinner from "../Spinner";
import { Container } from "react-bootstrap";
import { useDatabase } from "../../contexts/DataBaseContext";
const PostSection = lazy(() => import("./CreatePostSection/PostSection"));
const Post = lazy(() => import("../PostComponents/Post"));

export default function Feed() {
  const [posts, setPosts] = useState();
  const { dbRef } = useDatabase();

  useEffect(() => {
    dbRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        setPosts(Object.entries(data).reverse());
      } else setPosts([]);
    });
  }, []);

  return (
    <Container className="p-1" style={{ maxWidth: "640px" }}>
      <Suspense fallback={<Spinner className="container"></Spinner>}>
        <PostSection className="border"></PostSection>
        {posts &&
          posts.map((post, index) => {
            return (
              <>
                <Post
                  key={post[0] + index}
                  postId={post[0]}
                  text={post[1].text}
                  user={post[1].user}
                  hasImage={post[1].hasImage}
                ></Post>
              </>
            );
          })}
      </Suspense>
    </Container>
  );
}
