import React from "react";
import ChangePictureButton from "./ChangePictureButton";
import LogoutButton from "./LogoutButton";

export default function ProfileButtons({
  currentUser,
  userProfile,
  handleChangeProfileClick,
  handleLogOutClick,
}) {
  return (
    <div className="d-flex justify-content-between">
      <ChangePictureButton
        currentUser={currentUser}
        userProfile={userProfile}
        handleChangeProfileClick={handleChangeProfileClick}
      ></ChangePictureButton>

      <LogoutButton
        currentUser={currentUser}
        userProfile={userProfile}
        handleLogOutClick={handleLogOutClick}
      ></LogoutButton>
    </div>
  );
}
