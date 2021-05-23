import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStorage } from "../../contexts/StorageContext";
import { useAuth } from "../../contexts/AuthContext";
import ImageComponent from "./ImageComponent";
import HomeImage from "./HomeImage";
import "./headerStyle.css";

export default function Header() {
  const history = useHistory();
  const [profilePicture, setProfilePicture] = useState();
  const [homeIcon, setHomeIcon] = useState();
  const { getHomeIcon, currentUserProfilePicture } = useStorage();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) setProfilePicture(currentUserProfilePicture);

    getHomeIcon().then((res) => {
      setHomeIcon(res);
    });
  }, [setProfilePicture, currentUser, currentUserProfilePicture, getHomeIcon]);

  const handleProfileClick = () => {
    history.push({
      pathname: "/profile",
      state: { user: currentUser.email, currentUser: currentUser.email },
    });
  };

  return (
    <>
      {currentUser ? (
        <>
          <div className="headerContainer d-flex justify-content-around align-items-center">
            <h1 className="Home" onClick={() => history.push("/feed")}>
              <HomeImage homeIcon={homeIcon}></HomeImage>
            </h1>

            <h1>Twittarrr</h1>
            {currentUser ? (
              <ImageComponent
                currentUser={currentUser ? currentUser.email : null}
                profilePicture={profilePicture}
                handleProfileClick={handleProfileClick}
              ></ImageComponent>
            ) : null}
          </div>
          <hr className="m-1"></hr>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}
