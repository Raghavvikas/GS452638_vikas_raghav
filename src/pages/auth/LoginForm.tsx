import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Normally you'd call an API here to authenticate the user.
    // For simplicity, we'll assume a successful login with static data.
    if (email && password) {
      const user = { id: 1, username: email.split("@")[0], email, password };
      const token = `token-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

      dispatch(login({ user, token }));
      navigate("/");
    }
    else{
      alert("Please fill all the details!")
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <h2>Login</h2>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;
