import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Form, Button, Card, Alert } from "react-bootstrap";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/feed");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <AuthProvider>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card className="p-4">
            <h2 className="text-center mb-4">Log in</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Button className="w-100" disabled={loading} type="submit">
                  Log In
                </Button>
              </Form.Group>
            </Form>
          </Card>

          <div className="w-100 text-center mt-2">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </Container>
    </AuthProvider>
  );
}
