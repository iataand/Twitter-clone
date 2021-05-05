import React, { useRef } from "react";
import { Accordion, Form, Button, FormControl } from "react-bootstrap";
import { BsFillChatSquareFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { useDatabase } from "../contexts/DataBaseContext";
import CommentSection from "./CommentSection";

export default function Post({ text, user, postId }) {
  const comment = useRef();
  const { addCommToPost } = useDatabase();

  return (
    <Accordion defaultActiveKey="0">
      <Form className="border mt-3 ">
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
          <Accordion.Toggle
            as={Button}
            eventKey="1"
            className="btn btn-dark btn-outline-light btn-sm"
          >
            <BsFillChatSquareFill></BsFillChatSquareFill>
          </Accordion.Toggle>

          <button className="btn btn-dark btn-outline-light btn-sm">
            <BsHeart></BsHeart>
          </button>
        </Form.Group>
        <Accordion.Collapse eventKey="1">
          {/* <CommentSection></CommentSection> */}
          <div className="d-flex p-2">
            <FormControl
              className=""
              ref={comment}
              placeholder="Leave a comment"
            />
            <Button
              className="btn btn-dark "
              onClick={(post) => {
                console.log(post);
                addCommToPost(postId, comment.current.value);
                comment.current.value = "";
              }}
            >
              Reply
            </Button>
          </div>
        </Accordion.Collapse>
      </Form>
    </Accordion>
  );
}
