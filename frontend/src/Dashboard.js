import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [disease, setDisease] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const searchDrug = async () => {
    try {
      if (!disease.trim()) {
        alert("Enter disease name");
        return;
      }

      setLoading(true);
      setResults([]);

      const res = await axios.post(
        // "http://127.0.0.1:8000/predict",
        "https://aipharmax1.onrender.com/predict",
        {
          disease: disease.trim().toLowerCase()
        }
      );

      setResults(res.data.results || []);

    } catch (error) {
      console.log(error);
      alert("Prediction failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Arial"
    }}>

      {/* Sidebar */}
      <div style={{
        width: "250px",
        background: "linear-gradient(180deg,#0f172a,#111827)",
        color: "white",
        padding: "25px"
      }}>

        <h1 style={{
          fontSize: "34px",
          marginBottom: "30px"
        }}>
          AI PharmaX
        </h1>

        <p style={menu}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </p>

        <p style={menu}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </p>

        <p style={menu}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </p>

        <button
          onClick={logout}
          style={logoutBtn}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        background: "#f3f4f6",
        padding: "35px"
      }}>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>

            <h1 style={title}>
              Drug Prediction Dashboard
            </h1>

            <div style={card}>
              <h3 style={subtitle}>
                Search Disease
              </h3>

              <input
                placeholder="Enter Disease Name"
                value={disease}
                onChange={(e) =>
                  setDisease(e.target.value)
                }
                style={input}
              />

              <button
                onClick={searchDrug}
                style={blueBtn}
              >
                {loading
                  ? "Searching..."
                  : "Predict"}
              </button>
            </div>

            <h2 style={{
              ...subtitle,
              marginTop: "30px"
            }}>
              Results
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "18px"
            }}>

              {results.map((item, index) => (
                <div
                  key={index}
                  style={card}
                >
                  <h3 style={{
                    color: "#111827"
                  }}>
                    {item.drug}
                  </h3>

                  <p style={{
                    color: "#4b5563"
                  }}>
                    {item.score}% Confidence
                  </p>
                </div>
              ))}

            </div>

          </div>
        )}

        {/* Analytics */}
        {activeTab === "analytics" && (
          <div>

            <h1 style={title}>
              Analytics
            </h1>

            <div style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(230px,1fr))",
              gap: "18px"
            }}>

              <div style={card}>
                <h3 style={subtitle}>
                  Total Results
                </h3>

                <h1 style={number}>
                  {results.length}
                </h1>
              </div>

              <div style={card}>
                <h3 style={subtitle}>
                  Last Search
                </h3>

                <h1 style={number}>
                  {disease || "None"}
                </h1>
              </div>

              <div style={card}>
                <h3 style={subtitle}>
                  Accuracy
                </h3>

                <h1 style={number}>
                  94%
                </h1>
              </div>

            </div>

          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <div>

            <h1 style={title}>
              User Profile
            </h1>

            <div style={card}>
              <p style={text}>
                <strong>Status:</strong> Active
              </p>

              <p style={text}>
                <strong>Access:</strong> Authenticated
              </p>

              <p style={text}>
                <strong>Project:</strong> AI PharmaX
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

/* Styles */

const menu = {
  padding: "14px",
  background: "#1e293b",
  borderRadius: "10px",
  marginTop: "12px",
  cursor: "pointer",
  fontSize: "18px"
};

const logoutBtn = {
  marginTop: "35px",
  padding: "12px",
  width: "100%",
  border: "none",
  borderRadius: "10px",
  background: "#ef4444",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};

const card = {
  background: "white",
  padding: "24px",
  borderRadius: "18px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
};

const title = {
  color: "#111827",
  fontSize: "38px",
  marginBottom: "20px"
};

const subtitle = {
  color: "#111827",
  fontSize: "22px"
};

const number = {
  color: "#2563eb",
  fontSize: "36px"
};

const text = {
  color: "#374151",
  fontSize: "18px"
};

const input = {
  padding: "14px",
  width: "340px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  marginTop: "12px",
  fontSize: "16px"
};

const blueBtn = {
  padding: "14px 22px",
  marginLeft: "10px",
  border: "none",
  borderRadius: "10px",
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer"
};