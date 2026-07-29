import { useState } from "react";
import api from "../services/api";

function Login({ setIsLoggedIn, goToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const response = await api.post("/api/users/login", {
      email,
      password,
    });

    console.log(response.data);

    localStorage.setItem("token", response.data.token);
setIsLoggedIn(true);

  } catch (error) {
    console.error(error);
    alert("Login Failed");
  }
};

  return (
    <div>
      <h1>GymOS Login</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>

      <p style={{ marginTop: "15px" }}>
  Don't have an account?{" "}
  <span
    onClick={goToSignup}
    style={{
      color: "blue",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Create Account
  </span>
</p>
    </div>
  );
}

export default Login;