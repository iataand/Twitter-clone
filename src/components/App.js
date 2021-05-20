import { Route, BrowserRouter, Redirect } from "react-router-dom";
import AuthContext, { useAuth } from "../contexts/AuthContext";
import DataBaseContext from "../contexts/DataBaseContext";
import StorageProvider from "../contexts/StorageContext";
import Register from "./LandingPageComponents/Register.js";
import Login from "./LandingPageComponents/Login.js";
import Feed from "./FeedComponents/Feed.js";
import Profile from "./ProfileComponents/Profile";
import Header from "./HeaderComponents/Header";

function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <StorageProvider>
          <DataBaseContext>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Header></Header>
            <Route path="/feed" component={Feed}></Route>
            <Route path="/profile" component={Profile}></Route>
          </DataBaseContext>
        </StorageProvider>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
