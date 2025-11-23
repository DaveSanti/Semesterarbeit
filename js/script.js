alert ("Willkommn auf unserer Webseite über Köln!");


const antwort = confirm("Möchten Sie mehr über Köln erfahren?");
if (antwort == true) {
    alert("Viel Spaß beim Lesen!");


} else {
    alert("Schade, vielleicht ein andermal!");
    location.href = "unterseiten/abgelehnt.html"
}
