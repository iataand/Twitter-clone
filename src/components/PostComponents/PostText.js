import React from "react";
import { Form } from "react-bootstrap";
import "./PostStyle.css";

export default function PostText({ text }) {
  return (
    <Form.Text id="postTextRef" className="PostText text-wrap  text-break">
      <p className="PostText">{text}</p>
    </Form.Text>
  );
}
