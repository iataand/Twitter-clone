import React from "react";
import { Form } from "react-bootstrap";

export default function Comment({ user, text, image }) {
  return (
    <div>
      <Form className="border">
        <Form.Group className="d-flex">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"
            class="rounded m-2 text-wrap  text-break"
            style={{ width: 50, height: 50 }}
          ></img>
          <Form.Text
            className=""
            id="postTextRef"
            className="text-wrap  text-break"
            style={{ maxWidth: "465px" }}
          >
            <span>
              <b>{user}</b>
            </span>
            <br></br>
            <span>{text}</span>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
}
