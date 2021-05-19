import React from "react";
import { Button } from "react-bootstrap";

export default function LogoutButton({
  currentUser,
  userProfile,
  handleLogOutClick,
}) {
  return (
    <div className="ChangePicture">
      {currentUser === userProfile ? (
        <div className="ml-2">
          <Button className="btn btn-dark btn-sm" onClick={handleLogOutClick}>
            Log Out
          </Button>
        </div>
      ) : null}
    </div>
  );
}
