import { Route, BrowserRouter, Redirect } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import AuthContext from "../contexts/AuthContext";
import DataBaseContext from "../contexts/DataBaseContext";
import StorageProvider from "../contexts/StorageContext";
import Spinner from "./Spinner/Spinner";
import FeedGuard from "./FeedGuard";
import ProfileGuard from "./ProfileGuard";
const Register = lazy(() => import("./LandingPageComponents/Register.js"));
const Login = lazy(() => import("./LandingPageComponents/Login.js"));
const Feed = lazy(() => import("./FeedComponents/Feed.js"));
const Profile = lazy(() => import("./ProfileComponents/Profile"));
const Header = lazy(() => import("./HeaderComponents/Header"));

function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <StorageProvider>
          <DataBaseContext>
            <Suspense fallback={<Spinner></Spinner>}>
              <Header></Header>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/login" component={Login}></Route>
              <FeedGuard path="/feed" component={Feed}></FeedGuard>
              <ProfileGuard path="/profile" component={Profile}></ProfileGuard>
              {/* <AuthGuard path="/profile" component={Profile}></AuthGuard> */}
              {/* <Route path="/feed" component={Feed}></Route> */}
            </Suspense>
          </DataBaseContext>
        </StorageProvider>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
