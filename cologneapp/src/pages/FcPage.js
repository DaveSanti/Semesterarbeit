import React, { useState, useEffect } from "react";
import "../styles/Fc.css";
import hsvLogo from "../img/HamburgWappen.png";
import koelnLogo from "../img/KölnWappen.png";

//import der Bilder
import tor from "../img/Tor.png";
import ball from "../img/Fußball.png";
import TorwartMitte from "../img/Torwart.png";
import TorwartLinks from "../img/TorwartLinks.png";
import TorwartRechts from "../img/TorwartRechts.png";

//import der Sound Effekte
import goalSound from "../sounds/goalSound.wav";
import saveSound from "../sounds/saveSound.wav";
import shootSound from "../sounds/shootSound.wav";
import crowdCheer from "../sounds/crowdCheer.mp3";
import loseSound from "../sounds/loseSound.mp3"


//Infotext 
function Greetings() {
    return (
        <div className="greetings">
        <h1 className="Über">FC Köln</h1>
        <p>Der 1. FC Köln ist ein traditionsreicher Fußballverein aus Köln in Nordrhein-Westfalen und wurde im Jahr 1948 gegründet. Der Club trägt seine Heimspiele im RheinEnergieSTADION aus, das zu den größten und stimmungsvollsten Stadien Deutschlands gehört. Die Vereinsfarben sind Rot und Weiß.

        Der FC gehört zu den bekanntesten Vereinen im deutschen Fußball und spielte viele Jahre in der Bundesliga. Zu den größten Erfolgen des Vereins zählen mehrere deutsche Meisterschaften und der Gewinn des DFB-Pokals. Besonders bekannt ist der Verein auch für seine leidenschaftlichen Fans und die enge Verbindung zur Stadt Köln.

        Das Maskottchen des Vereins ist der Geißbock „Hennes“, der bei vielen Heimspielen im Stadion zu sehen ist und zu einem wichtigen Symbol des Clubs geworden ist. Der 1. FC Köln steht für Tradition, Leidenschaft und eine starke Fußballkultur am Rhein.</p>
        </div>
    )
};

const bundesligaTabelle = [
  { platz: 1, team: "Bayern München", spiele: 25, tore: "92:24", diff: "+68", punkte: 66 },
  { platz: 2, team: "Borussia Dortmund", spiele: 25, tore: "53:26", diff: "+27", punkte: 55 },
  { platz: 3, team: "TSG Hoffenheim", spiele: 25, tore: "53:33", diff: "+20", punkte: 49 },
  { platz: 4, team: "VfB Stuttgart", spiele: 25, tore: "50:34", diff: "+16", punkte: 47 },
  { platz: 5, team: "RB Leipzig", spiele: 25, tore: "48:34", diff: "+14", punkte: 47 },
  { platz: 6, team: "Bayer Leverkusen", spiele: 25, tore: "48:32", diff: "+16", punkte: 44 },
  { platz: 7, team: "Eintracht Frankfurt", spiele: 25, tore: "48:49", diff: "-1", punkte: 35 },
  { platz: 8, team: "SC Freiburg", spiele: 25, tore: "37:42", diff: "-5", punkte: 34 },
  { platz: 9, team: "FC Augsburg", spiele: 25, tore: "31:43", diff: "-12", punkte: 31 },
  { platz: 10, team: "Hamburger SV", spiele: 25, tore: "28:36", diff: "-8", punkte: 29 },
  { platz: 11, team: "Union Berlin", spiele: 25, tore: "30:42", diff: "-12", punkte: 28 },
  { platz: 12, team: "Borussia Mönchengladbach", spiele: 26, tore: "30:43", diff: "-13", punkte: 28 },
  { platz: 13, team: "Werder Bremen", spiele: 25, tore: "29:45", diff: "-16", punkte: 25 },
  { platz: 14, team: "1. FC Köln", spiele: 25, tore: "34:43", diff: "-9", punkte: 24 },
  { platz: 15, team: "Mainz 05", spiele: 25, tore: "29:41", diff: "-12", punkte: 24 },
  { platz: 16, team: "FC St. Pauli", spiele: 26, tore: "23:42", diff: "-19", punkte: 24 },
  { platz: 17, team: "VfL Wolfsburg", spiele: 25, tore: "34:55", diff: "-21", punkte: 20 },
  { platz: 18, team: "1. FC Heidenheim", spiele: 25, tore: "24:57", diff: "-33", punkte: 14 },
];


//Tabelle und css wurde von chatGpt erstellt
function Tabelle() {
  return (
    <section className="tabelleBox">
      <h1 className="tabelleTitel">Bundesliga Tabelle</h1>
      <p className="tabelleStand">Stand: März 2026</p>

      <div className="tabelleWrapper">
        <table className="bundesligaTabelle">
          <thead>
            <tr>
              <th>Platz</th>
              <th>Team</th>
              <th>Sp</th>
              <th>Tore</th>
              <th>Diff</th>
              <th>Punkte</th>
            </tr>
          </thead>

          <tbody>
            {bundesligaTabelle.map((club) => (
              <tr
                key={club.platz}
                className={club.team === "1. FC Köln" ? "koelnRow" : ""}
              >
                <td>{club.platz}</td>
                <td>{club.team}</td>
                <td>{club.spiele}</td>
                <td>{club.tore}</td>
                <td>{club.diff}</td>
                <td>{club.punkte}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

//nextMatchCard wurde ebenfalls von chatGpt erstellt da Fake data
function NextMatchCard() {
  const match = {
    competition: "BUNDESLIGA",
    matchday: "26. SPIELTAG",
    date: "Samstag, 14.03.2026",
    time: "18:30",
    stadium: "Volksparkstadion",
    homeTeam: {
      name: "Hamburger SV",
      shortName: "HSV",
      logo: hsvLogo,
    },
    awayTeam: {
      name: "1. FC Köln",
      shortName: "KOE",
      logo: koelnLogo,
    },
  };

  return (
    <section className="match-card-wrapper">
      <div className="match-card">
        <div className="match-card__top">
          <span className="badge">{match.competition}</span>
          <span className="matchday">{match.matchday}</span>
        </div>

        <div className="match-card__center">
          <div className="team">
            <div className="team-logo-box">
              <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="team-logo" />
            </div>
            <span className="team-name">{match.homeTeam.name}</span>
            
          </div>

          <div className="vs-block">
            <div className="date">{match.date}</div>
            <div className="time">{match.time}</div>
            <div className="vs">VS</div>
            <div className="stadium">{match.stadium}</div>
          </div>

          <div className="team">
            <div className="team-logo-box">
              <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="team-logo" />
            </div>
            <span className="team-name">{match.awayTeam.name}</span>
            
          </div>
        </div>
      </div>
    </section>
  );
}

//Vorschaukommentare 
const dummyComments = [
    {
        body: 'Köln ist das größte Team der Welt. 6-0 für die FC ist doch klar!!',
        comments: [],
    },
    {
        body: 'haha köln verliert doch eh',
        comments: [],
    },
    {
        body: 'ole ole ole oleeee',
        comments: [],
    }, 
];

//Kommentarsection
function CommentSection() {
    const [comments, setComments] = useState(dummyComments);
    
    const onComment = (newComment) => {
        const newCommentObj = {
            body: newComment.body,
            comments: newComment.comments,
        };
        setComments(prev => [newCommentObj, ...prev]);
    };

    const onDelete = (indexToDelete) => {
        setComments(prev => prev.filter((_, index) => index !== indexToDelete));
    };

    //comments werden gerenderd 
    return (
        <div className="CommentSection">
            <span className="CommentTitle">
                Wie denkst du wird das Spiel ausgehen?
            </span>

            <div className="CommentInputWrapper">
                <CommentInput onComment={onComment}/>
            </div>

            <div className="CommentList">
                {comments.map((comment, index) => (
                    <CommentItem
                        key={index}
                        comment={comment}
                        onDelete={() => onDelete(index)}
                    />
                ))}
            </div>
        </div>
    );
}

//Antworten auf Kommentare/ Nested look 
const CommentItem = ({ comment, onDelete }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [comments, setComments] = useState(comment.comments);
    
    const onComment = (newComment) => {
        setComments((prev) => [newComment, ...prev]);
    };

    const onDeleteReply = (indexToDelete) => {
        setComments(prev => prev.filter((_, index) => index !== indexToDelete));
    };

    return(
        <div className="Nested">

            <div className="CommentCard">
                <span className="CommentText">{comment.body}</span>
            </div>

            <div className="ButtonSpacing-Margin">
                {isReplying ? ( 
                    <button className="btn CancelBtn" onClick={() => setIsReplying(false)}>
                        Abbrechen
                    </button>
                ) : (
                    <button className="btn ReplyBtn" onClick={() => setIsReplying(true)}>
                        Antworten
                    </button>
                )}

                <button className="btn DeleteBtn" onClick={onDelete}>
                    Löschen
                </button>
            </div>

            {isReplying &&  
                <div className="ReplyInputWrapper">
                    <CommentInput onComment={onComment}/>
                </div>
            }

            <div className="gapFürAbstandZwischenKomments">
                {comments.map((comment, index) => (
                    <CommentItem
                        key={index}
                        comment={comment}
                        onDelete={() => onDeleteReply(index)}
                    />
                ))}
            </div>

        </div>
    );
};


//Für jeden neuen Comment wird ein neues Objekt erstellt 
const CommentInput = ({onComment}) => {
    const [commentBody, setCommentBody] = useState("");

    return(
        <div className="CommentInputContainer">

            <input 
                className="Kom"
                value={commentBody}
                onChange={(event) => setCommentBody(event.target.value)}
                placeholder=""
            />

            <button 
                className="btn"
                onClick={() => {
                    onComment({ body: commentBody, comments: [] }); 
                    setCommentBody("");
                }} 
            >
                Kommentieren
            </button> 
        </div>
    );
};

const directions = ["links", "mitte", "rechts"];

const kick = new Audio(shootSound);
const goal = new Audio(goalSound);
const save = new Audio(saveSound);
const crowd =new Audio(crowdCheer);
const lose = new Audio(loseSound);


//Elfmeterschießen 
function PenaltyShootout() {
  const [shots, setShots] = useState(0);
  const [goals, setGoals] = useState(0);
  const [keeperDirection, setKeeperDirection] = useState("mitte");
  const [ballDirection, setBallDirection] = useState(null);
  const [message, setMessage] = useState("Wähle eine Ecke");
  const [finalResult, setFinalResult] = useState("");
    
  function shoot(direction) {
  if (shots >= 5) return;

  kick.play();

  //Torwart springt random 
  const keeperRandom = directions[Math.floor(Math.random() * 3)];

  setBallDirection(direction);
  setKeeperDirection(keeperRandom);

  let scored = false;

  //schuss logik
  if (direction === keeperRandom) {
    setMessage("GEHALTEN!");
    save.play();
  } else {
    setMessage("TOR!");
    scored = true;
    goal.play();
    setGoals((prev) => prev + 1);
  }

  const newShots = shots + 1;
  const newGoals = scored ? goals + 1 : goals;
 

  setShots(newShots);

  setTimeout(() => {
    setBallDirection(null);
    setKeeperDirection("mitte");

    //Endergebnis
    if (newShots < 5) {
      setMessage("Wähle eine Ecke");
    } else {
      if (newGoals >= 3) {
        setFinalResult("GEWONNEN!");
        crowd.play();
      } else {
        setFinalResult("VERLOREN!");
        lose.play();
      }
    }
  }, 1200);
}

function resetGame() {
  setShots(0);
  setGoals(0);
  setBallDirection(null);
  setKeeperDirection("mitte");
  setMessage("Wähle eine Ecke");
  setFinalResult("");
}
  let keeperImage = TorwartMitte;

  if (keeperDirection === "rechts") {
    keeperImage = TorwartRechts;
  }

  if (keeperDirection === "links") {
    keeperImage = TorwartLinks;
  }

  return (
  <div className="gameContainer">
    <div className="wannaWin">
      <p>Kannst du den FC zum Sieg schießen?</p>
    </div>

    <div className="score">
      <span>Tore: {goals}</span>
      <span>Schüsse: {shots} / 5</span>
    </div>

    <div
      className="field"
      style={{ backgroundImage: `url(${tor})` }}
    >
      <img
        src={keeperImage}
        className={`keeper keeper-${keeperDirection}`}
        alt="keeper"
      />

      <img
        src={ball}
        className={`ball ${ballDirection ? `ball-${ballDirection}` : ""}`}
        alt="ball"
      />

      {shots === 5 && (
        <div className={`finalOverlay ${finalResult === "GEWONNEN!" ? "win" : "lose"}`}>
          <div className={finalResult === "GEWONNEN!" ? "blinkText" : ""}>
            {finalResult}
          </div>
        </div>
      )}
    </div>

    <div className="message">
      {message}
    </div>

    {shots < 5 ? (
      <div className="controls">
        <button onClick={() => shoot("links")}>Links</button>
        <button onClick={() => shoot("mitte")}>Mitte</button>
        <button onClick={() => shoot("rechts")}>Rechts</button>
      </div>
    ) : (
      <button className="resetBtn" onClick={resetGame}>
        Nochmal spielen
      </button>
    )}
  </div>
);
}


export default function FC() {
  return (
    <main className="FcPage">
      <div className="FcContainer">
        <Greetings />
        <Tabelle />
        <NextMatchCard  />
        <CommentSection />
        <PenaltyShootout />
      </div>
    </main>
  );
};
