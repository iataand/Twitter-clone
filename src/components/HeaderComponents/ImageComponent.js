import { defaultImage } from "../../constants";

export default function ImageComponent({ profilePicture, handleProfileClick }) {
  return (
    <div>
      <img
        className="ProfilePic"
        src={profilePicture || defaultImage}
        onClick={handleProfileClick}
        alt="profile"
      ></img>
    </div>
  );
}
