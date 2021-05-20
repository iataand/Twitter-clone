import React from "react";
import DeleteCommentButton from "./DeleteCommentButton";

export default function CommentText({
  user,
  text,
  currentUser,
  handleDeleteCommentClick,
}) {
  return (
    <>
      <span>
        <b>{user}</b>
      </span>
      {currentUser === user ? (
        <span className="DeleteButton" onClick={handleDeleteCommentClick}>
          <DeleteCommentButton></DeleteCommentButton>
        </span>
      ) : null}
      <br></br>
      <span>{text}</span>
    </>
  );
}
