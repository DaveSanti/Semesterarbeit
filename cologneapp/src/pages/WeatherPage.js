// WeatherPage.js
import React, { useEffect, useMemo, useState } from "react";
import "./WeatherPage.css";

import rainyImg from "../img/rainy.png";
import cloudyImg from "../img/cloudy.png";
import sunnyImg from "../img/sunny.png";

/*
  Aktualisierte Open Meteo URL
  current enthaelt jetzt auch precipitation
  showers wurde entfernt
*/
const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=50.9333&longitude=6.95&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,sunshine_duration,rain_sum,wind_speed_10m_max,uv_index_max,daylight_duration&current=temperature_2m,rain,cloud_cover,relative_humidity_2m,wind_speed_10m,precipitation&timezone=Europe%2FBerlin";

/*
  Hilfsfunktionen fuer Anzeigeformate
*/
function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
}

function secondsToHours(sec) {
  if (sec === null || sec === undefined) return "";
  const h = sec / 3600;
  return `${Math.round(h * 10) / 10} h`;
}

/*
  Auswahl des Hintergrundbilds fuer den Aktuell Bereich
  Regen hat Prioritaet
  Danach viele Wolken
  Sonst sonnig
*/
function pickWeatherBg(current) {
  const rain = Number(current?.rain ?? 0);
  const precipitation = Number(current?.precipitation ?? 0);
  const clouds = Number(current?.cloud_cover ?? 0);

  if (rain > 0.05 || precipitation > 0.05) return "rainy";
  if (clouds >= 60) return "cloudy";
  return "sunny";
}

/*
  Aktuell Block
  Hintergrundbild wird ueber style gesetzt
*/
function CurrentWeather({ data, bgUrl }) {
  const current = data?.current;
  const units = data?.current_units;

  return (
    <section
      className="weatherSection weatherCurrent"
      style={{ backgroundImage: `url(${bgUrl})` }}
      aria-label="Aktuelles Wetter"
    >
      <div className="weatherCurrentOverlay">
        <h3 className="sectionTitle">Aktuell</h3>

        <div className="grid">
          <div className="tile">
            <div className="label">Temperatur</div>
            <div className="value">
              {current?.temperature_2m} {units?.temperature_2m}
            </div>
          </div>

          <div className="tile">
            <div className="label">Luftfeuchtigkeit</div>
            <div className="value">
              {current?.relative_humidity_2m} {units?.relative_humidity_2m}
            </div>
          </div>

          <div className="tile">
            <div className="label">Wind</div>
            <div className="value">
              {current?.wind_speed_10m} {units?.wind_speed_10m}
            </div>
          </div>

          <div className="tile">
            <div className="label">Wolken</div>
            <div className="value">
              {current?.cloud_cover} {units?.cloud_cover}
            </div>
          </div>

          <div className="tile">
            <div className="label">Regen</div>
            <div className="value">
              {current?.rain} {units?.rain}
            </div>
          </div>

          <div className="tile">
            <div className="label">Niederschlag</div>
            <div className="value">
              {current?.precipitation} {units?.precipitation}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
  Tagesuebersicht Block
  Daten werden in Zeilen fuer die Tabelle umgebaut
*/
function Forecast({ data }) {
  const daily = data?.daily;

  const rows = useMemo(() => {
    if (!daily?.time?.length) return [];

    return daily.time.map((t, i) => ({
      date: t,
      tMax: daily.temperature_2m_max?.[i],
      tMin: daily.temperature_2m_min?.[i],
      sunrise: daily.sunrise?.[i],
      sunset: daily.sunset?.[i],
      sunshine: daily.sunshine_duration?.[i],
      rainSum: daily.rain_sum?.[i],
      windMax: daily.wind_speed_10m_max?.[i],
      uvMax: daily.uv_index_max?.[i],
    }));
  }, [daily]);

  return (
    <section className="weatherSection">
      <h3 className="sectionTitle">Tagesübersicht</h3>

      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              <th>Tag</th>
              <th>Min</th>
              <th>Max</th>
              <th>Sonnenaufgang</th>
              <th>Sonnenuntergang</th>
              <th>Sonne</th>
              <th>Regen</th>
              <th>Wind max</th>
              <th>UV max</th>
            </tr>
          </thead>

          <tbody>
            {rows.slice(0, 7).map((r) => (
              <tr key={r.date}>
                <td>{formatDate(r.date)}</td>
                <td>{r.tMin} °C</td>
                <td>{r.tMax} °C</td>
                <td>{formatTime(r.sunrise)}</td>
                <td>{formatTime(r.sunset)}</td>
                <td>{secondsToHours(r.sunshine)}</td>
                <td>{r.rainSum} mm</td>
                <td>{r.windMax} km/h</td>
                <td>{r.uvMax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function WeatherPage() {
  // loading nur fuer die kurze Anzeige waehrend des Ladens
  const [loading, setLoading] = useState(false);

  // data enthaelt die komplette API Antwort
  const [data, setData] = useState(null);

  /*
    API Aufruf beim ersten Rendern
    Wenn es fehlschlaegt, bleibt data einfach null
  */
  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);

      try {
        const res = await fetch(URL, { signal: controller.signal });
        const json = await res.json();
        setData(json);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  // Hintergrundbild Auswahl aus aktuellen Werten
  const bgKey = pickWeatherBg(data?.current);

  const bgUrl = useMemo(() => {
    if (bgKey === "rainy") return rainyImg;
    if (bgKey === "cloudy") return cloudyImg;
    return sunnyImg;
  }, [bgKey]);

  return (
    <main className="weatherPage">
      <div className="weatherContainer">
        <div className="weatherHeader">
          <h2 className="weatherTitle">Wetter in Köln</h2>

          <button
            className="weatherBtn"
            type="button"
            onClick={() => window.location.reload()}
          >
            Aktualisieren
          </button>
        </div>

        {loading && <p className="weatherText">Laedt...</p>}

        {!loading && data && (
          <>
            <CurrentWeather data={data} bgUrl={bgUrl} />
            <Forecast data={data} />
          </>
        )}
      </div>
    </main>
  );
}