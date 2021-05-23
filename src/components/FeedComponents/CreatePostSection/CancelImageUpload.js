import React from "react";
import { FaRegWindowClose } from "react-icons/fa";
import "./createPostStyle.css";

export default function CancelImageUpload({
  setImageLoadedMessage,
  setImageToUpload,
  setImagePreview,
}) {
  return (
    <FaRegWindowClose
      className="Cancel"
      onClick={() => {
        setImageLoadedMessage(null);
        setImageToUpload(null);
        setImagePreview(null);
      }}
    >
      (cancel)
    </FaRegWindowClose>
  );
}
