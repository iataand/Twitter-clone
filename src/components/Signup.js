import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import AuthProvider, { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("this happended");

    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      return setError("Passwords don't match");

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <AuthProvider>
      <Card className="p-4">
        <h2 className="text-center mb-4">Sign Up</h2>
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

          <Form.Group id="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              ref={confirmPasswordRef}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Button className="w-100" disabled={loading} type="submit">
              Sign Up
            </Button>
          </Form.Group>
        </Form>
      </Card>

      <div className="w-100 text-center mt-2">Already have an account?</div>
    </AuthProvider>
  );
}
