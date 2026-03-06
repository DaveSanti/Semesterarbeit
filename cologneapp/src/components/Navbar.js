import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wappen from "../img/wappen.png";
import "../styles/Navbar.css";

export default function Navbar({ isAuthed, user, onLogout }) {
  const [open, setOpen] = useState(false);
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
        <span className="crestText">Menü</span>
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