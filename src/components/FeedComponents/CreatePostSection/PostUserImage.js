import React from "react";
import "./createPostStyle.css";

export default function PostUserImage({ profilePicture, defaultImage }) {
  return (
    <img
      src={profilePicture || defaultImage}
      className="PostUserImage rounded m-2"
      alt="user"
    ></img>
  );
}
