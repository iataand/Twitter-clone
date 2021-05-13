import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useDatabase } from "../../contexts/DataBaseContext";

export default function Profile() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [userProfile, setUserProfile] = useState(history.location.state);
  const [userPosts, setUserPosts] = useState([]);
  const { getUserPosts } = useDatabase();

  useEffect(() => {
    // getUserPosts(userProfile.user).then((res) => {
    //   setUserPosts(res);
    //   console.log(res);
    // });

    async function fetchPosts() {
      const response = await getUserPosts(userProfile.user);
      console.log(response);
      setUserPosts(Object.values(response));
    }

    fetchPosts();
  }, []);

  return (
    <div className="container border" style={{ maxWidth: "680px" }}>
      <div className="d-flex justify-content-right">
        <img
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"
          class="rounded m-2"
          style={{ width: 180, height: 180 }}
        ></img>
      </div>
      <div className="d-flex justify-content-between">
        <h2 className="ml-2 p-1">{userProfile.user}</h2>
        <Button className="btn btn-dark ">Settings</Button>
      </div>
      <hr></hr>
      {userPosts &&
        userPosts.map((post) => {
          return <p>{post.text}</p>;
        })}
    </div>
  );
}
