import React from "react";

export default function ImageComponent({ profilePicture, handleProfileClick }) {
  return (
    <div className="ProfilePic">
      <img
        src={
          profilePicture ||
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"
        }
        onClick={handleProfileClick}
        style={{ width: "60px", height: "60px" }}
      ></img>
    </div>
  );
}
