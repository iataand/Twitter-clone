import React from "react";

export default function PostUserImage({ profilePicture, defaultImage }) {
  return (
    <img
      src={profilePicture || defaultImage}
      className="rounded m-2"
      style={{ width: 50, height: 50 }}
      alt="user"
    ></img>
  );
}
