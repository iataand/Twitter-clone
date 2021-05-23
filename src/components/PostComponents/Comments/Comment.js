import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useDatabase } from "../../../contexts/DataBaseContext";
import { useStorage } from "../../../contexts/StorageContext";
import CommentImage from "./CommentImage";
import CommentText from "./CommentText";

export default function Comment({
  currentUser,
  user,
  text,
  commentId,
  postId,
}) {
  const [profilePicture, setProfilePicture] = useState();
  const { getProfilePicture } = useStorage();
  const { removeComment } = useDatabase();

  useEffect(() => {
    getProfilePicture(user).then((res) => setProfilePicture(res));
  }, [getProfilePicture, user]);

  const handleDeleteCommentClick = () => {
    removeComment(commentId, postId);
  };

  return (
    <div>
      <Form className="border">
        <Form.Group className="d-flex">
          <CommentImage profilePicture={profilePicture}></CommentImage>

          <Form.Text
            id="postTextRef"
            className="text-wrap  text-break"
            style={{ maxWidth: "465px" }}
          >
            <CommentText
              user={user}
              text={text}
              currentUser={currentUser.email}
              handleDeleteCommentClick={handleDeleteCommentClick}
            ></CommentText>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
}
