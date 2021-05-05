import React, { useContext } from "react";
import { database } from "../firebase";

const DataBaseContext = React.createContext();

export const useDatabase = () => {
  return useContext(DataBaseContext);
};

export default function DatabaseProvider({ children }) {
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

  const postsRef = database.ref("posts");

  const states = {
    addPostToDatabase,
    getPostsFromDatabase,
    postsRef,
  };

  return (
    <DataBaseContext.Provider value={states}>
      {children}
    </DataBaseContext.Provider>
  );
}
