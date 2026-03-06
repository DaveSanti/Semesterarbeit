import React from "react";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <main className="homePage">
      <div className="homeContainer">
        <div className="introBox">
          <h2 className="introTitle">Willkommen in der Cologne App</h2>

          <p className="introText">
            Schön, dass du da bist. Diese App bündelt typische Köln Infos an einem Ort.
            Über das Wappen oben links öffnest du die Navigation und wechselst zu den
            einzelnen Bereichen, zum Beispiel zum Wetter in Köln.
          </p>

          <p className="introText">
            Unten im Footer findest du den Radio Köln Livestream. So kannst du die ganze
            Zeit Musik und aktuelle Beiträge hören, auch wenn du zwischen den Seiten
            wechselst. Einfach Play drücken und laufen lassen.
          </p>

          <p className="introText">
            Köln gehört zu den ältesten Städten Deutschlands. Die Stadt entstand in der
            Römerzeit und wurde im Jahr 50 nach Christus zur römischen Kolonie erhoben.
            Der Kölner Dom, eines der bekanntesten Wahrzeichen, wurde im Jahr 1248
            begonnen und prägt bis heute die Skyline.
          </p>

          <p className="introText">
            Heute ist Köln nicht nur für Dom und Rhein bekannt, sondern auch für
            Lebensgefühl, Karneval und die vielfältige Medienlandschaft.
          </p>
        </div>
      </div>
    </main>
  );
}