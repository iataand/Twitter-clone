import { useState, useEffect } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import { BsFillChatSquareFill } from "react-icons/bs";
import { useAuth } from "../../contexts/AuthContext";
import { useDatabase } from "../../contexts/DataBaseContext";
import { useHistory } from "react-router-dom";
import { useStorage } from "../../contexts/StorageContext";
import CommentSection from "./Comments/CommentSection";
import PostImage from "./PostImage";
import PostProfilePicture from "./PostProfilePicture";
import LikeButton from "./Likes/LikeButton";
import UsersLiked from "./Likes/UsersLiked";
import PostText from "./PostText";
import LikesModal from "./Likes/LikesModal";
import "./style.css";
import DelePostButton from "./DelePostButton";

export default function Post({ text, user, postId, hasImage }) {
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const [usersLiked, setUsersLiked] = useState([]);
  const [show, showModal] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [postImage, setPostImage] = useState();
  const { currentUser } = useAuth();
  const { getProfilePicture, getPostImage } = useStorage();
  const {
    addLikeToPost,
    getLikes,
    getLikesRef,
    incrementLikes,
    decrementLikes,
    removeLike,
    removePost,
  } = useDatabase();

  const handleClose = () => showModal(false);
  const handleShow = () => showModal(true);

  useEffect(() => {
    const ref = getLikesRef(postId);

    if (hasImage) {
      getPostImage(postId).then((res) => {
        setPostImage(res);
        setLoading(true);
      });
    }

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

    getProfilePicture(user).then((res) => {
      setProfilePicture(res);
    });
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
    history.push({
      pathname: "/profile",
      state: { user: user, currentUser: currentUser.email },
    });
  };

  const handleDeletePostClick = () => {
    removePost(postId);
  };

  return (
    <>
      {isLoading ? (
        <Accordion defaultActiveKey="0">
          <div className="border mt-3 ">
            <Form.Group className="d-flex">
              <PostProfilePicture
                profilePicture={profilePicture}
                handleProfileClick={handleProfileClick}
              ></PostProfilePicture>

              <PostText
                user={user}
                text={text}
                handleProfileClick={handleProfileClick}
              ></PostText>

              <DelePostButton
                handleDeletePostClick={handleDeletePostClick}
                currentUser={currentUser ? currentUser.email : null}
                user={user}
              ></DelePostButton>

              <hr />
            </Form.Group>
            {postImage && <PostImage postImage={postImage}></PostImage>}

            <hr></hr>

            <Form.Group>
              <div className="Buttons d-flex justify-content-around">
                <Accordion.Toggle
                  as={Button}
                  eventKey="1"
                  className="btn btn-dark btn-outline-light btn-sm"
                >
                  <BsFillChatSquareFill></BsFillChatSquareFill>
                </Accordion.Toggle>
                <span className="Likes">
                  <UsersLiked
                    usersLiked={usersLiked}
                    handleShow={handleShow}
                  ></UsersLiked>
                </span>

                <LikeButton
                  isPostLiked={isPostLiked}
                  handleLike={handleLike}
                ></LikeButton>
              </div>
            </Form.Group>

            <Accordion.Collapse eventKey="1">
              <div>
                <LikesModal
                  show={show}
                  handleClose={handleClose}
                  usersLiked={usersLiked}
                ></LikesModal>

                <CommentSection postId={postId}></CommentSection>
              </div>
            </Accordion.Collapse>
          </div>
        </Accordion>
      ) : (
        "..."
      )}
    </>
  );
}
