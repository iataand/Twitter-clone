import { useState, useEffect } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import { BsFillChatSquareFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import { useDatabase } from "../../contexts/DataBaseContext";
import CommentSection from "./CommentSection";

export default function Post({ text, user, postId }) {
  const [usersLiked, setUsersLiked] = useState();
  const [isPostLiked, setIsPostLiked] = useState();
  const { currentUser } = useAuth();
  const {
    addLike,
    addLikeToPost,
    getLikes,
    getLikesRef,
    incrementLikes,
    removeLike,
  } = useDatabase();

  useEffect(() => {
    const ref = getLikesRef(postId);

    ref.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        setUsersLiked(Object.values(data));
        if (usersLiked)
          usersLiked.indexOf(currentUser.email) > -1
            ? setIsPostLiked(true)
            : setIsPostLiked(false);
      }
    });
  }, []);

  const handleLike = (e) => {
    e.preventDefault();
    getLikes(postId)
      .then((res) => {
        if (res && Object.values(res).indexOf(currentUser.email) > -1) {
          removeLike(postId, currentUser.email);
          setIsPostLiked(false);
        } else {
          addLike(postId, currentUser.email);
          addLikeToPost(postId, currentUser.email);
          incrementLikes(postId);
          setIsPostLiked(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
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

            <button
              className="btn btn-dark btn-outline-light btn-sm"
              type="submit"
              onClick={handleLike}
            >
              {isPostLiked ? <BsHeartFill></BsHeartFill> : <BsHeart></BsHeart>}
            </button>
          </Form.Group>
          <Accordion.Collapse eventKey="1">
            <div className="">
              <CommentSection postId={postId}></CommentSection>
            </div>
          </Accordion.Collapse>
        </Form>
      </Accordion>
    </>
  );
}
