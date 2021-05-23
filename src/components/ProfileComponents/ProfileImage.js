import React from "react";
import "./profileStyle.css";
import { defaultImage } from "../../constants";

export default function ProfileImageComponent({ profilePicture }) {
  return (
    <div
      className="bg-image hover-overlay ripple shadow-1-strong rounded"
      style={{ maxWidth: "200px" }}
    >
      <img
        src={profilePicture ? profilePicture : defaultImage}
        className="ProfilePicture rounded m-2"
        style={{ width: 180, height: 180 }}
        alt="profileImage"
      ></img>
    </div>
  );
}
