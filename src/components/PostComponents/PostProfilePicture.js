import { defaultImage } from "../../constants.js";
import "./PostStyle.css";

export default function PostImage({ profilePicture, handleProfileClick }) {
  return (
    <div className="PostImage">
      <img
        src={profilePicture || defaultImage}
        className="ProfilePicture rounded m-2"
        onClick={handleProfileClick}
        alt="profile"
      ></img>
    </div>
  );
}
