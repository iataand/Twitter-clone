import React from "react";
import { MdDelete } from "react-icons/md";

export default function DelePostButton({
  currentUser,
  user,
  handleDeletePostClick,
}) {
  return (
    <div onClick={handleDeletePostClick} className="DeleteButton pt-1 pl-1">
      {currentUser === user ? <MdDelete></MdDelete> : ""}
    </div>
  );
}
