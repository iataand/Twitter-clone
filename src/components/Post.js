import React from "react";
import { Form } from "react-bootstrap";
import { BsFillChatSquareFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";

export default function Post({ text, user }) {
  return (
    // <div className="w-100 border p-2 m-2" style={{ maxWidth: "560px" }}>
    <Form className="border m-1">
      <Form.Group className="d-flex">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"
          class="rounded m-2"
          style={{ width: 50, height: 50 }}
        ></img>
        <Form.Text
          className=""
          id="postTextRef"
          className="text-wrap  text-break"
          style={{ maxWidth: "465px" }}
        >
          <p>{text}</p>
        </Form.Text>
        <hr />
      </Form.Group>

      <Form.Group className="d-flex justify-content-around">
        <BsFillChatSquareFill></BsFillChatSquareFill>
        <BsHeart></BsHeart>
      </Form.Group>
    </Form>
    // </div>
  );
}
