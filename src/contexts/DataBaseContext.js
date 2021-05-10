import React, { useContext } from "react";
import { database } from "../firebase";

const DataBaseContext = React.createContext();

export const useDatabase = () => {
  return useContext(DataBaseContext);
};

export default function DatabaseProvider({ children }) {
  const dbRef = database.ref("posts");

  const getCommsRef = (postId) => {
    return database.ref(`posts/${postId}`);
  };

  const addPostToDatabase = (post) => {
    return database.ref("posts").push(post);
  };

  const addCommToPost = (postId, comment, user) => {
    return database
      .ref(`posts/${postId}/comments`)
      .push({ user: user, text: comment });
  };

  const addLike = (postId, user) => {
    return database.ref(`posts/${postId}`).push({
      likedBy: user,
    });
  };

  const states = {
    getCommsRef,
    addCommToPost,
    addPostToDatabase,
    dbRef,
    addLike,
  };

  return (
    <DataBaseContext.Provider value={states}>
      {children}
    </DataBaseContext.Provider>
  );
}
