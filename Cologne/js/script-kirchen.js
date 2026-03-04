// User Objekt für den Dom
const user = {
  firstName: "Kölner Dom",
  job: "Kathedrale und Welterbe",
  age: "Bauzeit 1248 bis 1880",
  city: "Köln",
  interessen: [
    "Gotik",
    "Doppelturmfassade",
    "Reliquienschrein der Heiligen Drei Könige"
  ]
};

    function koelnerdom() {
  const box = document.getElementById("user-output");
  box.innerHTML = `
    <p><strong>Name:</strong> ${user.firstName}</p>
    <p><strong>Funktion:</strong> ${user.job}</p>
    <p><strong>Zeitraum:</strong> ${user.age}</p>
    <p><strong>Stadt:</strong> ${user.city}</p>
    <p><strong>Besonderheiten:</strong> ${user.interessen.join(", ")}</p>
  `;
}

// Array of Objects für die weiteren Kirchen
const contacts = [
  {
    firstName: "Groß St. Martin",
    age: "Romanik, zwölftes Jahrhundert",
    resident: "Altstadt",
    profession: "Ehemalige Stiftskirche",
    img: "/img/kirchen/großstmartin.jpg",
    facts: ["Vierungsturm", "Wiederaufbau nach dem Krieg", "Prägend an der Rheinfront"]
  },
  {
    firstName: "St. Agnes",
    age: "Neugotik, neunzehntes Jahrhundert",
    resident: "Neustadt Nord",
    profession: "Pfarrkirche",
    img: "/img/kirchen/agneskirche.jpg",
    facts: ["Zweitgrößte Kirche der Stadt", "Backsteinarchitektur", "Hoher Turm"]
  },
  {
    firstName: "Synagoge Köln",
    age: "Zwanzigstes Jahrhundert, späterer Wiederaufbau",
    resident: "Roonstraße",
    profession: "Zentrum der jüdischen Gemeinde",
    img: "/img/kirchen/synagoge.jpg",
    facts: ["Bedeutende Gemeinde", "Geschichte von Zerstörung und Erneuerung", "Kuppel als Merkmal"]
  }
];

function displaychurches() {
  const wrap = document.getElementById("contacts-output");
  
  contacts.forEach(item => {
    const col = document.createElement("div");
    col.className = "w3-col l4 m6 s12 w3-margin-bottom";

    col.innerHTML = `
      <div class="w3-card w3-white">
        <img src="${item.img}" alt="${item.firstName}" style="width:100%;">
        <div class="w3-container w3-padding">
          <h4>${item.firstName}</h4>
          <p><strong>Epoche:</strong> ${item.age}</p>
          <p><strong>Stadtteil:</strong> ${item.resident}</p>
          <p><strong>Nutzung:</strong> ${item.profession}</p>
          <ul class="w3-ul w3-small">
            ${item.facts.map(f => `<li>${f}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
    wrap.appendChild(col);
  });
}

  koelnerdom();
  displaychurches();
