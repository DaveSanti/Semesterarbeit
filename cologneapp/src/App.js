// App.js
import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import "./styles/LoginPage.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";
import ContactPage from "./pages/ContactPage";
import SettingsPage from "./pages/SettingsPage";
import FC from "./pages/FcPage";

/*
  LoginPage ist die einzige Seite, die ohne Login erreichbar ist.
  Hier wird nur ein Name abgefragt und anschließend im Local Storage gespeichert.
*/
function LoginPage({ onLogin }) {
  // Speichert den Namen aus dem Input Feld
  const [name, setName] = useState("");

  return (
    <main className="loginPage">
      <section className="loginCard">
        <h1 className="loginTitle">Willkommen!</h1>

        <p className="loginText">
          Bitte melde dich an, um auf die vollständige App zugreifen zu können.
        </p>

        <div className="loginRow">
          <label className="loginLabel" htmlFor="name">
            Nutzername
          </label>

          <input
            id="name"
            className="loginInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Zum Beispiel Susanne"
          />
        </div>

        <button
          className="loginBtn"
          onClick={() => onLogin(name.trim() || "Gast")}
          type="button"
        >
          Login
        </button>
      </section>
    </main>
  );
}

/*
  ProtectedRoute schützt Seiten.
  Wenn man nicht eingeloggt ist, wird man automatisch zur Login Seite umgeleitet.
*/
function ProtectedRoute({ isAuthed, children }) {
  if (!isAuthed) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const navigate = useNavigate();

  /*
    User State:
    Wir laden beim Start den User aus localStorage.
    Falls nichts gespeichert ist, ist user null.
  */
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("cologne_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // isAuthed ist true, sobald ein Name vorhanden ist
  const isAuthed = useMemo(() => Boolean(user?.name), [user]);

  /*
    Login Handler:
    Speichert den User im State und im localStorage.
    Danach Weiterleitung zur Startseite.
  */
  const handleLogin = (name) => {
    const nextUser = { name };
    setUser(nextUser);
    localStorage.setItem("cologne_user", JSON.stringify(nextUser));
    navigate("/home");
  };

  /*
    Logout Handler:
    Löscht User Daten und geht zurück zur Login Seite.
  */
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("cologne_user");
    navigate("/");
  };

  return (
    <div className="appShell">
      {/* Navbar bleibt immer sichtbar und enthält Dropdown, Theme Switch und Login Logout */}
      <Navbar isAuthed={isAuthed} user={user} onLogout={handleLogout} />

      {/* Routing: nur / ist öffentlich, alles andere ist geschützt */}
      <Routes>
        <Route
          path="/"
          element={
            isAuthed ? (
              <Navigate to="/home" replace />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          }
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

         <Route
          path="/contact"
          element={
            <ProtectedRoute isAuthed={isAuthed}>
              <ContactPage />
            </ProtectedRoute>
          }
        />

          <Route
          path="/settings"
          element={
            <ProtectedRoute isAuthed={isAuthed}>
              <SettingsPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/FcKöln"
          element={
            <ProtectedRoute isAuthed={isAuthed}>
              <FC />
            </ProtectedRoute>
          }
          />

        {/* Fallback: unbekannte URL geht je nach Login Status zur passenden Seite */}
        <Route
          path="*"
          element={<Navigate to={isAuthed ? "/home" : "/"} replace />}
        />
      </Routes>

      {/* Footer bleibt immer sichtbar, inklusive Radio Player */}
      <Footer />
    </div>
  );
}
