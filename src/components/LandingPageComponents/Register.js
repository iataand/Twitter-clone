import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import AuthProvider, { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useDatabase } from "../../contexts/DataBaseContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { register } = useAuth();
  const { addUserToDatabase } = useDatabase();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords don't match.");
      return;
    }

    try {
      setLoading(true);
      await register(emailRef.current.value, passwordRef.current.value);
      await addUserToDatabase(emailRef.current.value);
      history.push("/feed");
    } catch (err) {
      setError(err.message);
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
            <h2 className="text-center mb-4">Register</h2>
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

              <Form.Group id="password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  ref={confirmPasswordRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <button
                  className="w-100 btn btn-dark"
                  disabled={loading}
                  type="submit"
                >
                  Register
                </button>
              </Form.Group>
            </Form>
          </Card>

          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </Container>
    </AuthProvider>
  );
}
