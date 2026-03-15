import React, { useState } from "react";
import "../styles/ContactPage.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
    interests: [],
    newsletter: "",
    district: "Innenstadt",
    message: "",
  });

  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const newInterests = checked
          ? [...prev.interests, value]
          : prev.interests.filter((i) => i !== value);
        return { ...prev, interests: newInterests };
      });
    } else if (type === "radio") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.email.trim()) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }

    console.log("Name:", formData.username);
    console.log("E-Mail:", formData.email);
    console.log("Alter:", formData.age);
    console.log("Interessen:", formData.interests);
    console.log("Newsletter:", formData.newsletter);
    console.log("Stadtteil:", formData.district);
    console.log("Nachricht:", formData.message);

    setOutput(`Danke, ${formData.username}! Wir melden uns unter ${formData.email}.`);


    setFormData({
      username: "",
      email: "",
      age: "",
      interests: [],
      newsletter: "",
      district: "Innenstadt",
      message: "",
    });
  };


  return (
    <section className="contactPage">
      <div className="contactContainer">
        <div className="contactHeader">
          <h2 className="contactTitle">Kontaktformular</h2>
        </div>

        <form className="contactForm" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="username"
            placeholder="Ihr Name"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>E-Mail:</label>
          <input
            type="email"
            name="email"
            placeholder="Ihre E-Mail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Alter:</label>
          <input
            type="number"
            name="age"
            placeholder="Ihr Alter"
            min="0"
            max="120"
            value={formData.age}
            onChange={handleChange}
          />

          <label>Interessen:</label>
          <p>
            <input
              type="checkbox"
              name="interests"
              value="Kultur"
              checked={formData.interests.includes("Kultur")}
              onChange={handleChange}
            />{" "}
            Kultur
          </p>
          <p>
            <input
              type="checkbox"
              name="interests"
              value="Sport"
              checked={formData.interests.includes("Sport")}
              onChange={handleChange}
            />{" "}
            Sport
          </p>
          <p>
            <input
              type="checkbox"
              name="interests"
              value="Freizeit"
              checked={formData.interests.includes("Freizeit")}
              onChange={handleChange}
            />{" "}
            Freizeit
          </p>

          <label>Newsletter abonnieren?</label>
          <p>
            <input
              type="radio"
              name="newsletter"
              value="Ja"
              checked={formData.newsletter === "Ja"}
              onChange={handleChange}
            />{" "}
            Ja
          </p>
          <p>
            <input
              type="radio"
              name="newsletter"
              value="Nein"
              checked={formData.newsletter === "Nein"}
              onChange={handleChange}
            />{" "}
            Nein
          </p>

          <label>Stadtteil auswählen:</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
          >
            <option value="Innenstadt">Innenstadt</option>
            <option value="Lindenthal">Lindenthal</option>
            <option value="Nippes">Nippes</option>
            <option value="Ehrenfeld">Ehrenfeld</option>
            <option value="Rodenkirchen">Rodenkirchen</option>
            <option value="Chorweiler">Chorweiler</option>
            <option value="Deutz">Deutz</option>
            <option value="Kalk">Kalk</option>
            <option value="Mülheim">Mülheim</option>
          </select>

          <label>Nachricht:</label>
          <textarea
            name="message"
            placeholder="Schreiben sie uns eine Nachricht"
            rows="4"
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit" className="contactBtn">
            Absenden
          </button>
        </form>

        <div id="form-output">{output}</div>
      </div>
    </section>
  );

}
