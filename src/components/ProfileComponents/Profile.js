import { useState, useEffect, lazy, Suspense } from "react";
import { useDatabase } from "../../contexts/DataBaseContext";
import { useHistory } from "react-router-dom";
import { useStorage } from "../../contexts/StorageContext";
import { useAuth } from "../../contexts/AuthContext";
import "./profileStyle.css";
import { supportedImgExtensions } from "../../constants";
import Spinner from "../Spinner/Spinner";
import ProfileImageComponent from "./ProfileImage";
import ProfileText from "./ProfileText";
import ProfileButtons from "./ProfileButtons/ProfileButtons";
import ImageWarning from "./ImageWarning";
const PostsSection = lazy(() => import("./PostsSection"));

export default function Profile() {
  const history = useHistory();
  const [userProfile] = useState(history.location.state.user);
  const [profilePicture, setProfilePicture] = useState();
  const { currentUser } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [imageWarning, setImageWarning] = useState();
  const { logout } = useAuth();
  const { dbRef } = useDatabase();
  const { uploadProfilePicture, getProfilePicture, currentUserProfilePicture } =
    useStorage();

  useEffect(() => {
    dbRef
      .orderByChild("user")
      .equalTo(userProfile)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setUserPosts(Object.entries(data).reverse());
        } else setUserPosts([]);
      });
  }, [dbRef, setUserPosts, userProfile]);

  useEffect(() => {
    if (currentUser.email === userProfile) {
      setProfilePicture(currentUserProfilePicture);
    } else {
      getProfilePicture(userProfile).then((res) => {
        setProfilePicture(res);
      });
    }
  }, [
    getProfilePicture,
    currentUser.email,
    userProfile,
    currentUserProfilePicture,
    currentUser,
  ]);

  const handleChangeProfileClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const files = e.target.files;
      const reader = new FileReader();
      if (supportedImgExtensions.indexOf(files[0].type) > -1) {
        reader.readAsDataURL(files[0]);
        uploadProfilePicture(currentUser, files[0]).then(() =>
          window.location.reload()
        );
      } else {
        setImageWarning(true);
        setTimeout(() => setImageWarning(false), 3000);
      }
    };
  };

  async function handleLogOutClick() {
    await logout();
    history.push("/login");
  }

  return (
    <>
      <div
        className="ProfileWrapper container border mt-3"
        style={{ maxWidth: "680px" }}
      >
        <ProfileImageComponent
          profilePicture={profilePicture}
        ></ProfileImageComponent>

        {imageWarning && <ImageWarning></ImageWarning>}

        <ProfileButtons
          currentUser={currentUser}
          userProfile={userProfile}
          handleChangeProfileClick={handleChangeProfileClick}
          handleLogOutClick={handleLogOutClick}
        ></ProfileButtons>

        <ProfileText userProfile={userProfile}></ProfileText>

        <hr></hr>
        <Suspense fallback={<Spinner className="container"></Spinner>}>
          <PostsSection
            userPosts={userPosts}
            profilePicture={profilePicture}
          ></PostsSection>
        </Suspense>
      </div>
    </>
  );
}
