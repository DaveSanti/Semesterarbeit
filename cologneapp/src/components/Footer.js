import React from "react";
import radioLogo from "../img/radio_koeln.png";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerInner">
        <div className="footerLeft">
          <div className="footerTitle">Semesterarbeit WiSe 25/26</div>
          <div className="footerSub">Von: David Golomb, Niklas Bär, Brian und Carlo</div>
        </div>

        <div className="radioWidget">
          <img className="radioLogo" src={radioLogo} alt="Radio Köln" />
          <audio className="radioPlayer" controls preload="none">
            <source
              src="http://mp3.radiokoeln.c.nmdn.net/ps-radiokoeln/livestream.mp3"
              type="audio/mpeg"
            />
            Dein Browser unterstützt kein Audio Element.
          </audio>
        </div>
      </div>
    </footer>
  );
}