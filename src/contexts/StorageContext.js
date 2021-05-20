import { useContext, createContext } from "react";
import { storage } from "../firebase";

const StorageContext = createContext();

export const useStorage = () => {
  return useContext(StorageContext);
};

export default function StorageProvider({ children }) {
  const uploadProfilePicture = (user, profilePicture) => {
    console.log(storage.ref());
    return storage.ref().child(user).put(profilePicture);
  };

  const getProfilePicture = (user) => {
    return storage
      .ref()
      .child(user)
      .getDownloadURL()
      .then((url) => url)
      .catch((error) => {
        if (error.code == "storage/object-not-found") {
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
        if (error.code == "storage/object-not-found") {
          return null;
        }
      });
  };
  const states = {
    uploadProfilePicture,
    getProfilePicture,
    getHomeIcon,
  };

  return (
    <StorageContext.Provider value={states}>{children}</StorageContext.Provider>
  );
}
