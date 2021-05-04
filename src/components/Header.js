import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
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
    // <div className="w- 100 border" style={{ maxWidth: "560px" }}>
    <Form onSubmit={handlePost}>
      <Form.Group id="postTextRef">
        <div className="d-flex">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"
            class="rounded m-2"
            style={{ width: 50, height: 50 }}
          ></img>
          <Form.Control
            plaintext
            type="text"
            ref={postTextRef}
            placeholder=" What's happening?"
          />
        </div>
        <hr />
        <Button className="d-flex justify-content-end" type="submit">
          Post
        </Button>
      </Form.Group>
    </Form>
  );
}
