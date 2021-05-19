import { Button } from "react-bootstrap";
import React from "react";

export default function ChangePictureButton({
  currentUser,
  userProfile,
  handleChangeProfileClick,
}) {
  return (
    <div className="ChangePicture">
      {currentUser === userProfile ? (
        <div className="ml-2">
          <Button
            className="btn btn-dark btn-sm"
            onClick={handleChangeProfileClick}
          >
            Change Profile picture
          </Button>
        </div>
      ) : null}
    </div>
  );
}
