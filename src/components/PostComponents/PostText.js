import React from "react";
import { Form } from "react-bootstrap";
import "./style.css";

export default function PostText({ user, text, handleProfileClick }) {
  return (
    <Form.Text
      id="postTextRef"
      className="text-wrap  text-break"
      style={{ maxWidth: "465px" }}
      onClick={handleProfileClick}
    >
      <div className="PostUserText">
        <p style={{ cursor: "pointer" }}>
          <b>{user}</b>
        </p>
      </div>
      <p>{text}</p>
    </Form.Text>
  );
}
