import { useState } from "react";
import api from "../services/api";
function Signup({ goToLogin }) {
  const [gymName, setGymName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gymAddress, setGymAddress] = useState("");
  const [password, setPassword] = useState("");
const handleSignup = async () => {
  try {
    const response = await api.post("/api/users/signup", {
      gymName,
      ownerName,
      email,
      phone,
      gymAddress,
      password,
    });

    alert(response.data.message);
    console.log(response.data);

    goToLogin();

  } catch (error) {
    console.error(error.response?.data);
    alert(error.response?.data?.message || "Signup Failed");
  }
};
  return (
    <div>
      <h1>GymOS Signup</h1>

      <input
        type="text"
        placeholder="Gym Name"
        value={gymName}
        onChange={(e) => setGymName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Gym Address"
        value={gymAddress}
        onChange={(e) => setGymAddress(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

<button onClick={handleSignup}>
  Create Account
</button>

<p style={{ marginTop: "15px" }}>
  Already have an account?{" "}
  <span
    onClick={goToLogin}
    style={{
      color: "blue",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Login
  </span>
</p>

    </div>
  );
}

export default Signup;