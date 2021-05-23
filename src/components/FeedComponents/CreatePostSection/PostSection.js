import { useRef, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useDatabase } from "../../../contexts/DataBaseContext";
import { useStorage } from "../../../contexts/StorageContext";
import PostButtons from "./PostButtons";
import PostUserImage from "./PostUserImage";
import { defaultImage, supportedImgExtensions } from "../../../constants";

export default function Header() {
  const [profilePicture, setProfilePicture] = useState();
  const [imageToUpload, setImageToUpload] = useState();
  const [imageLoadedMessage, setImageLoadedMessage] = useState(null);
  const { currentUser } = useAuth();
  const { addPostToDatabase } = useDatabase();
  const { getProfilePicture, uploadPostImage, getPostImage } = useStorage();
  const postTextRef = useRef();

  const post = {
    user: "",
    text: "",
    hasImage: false,
    image: "",
    imageName: "",
    likes: 0,
    likedBy: [],
    comments: {},
  };

  useEffect(() => {
    if (currentUser)
      getProfilePicture(currentUser.email).then((res) =>
        setProfilePicture(res)
      );
  }, [currentUser, getProfilePicture]);

  async function handlePost(e) {
    e.preventDefault();

    post.user = currentUser.email;
    post.text = postTextRef.current.value;
    if (imageToUpload) post.hasImage = true;

    try {
      if (imageToUpload) {
        await uploadPostImage(imageToUpload.name, imageToUpload);
        const imageUrl = await getPostImage(imageToUpload.name);
        post.image = imageUrl;
        post.imageName = imageToUpload.name;
        setImageToUpload(null);
      }
      await addPostToDatabase(post);
      setImageLoadedMessage(null);

      postTextRef.current.value = "";
    } catch {
      console.log("post failed");
    }
  }

  const handleAttachImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.click();

    input.onchange = (e) => {
      const files = e.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      console.log(files[0]);
      if (supportedImgExtensions.indexOf(files[0].type) > -1) {
        setImageToUpload(files[0]);
        setImageLoadedMessage(true);
      } else {
        setImageLoadedMessage(false);
        setTimeout(() => {
          setImageLoadedMessage(null);
        }, 3000);
      }
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
          imageLoadedMessage={imageLoadedMessage}
          setImageLoadedMessage={setImageLoadedMessage}
          setImageToUpload={setImageToUpload}
        ></PostButtons>
      </Form.Group>
    </form>
  );
}
