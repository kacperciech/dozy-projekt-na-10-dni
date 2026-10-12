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
function aktualizuj() {
    if (stan !== "gra") return; // poza grą nic się nie rusza

    // Grawitacja: prędkość rośnie, pozycja zmienia się o prędkość
    ptak.predkosc += GRAWITACJA;
    ptak.y += ptak.predkosc;

    // Nowa rura co jakiś czas
    licznikKlatek++;
    if (licznikKlatek % CO_ILE_KLATEK === 0) {
        // losowa wysokość górnej rury, żeby dziura była w różnych miejscach
        let gora = 50 + Math.random() * (canvas.height - PRZERWA - 100);
        rury.push({ x: canvas.width, gora: gora, zaliczona: false });
    }

    // Ruch rur
    for (let i = 0; i < rury.length; i++) {
        let r = rury[i];
        r.x -= PREDKOSC_RUR;

        // Kolizja ptaka z rurą
        let wZasiegu = ptak.x < r.x + SZEROKOSC_RURY && ptak.x + ptak.w > r.x;
        let uderzaGora = ptak.y < r.gora;
        let uderzaDol = ptak.y + ptak.h > r.gora + PRZERWA;
        if (wZasiegu && (uderzaGora || uderzaDol)) {
            koniecGry();
        }

        // Punkt za minięcie rury
        if (!r.zaliczona && r.x + SZEROKOSC_RURY < ptak.x) {
            r.zaliczona = true;
            punkty++;
        }
    }

    // Usuń rury, które wyleciały poza ekran
    rury = rury.filter(function (r) {
        return r.x + SZEROKOSC_RURY > 0;
    });

    // Kolizja z podłogą i sufitem
    if (ptak.y + ptak.h > canvas.height || ptak.y < 0) {
        koniecGry();
    }
}