import { useState, useEffect } from "react";
// import { InputGroup, FormControl } from "react-bootstrap";
// import { BiSearch } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { useStorage } from "../../contexts/StorageContext";
import "./style.css";

export default function Header({ currentUser }) {
  const history = useHistory();
  const { getProfilePicture } = useStorage();
  const [profilePicture, setProfilePicture] = useState();

  useEffect(() => {
    if (currentUser)
      getProfilePicture(currentUser).then((res) => setProfilePicture(res));
  });

  const handleProfileClick = () => {
    history.push({
      pathname: "/profile",
      state: { user: currentUser, currentUser: currentUser },
    });
  };

  return (
    <>
      <div className="p-1">
        <div className="d-flex justify-content-around align-items-center">
          <h2 onClick={() => history.push("/feed")}>Home</h2>
          {/* <InputGroup className="SearchBox w-50 d-flex align-items-center ">
            <BiSearch></BiSearch>
            <FormControl placeholder="Search users" />
          </InputGroup> */}
          {currentUser ? (
            <img
              src={
                profilePicture
                  ? profilePicture
                  : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"
              }
              onClick={handleProfileClick}
              style={{ width: "60px", height: "60px" }}
            ></img>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <hr className="m-1"></hr>
    </>
  );
}
