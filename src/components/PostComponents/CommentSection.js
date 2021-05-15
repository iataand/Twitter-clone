import Comment from "./Comment.js";
import { useRef, useState, useEffect } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useDatabase } from "../../contexts/DataBaseContext";
import { useAuth } from "../../contexts/AuthContext";

export default function CommentSection({ postId }) {
  const comment = useRef();
  const [comments, setComments] = useState();
  const { addCommToPost, getCommsRef } = useDatabase();
  const { currentUser } = useAuth();

  useEffect(() => {
    const ref = getCommsRef(postId);

    ref.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        if (data.comments) setComments(Object.entries(data.comments));
      }
    });
  }, []);

  const postComment = () => {
    addCommToPost(postId, comment.current.value, currentUser.email);
    comment.current.value = "";
  };

  return (
    <div>
      <div className="d-flex p-2">
        <FormControl className="" ref={comment} placeholder="Leave a comment" />
        <Button className="btn btn-dark " onClick={() => postComment()}>
          Reply
        </Button>
      </div>

      <div>
        {comments &&
          comments.map((comm) => {
            return (
              <Comment
                key={comm[0]}
                user={comm[1].user}
                text={comm[1].text}
              ></Comment>
            );
          })}
      </div>
    </div>
  );
}
