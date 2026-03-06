import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wappen from "../img/wappen.png";
import "../styles/Navbar.css";

export default function Navbar({ isAuthed, user, onLogout }) {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("cologne_theme");
    return saved === "light" ? "light" : "dark";
  });

  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    document.body.classList.remove("themeDark", "themeLight");
    document.body.classList.add(theme === "light" ? "themeLight" : "themeDark");
    localStorage.setItem("cologne_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return (
    <header className="topbar">
      <div className="topbarInner">
        <div className="navLeft" ref={menuRef}>
          <button
            type="button"
            className="crestBtn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Navigation öffnen"
            aria-expanded={open}
            disabled={!isAuthed}
            title={!isAuthed ? "Bitte zuerst einloggen" : "Navigation"}
          >
            <img className="crestImg" src={wappen} alt="" />
            <span className="crestText">Navigation</span>
          </button>

          {open && (
            <div className="dropdownMenu" role="menu" aria-label="Navigation">
              <Link className="navItem" to="/home" role="menuitem">
                Startseite
              </Link>
              <Link className="navItem" to="/weather" role="menuitem">
                Wetter in Köln
              </Link>
            </div>
          )}
        </div>

        <div className="navRight">
          <div className="themeToggle">
            <span className="toggleLabel">{theme === "light" ? "Hell" : "Dunkel"}</span>
            <button
              type="button"
              className="switchBtn"
              onClick={toggleTheme}
              aria-label="Theme wechseln"
              title="Hell oder Dunkel"
            >
              <span className="switchKnob" />
            </button>
          </div>

          {isAuthed ? (
            <div className="userPill">
              <span className="userName">{user?.name}</span>
              <button className="btnSmall" type="button" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="btnPill" type="button" onClick={() => navigate("/")}>
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}