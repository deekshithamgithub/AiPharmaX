import { useNavigate } from "react-router-dom";

export default function Profile() {
  const nav = useNavigate();

  const raw = localStorage.getItem("user");

  let userData = {
    name: "Guest User",
    email: "Not Available",
    _id: "Not Available"
  };

  try {
    if (raw) {
      const parsed = JSON.parse(raw);

      userData = {
        name: parsed.name || "Guest User",
        email: parsed.email || "Not Available",
        _id: parsed._id || "Not Available"
      };
    }
  } catch (e) {}

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e5e7eb",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          color: "#111827"
        }}
      >
        <h1 style={{ color: "#111827" }}>User Profile</h1>

        <p style={{ color: "#111827", fontSize: "18px" }}>
          <strong>Name:</strong> {userData.name}
        </p>

        <p style={{ color: "#111827", fontSize: "18px" }}>
          <strong>Email:</strong> {userData.email}
        </p>

        <p style={{ color: "#111827", fontSize: "18px" }}>
          <strong>User ID:</strong> {userData._id}
        </p>

        <button
          onClick={() => nav("/dashboard")}
          style={{
            marginTop: "20px",
            padding: "12px 18px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#38bdf8",
            color: "#000",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Back Dashboard
        </button>
      </div>
    </div>
  );
}