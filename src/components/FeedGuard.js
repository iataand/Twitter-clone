import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Feed from "./FeedComponents/Feed";

export default function GuardedRoute() {
  const { currentUser } = useAuth();

  return (
    <Route
      render={() =>
        currentUser ? (
          <Route path="/feed" component={Feed}></Route>
        ) : (
          <Redirect to="/login"></Redirect>
        )
      }
    ></Route>
  );
}
