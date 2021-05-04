import React, { useContext } from "react";
import { database } from "../firebase";

const DataBaseContext = React.createContext();

export const useDatabase = () => {
  return useContext(DataBaseContext);
};

export default function DatabaseProvider({ children }) {
  const post = (post) => {
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

  const updatePosts = () => {
    const postsRef = database.ref("posts");
    return postsRef.on("child_added", (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  };

  const states = {
    post,
    getPostsFromDatabase,
  };

  return (
    <DataBaseContext.Provider value={states}>
      {children}
    </DataBaseContext.Provider>
  );
}
