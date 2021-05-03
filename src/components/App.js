import ReactDOM from "react-dom";
import {
  Route,
  Link,
  BrowserRouter as Router,
  BrowserRouter,
} from "react-router-dom";
import { Container } from "react-bootstrap";
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
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Route path="/register" component={Register}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/feed" component={Feed}></Route>
            </div>
          </Container>
        </DataBaseContext>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
