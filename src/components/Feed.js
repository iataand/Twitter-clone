import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import DatabaseProvider, { useDatabase } from "../contexts/DataBaseContext";
import "firebase/database";

export default function Feed() {
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const { post } = useDatabase();
  const postTextRef = useRef();

  if (currentUser) console.log(currentUser.email);

  function handlePost(e) {
    e.preventDefault();

    try {
      post({ user: currentUser.email, text: postTextRef.current.value });
    } catch {
      console.log("post failed");
    }
  }

  return (
    <AuthProvider>
      <DatabaseProvider>
        <Form onSubmit={handlePost}>
          <Form.Group id="postTextRef">
            <Form.Label>What's Happening?</Form.Label>
            <Form.Control type="text" ref={postTextRef} />
          </Form.Group>

          <Button className="w-100" type="submit">
            post
          </Button>
        </Form>
        <button onClick={logout}>Log out</button>
      </DatabaseProvider>
    </AuthProvider>
  );
}
