console.log('Sportvereine.js loaded');

// parse the markdown dump into a simple array of club objects
function parseClubs(md) {
  // split by double newlines (blank lines) to separate clubs
  const blocks = md.split(/\n\s*\n+/);
  const clubs = [];

  blocks.forEach(block => {
    const lines = block.split(/\r?\n/).map(l => l.trim()).filter(l => l);
    if (lines.length === 0) return;

    // first non-blank line is the club name; remove "1. " prefix if present
    let name = lines[0].replace(/^1\.\s*/, '');
    
    // all remaining lines are details
    const details = lines.slice(1);

    clubs.push({ name, details });
  });

  return clubs;
}

// build the <ul> from club data
function buildClubList(clubs) {
  const ul = document.getElementById('clubList');
  clubs.forEach(c => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = 'SportvereineIndex.html';
    a.className = 'w3-bar-item w3-button';
    a.textContent = c.name;
    a.dataset.sport = c.details[0] || '';
    a.dataset.info = c.details.join(' | ');
    li.appendChild(a);
    ul.appendChild(li);
  });
}

// load the clubs file and populate the list when the page is ready
function loadClubs() {
  // if inline markdown is present, use that (allows file:// browsing)
  const inline = document.getElementById('clubMd');
  if (inline) {
    const md = inline.textContent || '';
    const clubs = parseClubs(md);
    buildClubList(clubs);
    filterBySport(''); // show all
    return;
  }

  fetch('data/Sportvereine.docx.md')
    .then(r => {
      if (!r.ok) throw new Error(r.statusText);
      return r.text();
    })
    .then(md => {
      const clubs = parseClubs(md);
      buildClubList(clubs);
      filterBySport(''); // show all
    })
    .catch(err => {
      console.error('failed to load clubs', err);
      const area = document.getElementById('detailArea');
      if (area) {
        area.textContent = 'Fehler beim Laden der Clubliste – Seite bitte über HTTP aufrufen oder Daten inline einfügen.';
      }
    });
}

document.addEventListener('DOMContentLoaded', loadClubs);

const sports = [
  'Alle Sportarten', 'Aerobic', 'Aikido', 'Althina', 'American Football', 'Angeln',
  'Aqua Fitness', 'Aqua-Jogging', 'Australian Football', 'BMX', 'Badminton',
  'Baseball', 'Basketball', 'Beachbasketball', 'Beachhandball', 'Beachsoccer', 
  'Beachvolleyball', 'Behindertensport', 'Betriebssport', 'Biathlon', 'Billard', 
  'Bogenschießen', 'Bouldern', 'Boule', 'Boxen', 'Capoeira', 'Cheerleading', 'Cricket',
  'Dart', 'Einrad', 'Eishockey', 'Eiskunstlauf', 'Eisschnelllauf', 'Eltern-Kind-Sport', 
  'Faustball', 'Fechten', 'Fitness', 'Flag Football', 'Floorball', 'Flugsport', 'Footvolley', 
  'Functional Fitness', 'Futmesa', 'Futsal', 'Fußball', 'Gaelic Football', 'Gesundheitssport', 'Golf', 
  'Gymnastik', 'Handball', 'Herzsport', 'Hockey', 'Hurling', 'Indiaca', 'Indoor Cycling', 'Inline Skaten', 'Inline-Skaterhockey', 
  'Jiu-Jitsu', 'Joggen', 'Ju-Jutsu', 'Judo', 'Kampfsport', 'Kanu', 'Karate', 'Karate(Shotokan)', 'Kegeln', 'Kendo', 
  'Kickboxen', 'Kicker', 'Kinderschwimmen', 'Kindersport', 'Klettern', 'Konditionstraining', 'Korfball', 'Kraftsport', 'Kung Fu', 'Kunstradfahren', 'Kunstturnen', 
  'Lacrosse', 'Laufen', 'Leichtathletik', 'Minigolf', 'Motorsport', 'Mountainbike', 'Muay Thai', 'Netball', 'Nordic-Walking', 'Outdoorsport', 'Parkour', 
  'Pickleball', 'Pilates', 'Prellball', 'Qi Gong', 'Quidditch', 'Radball', 'Radfahren', 'Radsport', 'Radtouristik', 
  'Rehasport', 'Reiten', 'Rythmische Sportgymnastik', 'Ringen', 'Rollstuhlsport', 'Roundnet', 'Rudern', 'Rugby', 'Schach',
  'Schießsport', 'Schwimmen', 'Segelfliegen', 'Segeln', 'Selbstverteidigung', 'Seniorensport', 'Skateboard', 'Skifahren', 'Skifitness', 'Skiken',
  'Slackline', 'Snowboardfahren', 'Softball', 'Sqaure Dance', 'Squash', 'Surfen', 'Synchronschwimmen', 'TaeKwonDo', 'TaiChi', 'Tandemradsport',
  'Tanzen', 'Tauchen', 'Tennis', 'Thai-Boxen', 'Tischtennis', 'Trampolinturnen', 'Triathlon', 'Turmspringen', 'Turnen', 'Ultimate Frisbee', 'Unterwasserrugby',
  'Volleyball', 'Voltigieren', 'Walking', 'Wandern', 'Wasserball', 'Wassergymnastik', 'Wintersport', 'Yoga', 'Zumba'
];

// Generate sport dropdown items
const sportDropdown = document.getElementById('sportDropdown');
sports.forEach(sport => {
  const link = document.createElement('a');
  link.href = 'index.html';
  link.className = 'w3-bar-item w3-button';
  link.value = sport;
  link.textContent = sport;
  sportDropdown.appendChild(link);
});

// call filterBySport('Fußball') to show only Fußball clubs
function filterBySport(sport) {
  const links = document.querySelectorAll('ul li a.w3-bar-item.w3-button');
  links.forEach(a => {
    const itemSport = a.getAttribute('data-sport') || a.getAttribute('value') || '';
    const li = a.closest('li');
    if (!li) return;

    const match = sport === 'Alle Sportarten' ||
              sport === '' ||
              itemSport.split(',').map(s=>s.trim()).includes(sport);
              li.style.display = match ? '' : 'none';
  });
}

// wire dropdown choices to filtering (works with your <a value="..."> items)
document.querySelectorAll('.w3-dropdown-content .w3-bar-item').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const chosen = link.getAttribute('value') || link.textContent.trim();
    filterBySport(chosen);
  });
});

// clicking a club shows its full details in the detail area
const clubList = document.getElementById('clubList');
if (clubList) {
  clubList.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      const info = e.target.dataset.info || '';
      const area = document.getElementById('detailArea');
      if (area) area.textContent = info;
    }
  });
}
let map;
let infoWindow;

async function init() {
  const {InfoWindow} = await google.maps.importLibrary("maps");

  map = document.querySelector('gmp-map').innerMap;
  infoWindow = new InfoWindow({pixelOffset: {height: -37}});

  const script = document.createElement("script");
  script.src = "https://storage.googleapis.com/mapsdevsite/json/quakes.geo.json";
  document.head.appendChild(script);
}

function showQuakeInfo(position, feature) {
  const content = `
    <div style="padding: 8px">
      <h2 style="margin-top: 0">${feature.getProperty('place')}</h2>
      <h3>Magnitude ${feature.getProperty('mag')}</h3>
      <p>${new Date(feature.getProperty('time'))}</p>
      <a href="${feature.getProperty('url')}" target="new">View on USGS</a>
    </div>
  `;

  infoWindow.setOptions({content, position});
  infoWindow.open({map, shouldFocus: false});
}

// Defines the callback function referenced in the jsonp file.
window.eqfeed_callback = (data) => {
  map.data.addGeoJson(data);
  map.data.setStyle((feature) => ({
    title: feature.getProperty('place')
  }));
  map.data.addListener('click', (e) => showQuakeInfo(e.latLng, e.feature));
}