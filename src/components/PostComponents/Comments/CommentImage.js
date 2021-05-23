import { defaultImage } from "../../../constants.js";

export default function CommentImage({ profilePicture }) {
  return (
    <img
      src={profilePicture || defaultImage}
      className="rounded m-2 text-wrap  text-break"
      style={{ width: 50, height: 50 }}
      alt="comment"
    ></img>
  );
}
