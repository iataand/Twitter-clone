import { useState, useEffect } from "react";
import { Accordion, Form, Button, Modal } from "react-bootstrap";
import { BsFillChatSquareFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import { useDatabase } from "../../contexts/DataBaseContext";
import { useHistory } from "react-router-dom";
import CommentSection from "./CommentSection";

export default function Post({ text, user, postId }) {
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const [usersLiked, setUsersLiked] = useState([]);
  const [show, showModal] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState();
  const { currentUser } = useAuth();
  const {
    addLike,
    addLikeToPost,
    getLikes,
    getLikesRef,
    incrementLikes,
    decrementLikes,
    removeLike,
  } = useDatabase();

  const handleClose = () => showModal(false);
  const handleShow = () => showModal(true);

  useEffect(() => {
    const ref = getLikesRef(postId);

    ref.on("value", (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        setUsersLiked(Object.values(data));
        if (Object.values(data).length > 0 && currentUser) {
          Object.values(data).indexOf(currentUser.email) > -1
            ? setIsPostLiked(true)
            : setIsPostLiked(false);
        }
      }
    });

    setLoading(true);
  }, []);

  const handleLike = (e) => {
    e.preventDefault();
    getLikes(postId)
      .then((res) => {
        if (res && Object.values(res).indexOf(currentUser.email) > -1) {
          removeLike(postId, currentUser.email);
          setIsPostLiked(false);
          decrementLikes(postId);
          usersLiked.splice(usersLiked.indexOf(currentUser.email), 1);
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

  const handleProfileClick = () => {
    history.push({ pathname: "/profile", state: { user: user } });
  };

  return (
    <>
      {isLoading ? (
        <Accordion defaultActiveKey="0">
          <Form className="border mt-3 ">
            <Form.Group className="d-flex">
              <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"
                class="rounded m-2"
                style={{ width: 50, height: 50 }}
                onClick={handleProfileClick}
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
                {isPostLiked ? (
                  <BsHeartFill></BsHeartFill>
                ) : (
                  <BsHeart></BsHeart>
                )}
              </button>
            </Form.Group>
            <p
              variant="primary"
              onClick={handleShow}
              className="d-flex justify-content-center"
            >
              {usersLiked.length > 0 ? (
                usersLiked.length == 1 ? (
                  <>{usersLiked.length} like </>
                ) : (
                  <>{usersLiked.length} likes </>
                )
              ) : (
                ""
              )}
            </p>
            <Accordion.Collapse eventKey="1">
              <div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Likes</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {usersLiked &&
                      usersLiked.map((user) => {
                        return <p>{user}</p>;
                      })}
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>
                <CommentSection postId={postId}></CommentSection>
              </div>
            </Accordion.Collapse>
          </Form>
        </Accordion>
      ) : (
        "..."
      )}
    </>
  );
}
