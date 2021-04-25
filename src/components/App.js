import ReactDOM from "react-dom";
import {
  Route,
  Link,
  BrowserRouter as Router,
  BrowserRouter,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import Register from "./Register.js";
import Login from "./Login.js";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
          </div>
        </Container>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
