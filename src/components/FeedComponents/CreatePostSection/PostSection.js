import { useRef, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useDatabase } from "../../../contexts/DataBaseContext";
import { useStorage } from "../../../contexts/StorageContext";
import { defaultImage } from "../../../constants";
import PostButtons from "./PostButtons";
import PostUserImage from "./PostUserImage";

export default function Header() {
  const [profilePicture, setProfilePicture] = useState();
  const [imageToUpload, setImageToUpload] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { currentUser } = useAuth();
  const { addPostToDatabase } = useDatabase();
  const { getProfilePicture } = useStorage();
  const { uploadPostImage } = useStorage();
  const postTextRef = useRef();

  const post = {
    user: "",
    text: "",
    hasImage: false,
    likes: 0,
    likedBy: [],
    comments: {},
    image: "",
  };

  useEffect(() => {
    if (currentUser)
      getProfilePicture(currentUser.email).then((res) =>
        setProfilePicture(res)
      );
  }, [currentUser]);

  const handlePost = (e) => {
    e.preventDefault();
    setImageLoaded(false);

    post.user = currentUser.email;
    post.text = postTextRef.current.value;
    if (imageToUpload) post.hasImage = true;

    try {
      addPostToDatabase(post).then((res) => {
        imageToUpload && uploadPostImage(res.key, imageToUpload);
        setImageToUpload(null);
      });
      postTextRef.current.value = "";
    } catch {
      console.log("post failed");
    }
  };

  const handleAttachImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const files = e.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      setImageToUpload(files[0]);
      setImageLoaded(true);
    };
  };

  return (
    <form onSubmit={handlePost} className="border">
      <Form.Group id="postTextRef">
        <div className="d-flex ">
          <PostUserImage
            profilePicture={profilePicture}
            defaultImage={defaultImage}
          ></PostUserImage>

          <Form.Control
            plaintext
            type="text"
            ref={postTextRef}
            placeholder=" What's happening?"
            required
            className="p-2"
          />
        </div>
        <hr />

        <PostButtons
          handleAttachImage={handleAttachImage}
          imageLoaded={imageLoaded}
        ></PostButtons>
      </Form.Group>
    </form>
  );
}
