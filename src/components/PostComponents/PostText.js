import React from "react";
import { Form } from "react-bootstrap";
import "./style.css";

export default function PostText({ text }) {
  return (
    <Form.Text
      id="postTextRef"
      className="text-wrap  text-break"
      style={{ maxWidth: "465px" }}
    >
      <p className="PostText">{text}</p>
    </Form.Text>
  );
}