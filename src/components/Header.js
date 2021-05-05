import { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DataBaseContext";

export default function Header() {
  const { currentUser } = useAuth();
  const { addPostToDatabase } = useDatabase();
  const postTextRef = useRef();

  const post = {
    user: "",
    text: "",
    likes: 0,
    likedBy: [],
  };

  function handlePost(e) {
    e.preventDefault();

    post.user = currentUser.email;
    post.text = postTextRef.current.value;

    try {
      addPostToDatabase(post);
    } catch {
      console.log("post failed");
    }
  }

  return (
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
        <Button
          className="d-flex justify-content-end btn btn-dark"
          type="submit"
        >
          Post
        </Button>
      </Form.Group>
    </Form>
  );
}
