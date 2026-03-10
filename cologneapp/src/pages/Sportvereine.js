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

function buildClubList(clubs) {
  const ul = document.getElementById('clubList');
  const districtList = ['Kalk','Nippes','Chorweiler','Rodenkirchen','Ehrenfeld','Lindenthal','Mülheim','Porz','Innenstadt'];
  function guessDistrict(details) {
    const text = details.join(' ').toLowerCase();
    for (const d of districtList) {
      if (text.includes(d.toLowerCase())) {
        return d;
      }
    }
    return '';
  }

  clubs.forEach(c => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = 'src/pages/SportvereineIndex.html';
    a.className = 'w3-bar-item w3-button';
    a.textContent = c.name;
    a.dataset.sport = c.details[0] || '';
    // compute bezirk from details if possible
    a.dataset.bezirk = guessDistrict(c.details) || '';
    a.dataset.info = c.details.join(' | ');
    li.appendChild(a);
    ul.appendChild(li);
  });
}

function loadClubs() {
  const inline = document.getElementById('clubMd');
  if (inline) {
    const md = inline.textContent || '';
    const clubs = parseClubs(md);
    buildClubList(clubs);
    selectedSport = '';
    selectedBezirk = '';
    filterClubs(); 
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
      selectedSport = '';
      selectedBezirk = '';
      filterClubs(); 
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

const sportDropdown = document.getElementById('sportDropdown');
sports.forEach(sport => {
  const link = document.createElement('a');
  link.href = 'index.html';
  link.className = 'w3-bar-item w3-button';
  link.value = sport;
  link.textContent = sport;
  sportDropdown.appendChild(link);
});

// districts list and dropdown population
const bezirke = ['Alle Bezirke','Chorweiler','Ehrenfeld','Innenstadt' ,'Kalk','Lindenthal','Mülheim','Nippes','Porz','Rodenkirchen'];
const bezirkDropdown = document.getElementById('bezirkDropdown');
bezirke.forEach(bz => {
  const link = document.createElement('a');
  link.href = 'index.html';
  link.className = 'w3-bar-item w3-button';
  link.value = bz;
  link.textContent = bz;
  bezirkDropdown.appendChild(link);
});

// current selections
let selectedSport = '';
let selectedBezirk = '';

function filterClubs() {
  const links = document.querySelectorAll('ul li a.w3-bar-item.w3-button');
  links.forEach(a => {
    const itemSport = a.dataset.sport || '';
    const itemBezirk = a.dataset.bezirk || '';
    const li = a.closest('li');
    if (!li) return;

    const sportMatch = selectedSport === '' || selectedSport === 'Alle Sportarten' ||
              itemSport.split(',').map(s=>s.trim()).includes(selectedSport);
    const bezirkMatch = selectedBezirk === '' || selectedBezirk === 'Alle Bezirke' ||
              itemBezirk === selectedBezirk;
    li.style.display = (sportMatch && bezirkMatch) ? '' : 'none';
  });
}

// attach click handlers separately for sport and bezirk menus
const sportLinks = document.querySelectorAll('#sportDropdown .w3-bar-item');
sportLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const chosen = link.getAttribute('value') || link.textContent.trim();
    selectedSport = chosen;
    // update label button text
    const btn = document.getElementById('sportButton');
    if (btn) btn.textContent = chosen;
    filterClubs();
  });
});

const bezirkLinks = document.querySelectorAll('#bezirkDropdown .w3-bar-item');
bezirkLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const chosen = link.getAttribute('value') || link.textContent.trim();
    selectedBezirk = chosen;
    const btn = document.getElementById('bezirkButton');
    if (btn) btn.textContent = chosen;
    filterClubs();
  });
});

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