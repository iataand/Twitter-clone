import { BsHeart, BsHeartFill } from "react-icons/bs";

export default function LikeButton({ isPostLiked, handleLike }) {
  return (
    <button
      className="btn btn-dark btn-outline-light btn-sm"
      type="submit"
      onClick={handleLike}
    >
      {isPostLiked ? <BsHeartFill></BsHeartFill> : <BsHeart></BsHeart>}
    </button>
  );
}
