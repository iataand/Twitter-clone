import React from "react";
import "./createPostStyle.css";

export default function ImagePreview({ image }) {
  return (
    <>
      <p className="ml-2">This is just a preview: </p>
      <div className="ImagePreviewWrapper d-flex justify-content-end">
        <img className="ImagePreview" src={image} alt="preview"></img>
      </div>
    </>
  );
}
