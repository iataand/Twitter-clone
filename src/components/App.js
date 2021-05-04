import { Route, BrowserRouter } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import DataBaseContext from "../contexts/DataBaseContext";
import Register from "./Register.js";
import Login from "./Login.js";
import Feed from "./Feed.js";

function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <DataBaseContext>
          <Route path="/register" component={Register}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Feed}></Route>
        </DataBaseContext>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
