import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStorage } from "../../contexts/StorageContext";
import ImageComponent from "./ImageComponent";
import "./style.css";

export default function Header({ currentUser }) {
  const history = useHistory();
  const [profilePicture, setProfilePicture] = useState();
  const { getProfilePicture } = useStorage();

  useEffect(() => {
    if (currentUser)
      getProfilePicture(currentUser).then((res) => setProfilePicture(res));
  }, [profilePicture]);

  const handleProfileClick = () => {
    history.push({
      pathname: "/profile",
      state: { user: currentUser, currentUser: currentUser },
    });
  };

  return (
    <>
      <div className="headerContainer d-flex justify-content-around align-items-center">
        <h1 className="Home" onClick={() => history.push("/feed")}>
          Home
        </h1>
        <ImageComponent
          currentUser={currentUser}
          profilePicture={profilePicture}
          handleProfileClick={handleProfileClick}
        ></ImageComponent>
      </div>
      <hr className="m-1"></hr>
    </>
  );
}
