import React from "react";

export default function ProfileImageComponent({ profilePicture }) {
  return (
    <div
      className="bg-image hover-overlay ripple shadow-1-strong rounded"
      style={{ maxWidth: "200px" }}
    >
      <img
        src={
          profilePicture
            ? profilePicture
            : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"
        }
        className="ProfilePicture rounded m-2"
        style={{ width: 180, height: 180 }}
      ></img>
    </div>
  );
}
