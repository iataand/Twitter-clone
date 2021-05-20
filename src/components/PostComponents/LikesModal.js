import { Modal } from "react-bootstrap";

export default function LikeSection({ usersLiked, show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} style={{ minHeight: "100vh" }}>
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
