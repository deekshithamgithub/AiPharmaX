import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await axios.post(
        "https://aipharmax.onrender.com/api/auth/register",
        { name, email, password }
      );

      alert("Registered Successfully");
      nav("/");

    } catch {
      alert("Registration Failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0f172a,#1e293b)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial"
    }}>

      <div style={{
        width: "420px",
        background: "rgba(255,255,255,0.08)",
        padding: "35px",
        borderRadius: "18px",
        color: "white",
        backdropFilter: "blur(12px)"
      }}>

        <h1 style={{ textAlign: "center" }}>AI PharmaX</h1>
        <h2 style={{ textAlign: "center" }}>Register</h2>

        <input
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={register} style={buttonStyle}>
          Create Account
        </button>

        <p style={{ textAlign: "center", marginTop: "18px" }}>
          Already have account?{" "}
          <Link to="/" style={{ color: "#38bdf8" }}>
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "14px",
  borderRadius: "10px",
  border: "none",
  outline: "none"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "18px",
  border: "none",
  borderRadius: "10px",
  background: "#38bdf8",
  fontWeight: "bold",
  cursor: "pointer"
};