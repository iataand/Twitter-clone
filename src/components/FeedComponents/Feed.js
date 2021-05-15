import React, { useEffect, useState } from "react";
import Header from "./Header";
import Post from "../PostComponents/Post";
import { Container } from "react-bootstrap";
import { useDatabase } from "../../contexts/DataBaseContext";

export default function Feed() {
  const [isLoading, setLoading] = useState(false);
  const { dbRef } = useDatabase();
  const [posts, setPosts] = useState();

  useEffect(() => {
    dbRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        setPosts(Object.entries(data));
      }
    });

    setLoading(true);
  }, []);

  return (
    <>
      {isLoading ? (
        <Container className="border p-1" style={{ maxWidth: "640px" }}>
          <Header></Header>
          {posts &&
            posts.map((post) => {
              return (
                <Post
                  key={post[0]}
                  postId={post[0]}
                  text={post[1].text}
                  user={post[1].user}
                ></Post>
              );
            })}
        </Container>
      ) : (
        "..."
      )}
    </>
  );
}
