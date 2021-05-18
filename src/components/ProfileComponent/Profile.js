import { useState, useEffect } from "react";
import { useDatabase } from "../../contexts/DataBaseContext";
import { useHistory } from "react-router-dom";
import Post from "../PostComponents/Post";
import Header from "../FeedComponents/Header";
import "./style.css";
import { useStorage } from "../../contexts/StorageContext";

export default function Profile() {
  const history = useHistory();
  const [userProfile, setUserProfile] = useState(history.location.state.user);
  const [profilePicture, setProfilePicture] = useState();
  const [currentUser, setCurrentUser] = useState(
    history.location.state.currentUser
  );
  const [userPosts, setUserPosts] = useState([]);
  const { getUserPosts } = useDatabase();
  const { uploadProfilePicture, getProfilePicture } = useStorage();

  async function fetchPosts() {
    const response = await getUserPosts(userProfile);
    setUserPosts(Object.entries(response));
  }

  useEffect(() => {
    if (userPosts.length === 0) fetchPosts();
    getProfilePicture(userProfile).then((res) => setProfilePicture(res));
  }, []);

  const handleChangeProfileClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const files = e.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      uploadProfilePicture(currentUser, files[0]);
    };
  };

  return (
    <>
      <Header></Header>
      <div className="container border mt-3" style={{ maxWidth: "680px" }}>
        <div
          className="bg-image hover-overlay ripple shadow-1-strong rounded"
          style={{ maxWidth: "200px" }}
        >
          <img
            src={
              profilePicture
                ? profilePicture
                : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"
            }
            className="ProfilePicture rounded m-2"
            style={{ width: 180, height: 180 }}
          ></img>
        </div>

        {currentUser === userProfile ? (
          <p className="ml-2" onClick={handleChangeProfileClick}>
            Change Profile pic
          </p>
        ) : null}

        <div className="d-flex justify-content-between">
          <h2 className="ml-2 ">{userProfile}</h2>
        </div>
        <hr></hr>
        <div className="mb-3">
          {userPosts &&
            userPosts.map((post) => {
              return (
                <Post
                  key={post[0]}
                  postId={post[0]}
                  text={post[1].text}
                  user={post[1].user}
                >
                  {post.text}
                </Post>
              );
            })}
        </div>
      </div>
    </>
  );
}
