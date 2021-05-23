import { defaultImage } from "../../../constants.js";
import "./commentStyle.css";

export default function CommentImage({ profilePicture }) {
  return (
    <img
      src={profilePicture || defaultImage}
      className="CommentProfilePicture rounded m-2 text-wrap  text-break"
      alt="comment"
    ></img>
  );
}
