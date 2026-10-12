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