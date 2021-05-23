import React from "react";
import { Form } from "react-bootstrap";
import "./PostStyle.css";

export default function PostText({ user, handleProfileClick }) {
  return (
    <Form.Text id="postTextRef" className="PostUser text-wrap  text-break">
      <div className="PostUserText" onClick={handleProfileClick}>
        <p>
          <b>{user}</b>
        </p>
      </div>
    </Form.Text>
  );
}
