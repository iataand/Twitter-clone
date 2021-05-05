import React, { useEffect, useState } from "react";
import Header from "./Header";
import Post from "./Post";
import { Container } from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import DatabaseProvider, { useDatabase } from "../contexts/DataBaseContext";

export default function Feed() {
  const { postsRef } = useDatabase();
  const [posts, setPosts] = useState();

  useEffect(() => {
    postsRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setPosts(Object.entries(data));
    });
  }, []);

  return (
    <>
      <AuthProvider>
        <DatabaseProvider>
          <Container className="w-100 border p-2" style={{ maxWidth: "560px" }}>
            <Header></Header>

            {posts &&
              posts.map((post) => {
                return <Post text={post[1].text} user={post[1].user}></Post>;
              })}
          </Container>
        </DatabaseProvider>
      </AuthProvider>
    </>
  );
}
