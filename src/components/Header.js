import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DataBaseContext";

export default function Header() {
  const { currentUser } = useAuth();
  const postTextRef = useRef();
  const { post } = useDatabase();

  function handlePost(e) {
    e.preventDefault();

    try {
      post({ user: currentUser.email, text: postTextRef.current.value });
    } catch {
      console.log("post failed");
    }
  }

  return (
    <Container className="d-flex align-items-center justify-content-center ">
      <div className="w-100 border p-2" style={{ maxWidth: "500px" }}>
        <Form onSubmit={handlePost}>
          <Form.Group id="postTextRef">
            <Form.Control
              plaintext
              type="text"
              ref={postTextRef}
              placeholder="What's happening?"
            />
          </Form.Group>

          <Button className="w-30 float-right" type="submit">
            post
          </Button>
        </Form>
      </div>
    </Container>
  );
}
