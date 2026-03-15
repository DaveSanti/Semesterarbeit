// src/components/Navbar.js
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wappen from "../img/wappen.png";
import "../styles/Navbar.css";

/*
  Navbar Aufgaben:
  1 Dropdown Navigation ueber Wappen und Text Navigation
  2 Login Status anzeigen und Logout anbieten
*/
export default function Navbar({ isAuthed, user, onLogout }) {
  // Dropdown offen oder geschlossen
  const [open, setOpen] = useState(false);

  // Referenz auf den Bereich, damit wir Klicks ausserhalb erkennen koennen
  const menuRef = useRef(null);

  // Fuer automatisches Schliessen bei Seitenwechsel
  const location = useLocation();

  // Fuer Login Button Navigation
  const navigate = useNavigate();

  // Wenn sich die Route aendert, Dropdown schliessen
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  /*
    Klick ausserhalb schliesst das Dropdown.
    Sobald man irgendwo ausserhalb des Menue Bereichs klickt, wird open auf false gesetzt.
  */
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
        {/* Linker Bereich: Dropdown Trigger und Dropdown Menue */}
        <div className="navLeft" ref={menuRef}>
          <button
            type="button"
            className="crestBtn"
            onClick={() => setOpen((v) => !v)}
            aria-label="Navigation oeffnen"
            aria-expanded={open}
            disabled={!isAuthed}
            title={!isAuthed ? "Bitte zuerst einloggen" : "Navigation"}
          >
            <img className="crestImg" src={wappen} alt="" />
            <span className="crestText">Navigation</span>
          </button>

          {/* Dropdown Inhalte nur anzeigen, wenn open true ist */}
          {open && (
            <div className="dropdownMenu" role="menu" aria-label="Navigation">
              <Link className="navItem" to="/home" role="menuitem">
                Startseite
              </Link>

              <Link className="navItem" to="/weather" role="menuitem">
                Wetter in Köln
              </Link>

              <Link className="navItem" to="/contact" role="menuitem">
                Kontaktformular
              </Link>

              <Link className="navItem" to="/settings" role="menuitem">
                Einstellungen
              </Link>
            
            <Link className="navItem" to="/FcKöln" role="menuitem">
                1.FC Köln 
              </Link>
            
            </div>
          )}
        </div>

        {/* Rechter Bereich: Login Logout */}
        <div className="navRight">
          {isAuthed ? (
            <div className="userPill">
              <span className="userName">{user?.name}</span>
              <button className="btnSmall" type="button" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btnPill"
              type="button"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
