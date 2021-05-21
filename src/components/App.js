import { Route, BrowserRouter, Redirect } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import AuthContext from "../contexts/AuthContext";
import DataBaseContext from "../contexts/DataBaseContext";
import StorageProvider from "../contexts/StorageContext";
import Spinner from "./Spinner";
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
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/login" component={Login}></Route>
              <Header></Header>
              <Route path="/feed" component={Feed}></Route>
              <Route path="/profile" component={Profile}></Route>
            </Suspense>
          </DataBaseContext>
        </StorageProvider>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
