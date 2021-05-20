import { useRef, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { RiImageAddFill } from "react-icons/ri";
import { useAuth } from "../../contexts/AuthContext";
import { useDatabase } from "../../contexts/DataBaseContext";
import { useStorage } from "../../contexts/StorageContext";
import { defaultImage } from "../../constants";

export default function Header() {
  const [profilePicture, setProfilePicture] = useState();
  const { currentUser } = useAuth();
  const { addPostToDatabase } = useDatabase();
  const { getProfilePicture } = useStorage();
  const postTextRef = useRef();

  const post = {
    user: "",
    text: "",
    likes: 0,
    likedBy: [],
    comments: {},
  };

  const handlePost = (e) => {
    e.preventDefault();

    post.user = currentUser.email;
    post.text = postTextRef.current.value;

    try {
      addPostToDatabase(post);
      postTextRef.current.value = "";
    } catch {
      console.log("post failed");
    }
  };

  useEffect(() => {
    if (currentUser)
      getProfilePicture(currentUser.email).then((res) =>
        setProfilePicture(res)
      );
  }, [currentUser]);

  return (
    <form onSubmit={handlePost} className="border">
      <Form.Group id="postTextRef">
        <div className="d-flex ">
          <img
            src={profilePicture ? profilePicture : defaultImage}
            className="rounded m-2"
            style={{ width: 50, height: 50 }}
          ></img>
          <Form.Control
            plaintext
            type="text"
            ref={postTextRef}
            placeholder=" What's happening?"
            required
            className="p-2"
          />
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <div className="d-flex ml-3">
            <RiImageAddFill className="mt-1"></RiImageAddFill>
            <p className="ml-1">Attach image</p>
          </div>
          <button className="btn btn-dark mr-1" type="submit">
            Post
          </button>
        </div>
      </Form.Group>
    </form>
  );
}
