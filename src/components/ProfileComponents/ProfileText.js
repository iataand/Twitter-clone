import React from "react";

export default function ProfileText({ userProfile }) {
  return (
    <div className="d-flex justify-content-between">
      <h1 className="ml-2 ">{userProfile}</h1>
    </div>
  );
}
