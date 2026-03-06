import React, { useEffect, useState } from "react";

export default function WeatherPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError("");
      setData(null);

      try {
        // Platzhalter: hier später echte Wetter API einbauen
        // Du kannst Open Meteo nutzen, weil es ohne API Key geht.
        const url =
          "https://api.open-meteo.com/v1/forecast?latitude=50.9333&longitude=6.95&hourly=temperature_2m&models=icon_seamless&timezone=Europe%2FBerlin";

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Fehler beim Laden der Wetterdaten");
        const json = await res.json();
        setData(json);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message || "Unbekannter Fehler");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const temp = data?.current?.temperature_2m;
  const wind = data?.current?.wind_speed_10m;

  return (
    <main className="page">
      <section className="card">
        <h2 className="title">Wetter in Köln</h2>

        {loading && <p className="text">Lädt...</p>}
        {error && <p className="text errorText">{error}</p>}

        {!loading && !error && data && (
          <div className="weatherGrid">
            <div className="weatherTile">
              <div className="weatherLabel">Temperatur</div>
              <div className="weatherValue">{temp} °C</div>
            </div>

            <div className="weatherTile">
              <div className="weatherLabel">Wind</div>
              <div className="weatherValue">{wind} km/h</div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}