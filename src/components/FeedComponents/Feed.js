import React, { useEffect, useState } from "react";
import PostSection from "./PostSection";
import Post from "../PostComponents/Post";
import { Container } from "react-bootstrap";
import { useDatabase } from "../../contexts/DataBaseContext";
import { useAuth } from "../../contexts/AuthContext";

export default function Feed() {
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState();
  const { dbRef } = useDatabase();
  const { currentUser } = useAuth;

  useEffect(() => {
    dbRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        setPosts(Object.entries(data).reverse());
      }
    });

    setLoading(true);
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Container className="p-1" style={{ maxWidth: "640px" }}>
            {currentUser ? (
              <PostSection className="border"></PostSection>
            ) : null}
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
