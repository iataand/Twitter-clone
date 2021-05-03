import React from "react";
import Header from "./Header";
import AuthProvider from "../contexts/AuthContext";
import DatabaseProvider from "../contexts/DataBaseContext";
import "firebase/database";

export default function Feed() {
  return (
    <>
      <AuthProvider>
        <DatabaseProvider>
          <Header></Header>
        </DatabaseProvider>
      </AuthProvider>
    </>
  );
}
