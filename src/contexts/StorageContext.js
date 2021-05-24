import { useContext, createContext, useState, useEffect } from "react";
import { defaultImage } from "../constants";
import { storage } from "../firebase";
import { useAuth } from "./AuthContext";

const StorageContext = createContext();

export const useStorage = () => {
  return useContext(StorageContext);
};

export default function StorageProvider({ children }) {
  const [currentUserProfilePicture, setProfilePicture] = useState();
  const { currentUser } = useAuth();

  const uploadProfilePicture = (user, profilePicture) => {
    return storage.ref().child(`users/${user}`).put(profilePicture);
  };

  const getProfilePicture = (user) => {
    return storage
      .ref()
      .child(`users/${user}`)
      .getDownloadURL()
      .then((url) => {
        return url;
      })
      .catch((error) => {
        if (error.code === "storage/object-not-found") {
          return null;
        }
      });
  };

  const getPostImage = (postId) => {
    return storage
      .ref()
      .child(`/posts-images/${postId}`)
      .getDownloadURL()
      .then((url) => {
        return url;
      })
      .catch((error) => {
        if (error.code === "storage/object-not-found") {
          return null;
        }
      });
  };

  const getHomeIcon = () => {
    return storage
      .ref("/Icons/Twitter-Pirate-Icon.jpg")
      .getDownloadURL()
      .then((url) => url)
      .catch((error) => {
        if (error.code === "storage/object-not-found") {
          return null;
        }
      });
  };

  const uploadPostImage = (imageName, image) => {
    return storage.ref().child(`posts-images/${imageName}`).put(image);
  };

  const deletePostImage = (imageName) => {
    return storage.ref().child(`posts-images/${imageName}`).delete();
  };

  useEffect(() => {
    if (currentUser)
      return storage
        .ref()
        .child(`users/${currentUser.email}`)
        .getDownloadURL()
        .then((url) => {
          if (url) setProfilePicture(url);
          else setProfilePicture(defaultImage);
        })
        .catch((error) => {
          if (error.code === "storage/object-not-found") {
            return null;
          }
        });
  });

  const states = {
    uploadProfilePicture,
    getProfilePicture,
    getHomeIcon,
    uploadPostImage,
    getPostImage,
    deletePostImage,
    currentUserProfilePicture,
  };

  return (
    <StorageContext.Provider value={states}>{children}</StorageContext.Provider>
  );
}
