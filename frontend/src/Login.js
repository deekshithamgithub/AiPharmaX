import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("https://aipharmax.onrender.com/api/auth/login", {
        email,
        password,
      });

      //   localStorage.setItem("token", res.data.token);
      //   nav("/dashboard");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav("/dashboard");
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "rgba(255,255,255,0.08)",
          padding: "35px",
          borderRadius: "18px",
          color: "white",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>AI PharmaX</h1>
        <h2 style={{ textAlign: "center" }}>Login</h2>

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

        <button onClick={login} style={buttonStyle}>
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "18px" }}>
          New user?{" "}
          <Link to="/register" style={{ color: "#38bdf8" }}>
            Register
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
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "18px",
  border: "none",
  borderRadius: "10px",
  background: "#38bdf8",
  fontWeight: "bold",
  cursor: "pointer",
};
