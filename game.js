// ---------- 1. PRZYGOTOWANIE ----------
const canvas = document.getElementById("gra");
const ctx = canvas.getContext("2d"); 


const GRAWITACJA = 0.5;       
const SKOK = -8;              
const SZEROKOSC_RURY = 60;
const PRZERWA = 150;         
const PREDKOSC_RUR = 2.5;     
const CO_ILE_KLATEK = 90;    

// Zmienne gry
let ptak, rury, punkty, licznikKlatek;
let rekord = Number(localStorage.getItem("rekord")) || 0; 
let stan = "start"; 
//-------------2. RESTART GRY -------------
function reset() {
    ptak = { x: 80, y: 250, w: 34, h: 26, predkosc: 0 };
    rury = [];
    punkty = 0;
    licznikKlatek = 0;
}
reset();
function skok() {
    if (stan === "start") {
        stan = "gra";
        ptak.predkosc = SKOK;
    } else if (stan === "gra") {
        ptak.predkosc = SKOK;
    } else if (stan === "koniec") {
        reset();
        stan = "start";
    }
}

document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
        e.preventDefault(); // spacja nie przewija strony
        skok();
    }
});
canvas.addEventListener("click", skok);
canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    skok();
});
// ---------- 4. KONIEC GRY ----------
function koniecGry() {
    stan = "koniec";
    if (punkty > rekord) {
        rekord = punkty;
        localStorage.setItem("rekord", rekord);
    }
}