import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";

function LoginPage({ onLogin }) {
  const [name, setName] = useState("");

  return (
    <main style={{ padding: 24 }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <div style={{ background: "rgba(0,0,0,0.75)", borderRadius: 24, padding: 24, border: "2px solid rgba(255,255,255,0.12)" }}>
          <h1 style={{ marginTop: 0, marginBottom: 10, fontSize: 42, fontWeight: 900 }}>
            Willkommen!
          </h1>
          <p style={{ marginTop: 0, marginBottom: 18, opacity: 0.9 }}>
            Bitte melde dich an, um auf die vollst&auml;ndige App zugreifen zu k&ouml;nnen.
          </p>

          <div style={{ display: "grid", gap: 8 }}>
            <label htmlFor="name" style={{ fontWeight: 800, opacity: 0.9 }}>
              Nutzername
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Zum Beispiel Susanne"
              style={{
                padding: "12px 14px",
                borderRadius: 16,
                border: "2px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => onLogin(name.trim() || "Gast")}
            style={{
              marginTop: 16,
              padding: "14px 18px",
              borderRadius: 999,
              border: 0,
              background: "#e10b0b",
              color: "white",
              fontWeight: 900,
              cursor: "pointer",
              width: 180,
            }}
          >
            Login
          </button>
        </div>
      </div>
    </main>
  );
}

function ProtectedRoute({ isAuthed, children }) {
  if (!isAuthed) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("cologne_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const isAuthed = useMemo(() => Boolean(user?.name), [user]);

  const handleLogin = (name) => {
    const nextUser = { name };
    setUser(nextUser);
    localStorage.setItem("cologne_user", JSON.stringify(nextUser));
    navigate("/home");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("cologne_user");
    navigate("/");
  };

  return (
    <div className="appShell">
      <Navbar isAuthed={isAuthed} user={user} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={isAuthed ? <Navigate to="/home" replace /> : <LoginPage onLogin={handleLogin} />}
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthed={isAuthed}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/weather"
          element={
            <ProtectedRoute isAuthed={isAuthed}>
              <WeatherPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={isAuthed ? "/home" : "/"} replace />} />
      </Routes>

      <Footer />
    </div>
  );
}