import { defaultImage } from "../../constants.js";
export default function PostImage({
  profilePicture,
  profilePictureFromProfile,
  handleProfileClick,
}) {
  return (
    <div className="PostImage">
      <img
        src={profilePicture || profilePictureFromProfile || defaultImage}
        className="rounded m-2"
        style={{ width: 50, height: 50 }}
        onClick={handleProfileClick}
      ></img>
    </div>
  );
}
