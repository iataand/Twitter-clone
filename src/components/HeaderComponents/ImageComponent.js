import { defaultImage } from "../../constants";

export default function ImageComponent({ profilePicture, handleProfileClick }) {
  return (
    <div className="ProfilePic">
      <img
        src={profilePicture || defaultImage}
        onClick={handleProfileClick}
        style={{ width: "60px", height: "60px" }}
      ></img>
    </div>
  );
}
