import React from "react";

export default function PostImage({
  profilePicture,
  profilePictureFromProfile,
  handleProfileClick,
}) {
  return (
    <div className="PostImage">
      <img
        src={
          profilePicture ||
          profilePictureFromProfile ||
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"
        }
        className="rounded m-2"
        style={{ width: 50, height: 50 }}
        onClick={handleProfileClick}
      ></img>
    </div>
  );
}
