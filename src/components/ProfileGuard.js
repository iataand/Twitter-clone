import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Profile from "../components/ProfileComponents/Profile";

export default function GuardedRoute() {
  const { currentUser } = useAuth();

  return (
    <Route
      render={() =>
        currentUser ? (
          <Route path="/profile" component={Profile}></Route>
        ) : (
          <Redirect to="/login"></Redirect>
        )
      }
    ></Route>
  );
}
