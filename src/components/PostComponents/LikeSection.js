import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function LikeSection(usersLiked) {
  const [show, showModal] = useState(false);

  const handleClose = () => showModal(false);
  const handleShow = () => showModal(true);

  return (
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
  );
}
