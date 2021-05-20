import React from "react";
import { Form } from "react-bootstrap";
import "./style.css";

export default function PostText({ user, text, handleProfileClick }) {
  return (
    <Form.Text
      id="postTextRef"
      className="text-wrap  text-break"
      style={{ maxWidth: "465px" }}
    >
      <div className="PostUserText" onClick={handleProfileClick}>
        <p style={{ cursor: "pointer" }}>
          <b>{user}</b>
        </p>
      </div>
      <span>{text}</span>
    </Form.Text>
  );
}
