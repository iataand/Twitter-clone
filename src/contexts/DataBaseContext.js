import React, { useContext, useState, useEffect } from "react";
import { database } from "../firebase";

const DataBaseContext = React.createContext();

export const useDatabase = () => {
  return useContext(DataBaseContext);
};

export default function DatabaseProvider({ children }) {
  const post = (post) => {
    return database.ref("posts").push(post);
  };

  const states = {
    post,
  };

  return (
    <DataBaseContext.Provider value={states}>
      {children}
    </DataBaseContext.Provider>
  );
}
