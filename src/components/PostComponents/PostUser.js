import React from "react";
import { Form } from "react-bootstrap";
import "./style.css";

export default function PostText({ user, handleProfileClick }) {
  return (
    <Form.Text
      id="postTextRef"
      className="text-wrap  text-break"
      style={{ maxWidth: "465px" }}
    >
      <div className="PostUserText" onClick={handleProfileClick}>
        <p>
          <b>{user}</b>
        </p>
      </div>
    </Form.Text>
  );
}
