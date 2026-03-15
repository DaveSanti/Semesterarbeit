import React, { useState, useEffect } from "react";
import "../styles/SettingsPage.css";


export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    language: "de",
    itemsPerPage: 10,
  });

  const [message, setMessage] = useState("");


 useEffect(() => {
  const saved = localStorage.getItem("app_settings");

  if (saved) {
    const parsed = JSON.parse(saved);
    setSettings(parsed);

    document.body.classList.remove("light", "dark");
    document.body.classList.add(parsed.theme);
  }
}, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  localStorage.setItem("app_settings", JSON.stringify(settings));

  document.body.classList.remove("light", "dark");
  document.body.classList.add(settings.theme);

  setMessage("Einstellungen gespeichert!");
};

    return (
  <main className="settingsPage">
    <div className="settingsContainer">

      <div className="settingsHeader">
        <h1 className="settingsTitle">Einstellungen</h1>
      </div>

      <form className="settingsForm" onSubmit={handleSubmit}>

        <div className="settingsField">
          <label className="settingsLabel">Theme</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="light">Hell</option>
            <option value="dark">Dunkel</option>
          </select>
        </div>

        <div className="settingsField">
          <label className="settingsLabel">Sprache</label>
          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
          >
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </div>

        <div className="settingsCheckbox">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
          <label>Benachrichtigungen aktivieren</label>
        </div>

        <button className="settingsBtn" type="submit">
          Speichern
        </button>

      </form>

      {message && (
        <div className="settingsMessage">{message}</div>
      )}

    </div>
  </main>
);
}
