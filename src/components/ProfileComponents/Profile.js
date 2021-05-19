import { useState, useEffect } from "react";
import { useDatabase } from "../../contexts/DataBaseContext";
import { useHistory } from "react-router-dom";
import { useStorage } from "../../contexts/StorageContext";
import "./style.css";
import ProfileImageComponent from "./ProfileImage";
import ProfileText from "./ProfileText";
import PostsSection from "./PostsSection";
import ProfileButtons from "./ProfileButtons/ProfileButtons";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
  const history = useHistory();
  const [userProfile, setUserProfile] = useState(history.location.state.user);
  const [profilePicture, setProfilePicture] = useState();
  const [currentUser, setCurrentUser] = useState(
    history.location.state.currentUser
  );
  const [userPosts, setUserPosts] = useState([]);
  const { logout } = useAuth();
  const { getUserPosts } = useDatabase();
  const { uploadProfilePicture, getProfilePicture } = useStorage();

  console.log(userProfile, currentUser);

  async function fetchPosts() {
    getUserPosts(userProfile).then((res) => {
      if (res) setUserPosts(Object.entries(res));
    });
  }

  useEffect(() => {
    if (userPosts.length === 0) fetchPosts();
    getProfilePicture(userProfile).then((res) => {
      if (res) {
        setProfilePicture(res);
      }
    });
  }, [profilePicture]);

  const handleChangeProfileClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const files = e.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      uploadProfilePicture(currentUser, files[0]).then(() =>
        window.location.reload()
      );
    };
  };

  async function handleLogOutClick() {
    await logout();
    history.push("/login");
  }

  return (
    <>
      <div className="container border mt-3" style={{ maxWidth: "680px" }}>
        <ProfileImageComponent
          profilePicture={profilePicture}
        ></ProfileImageComponent>

        <ProfileButtons
          currentUser={currentUser}
          userProfile={userProfile}
          handleChangeProfileClick={handleChangeProfileClick}
          handleLogOutClick={handleLogOutClick}
        ></ProfileButtons>

        <ProfileText userProfile={userProfile}></ProfileText>

        <hr></hr>

        <PostsSection
          userPosts={userPosts}
          profilePicture={profilePicture}
        ></PostsSection>
      </div>
    </>
  );
}
