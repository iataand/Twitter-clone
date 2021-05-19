import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStorage } from "../../contexts/StorageContext";
import { useAuth } from "../../contexts/AuthContext";
import ImageComponent from "./ImageComponent";
import "./style.css";

export default function Header() {
  const history = useHistory();
  const [profilePicture, setProfilePicture] = useState();
  const { getProfilePicture } = useStorage();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser)
      getProfilePicture(currentUser.email).then((res) =>
        setProfilePicture(res)
      );
  });

  const handleProfileClick = () => {
    history.push({
      pathname: "/profile",
      state: { user: currentUser.email, currentUser: currentUser.email },
    });
  };

  return (
    <>
      <div className="headerContainer d-flex justify-content-around align-items-center">
        <h1 className="Home" onClick={() => history.push("/feed")}>
          Home
        </h1>
        <ImageComponent
          currentUser={currentUser ? currentUser.email : null}
          profilePicture={profilePicture}
          handleProfileClick={handleProfileClick}
        ></ImageComponent>
      </div>
      <hr className="m-1"></hr>
    </>
  );
}
