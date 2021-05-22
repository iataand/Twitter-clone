import React from "react";
import { FaRegWindowClose } from "react-icons/fa";
import "./style.css";

export default function CancelImageUpload({ setImageLoadedMessage }) {
  return (
    <FaRegWindowClose
      className="Cancel"
      onClick={() => {
        setImageLoadedMessage(null);
      }}
    >
      (cancel)
    </FaRegWindowClose>
  );
}
