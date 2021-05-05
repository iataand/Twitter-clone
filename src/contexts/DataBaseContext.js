import React, { useContext } from "react";
import { database } from "../firebase";

const DataBaseContext = React.createContext();

export const useDatabase = () => {
  return useContext(DataBaseContext);
};

export default function DatabaseProvider({ children }) {
  const postsRef = database.ref("posts");

  const addPostToDatabase = (post) => {
    return database.ref("posts").push(post);
  };

  const getPostsFromDatabase = () => {
    const dbRef = database.ref();
    return dbRef
      .child("posts")
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          return data;
        } else {
          return "No data available";
        }
      })
      .catch((error) => {
        return error;
      });
  };

  const addCommToPost = (postId, comment) => {
    return database.ref("posts").child(`${postId}/comments`).push(comment);
  };

  const states = {
    addPostToDatabase,
    getPostsFromDatabase,
    postsRef,
    addCommToPost,
  };

  return (
    <DataBaseContext.Provider value={states}>
      {children}
    </DataBaseContext.Provider>
  );
}
