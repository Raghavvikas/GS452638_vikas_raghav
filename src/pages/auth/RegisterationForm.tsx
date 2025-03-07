// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { register } from "../../redux/authSlice";
// import { useNavigate } from "react-router-dom";
// import { Button, Form } from "react-bootstrap";

// const RegisterForm: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleRegister = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Normally you'd call an API here to register the user.
//     // For simplicity, we'll assume a successful registration with static data.
//     const user = { id: 1, username, email };
//     const token = "fake-jwt-token";

//     dispatch(register({ user, token }));
//     navigate("/dashboard");
//   };

//   return (
//     <Form onSubmit={handleRegister}>
//       <Form.Group>
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </Form.Group>
//       <Form.Group>
//         <Form.Label>Email</Form.Label>
//         <Form.Control
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </Form.Group>
//       <Form.Group>
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </Form.Group>
//       <Button type="submit">Register</Button>
//     </Form>
//   );
// };

// export default RegisterForm;
