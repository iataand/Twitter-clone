import React from "react";
import { Form, Button } from "react-bootstrap";
import { BsFillChatSquareFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";

export default function Post({ text, user }) {
  return (
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
          <p>
            <b>{user}</b>
          </p>
          <p>{text}</p>
        </Form.Text>
        <hr />
      </Form.Group>
      <hr></hr>
      <Form.Group className="d-flex justify-content-around">
        <button className="btn btn-dark btn-outline-light btn-sm">
          <BsFillChatSquareFill></BsFillChatSquareFill>
        </button>

        <button className="btn btn-dark btn-outline-light btn-sm">
          <BsHeart></BsHeart>
        </button>
      </Form.Group>
    </Form>
  );
}
