import React, { useEffect, useState } from "react";
import PostSection from "./PostSection";
import Post from "../PostComponents/Post";
import { Container } from "react-bootstrap";
import { useDatabase } from "../../contexts/DataBaseContext";

export default function Feed() {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState();
  const { dbRef } = useDatabase();

  useEffect(() => {
    dbRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        setPosts(Object.entries(data).reverse());
      } else setPosts([]);
    });

    setLoading(true);
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Container className="p-1" style={{ maxWidth: "640px" }}>
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
                    ></Post>
                  </>
                );
              })}
          </Container>
        </>
      ) : (
        "..."
      )}
    </>
  );
}
