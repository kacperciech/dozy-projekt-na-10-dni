// ---------- 1. PRZYGOTOWANIE ----------
const canvas = document.getElementById("gra");
const ctx = canvas.getContext("2d"); 


const GRAWITACJA = 0.50;       
const SKOK = -7;              
const SZEROKOSC_RURY = 60;
const PRZERWA = 150;         
const PREDKOSC_RUR = 2.5;     
const CO_ILE_KLATEK = 150;    

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
// ---------- 6. RYSOWANIE ----------
function napis(tekst, x, y, rozmiar) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.font = "bold " + rozmiar + "px Arial";
    ctx.textAlign = "center";
    ctx.strokeText(tekst, x, y); // czarny obrys
    ctx.fillText(tekst, x, y);   // biały środek
}

function rysuj() {
    // Wyczyść poprzednią klatkę
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Rury
    ctx.fillStyle = "green";
    for (let i = 0; i < rury.length; i++) {
        let r = rury[i];
        ctx.fillRect(r.x, 0, SZEROKOSC_RURY, r.gora); // górna
        ctx.fillRect(r.x, r.gora + PRZERWA, SZEROKOSC_RURY,
                     canvas.height - r.gora - PRZERWA); // dolna
    }

    // Ptak
    ctx.fillStyle = "yellow";
    ctx.fillRect(ptak.x, ptak.y, ptak.w, ptak.h);

    // Napisy zależne od stanu
    if (stan === "start") {
        napis("FLAPPY", canvas.width / 2, 200, 48);
        napis("Kliknij lub spacja", canvas.width / 2, 260, 24);
    } else if (stan === "gra") {
        napis(punkty, canvas.width / 2, 70, 48);
    } else if (stan === "koniec") {
        napis("KONIEC GRY", canvas.width / 2, 200, 40);
        napis("Punkty: " + punkty, canvas.width / 2, 260, 28);
        napis("Rekord: " + rekord, canvas.width / 2, 300, 28);
        napis("Kliknij, aby zagrać", canvas.width / 2, 360, 22);
    }
}
// ---------- 7. PĘTLA GRY ----------
function petla() {
    aktualizuj();
    rysuj();
    requestAnimationFrame(petla); // zaplanuj następną klatkę
}
petla();
//Dane hmur
let chmury = [];

function stworzChmury() {
    chmury = [];
    for (let i = 0; i < 5; i++) {
        chmury.push({
            x: Math.random() * canvas.width,
            y: 30 + Math.random() * 200,
            rozmiar: 0.6 + Math.random() * 0.8,   // 0.6 do 1.4
            predkosc: 0.2 + Math.random() * 0.3   // wolniejsze niż rury
        });
    }
}
stworzChmury();
// ruch chmur
for (let i = 0; i < chmury.length; i++) {
    chmury[i].x -= chmury[i].predkosc;
    if (chmury[i].x < -100) {
        chmury[i].x = canvas.width + 50;           // wraca z prawej
        chmury[i].y = 30 + Math.random() * 200;    // w nowej wysokości
    }
}
// rysowanie 1 chmury
function rysujChmure(x, y, s) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.beginPath();
    ctx.arc(x, y, 25 * s, 0, Math.PI * 2);
    ctx.arc(x + 25 * s, y - 10 * s, 30 * s, 0, Math.PI * 2);
    ctx.arc(x + 55 * s, y, 25 * s, 0, Math.PI * 2);
    ctx.arc(x + 25 * s, y + 8 * s, 25 * s, 0, Math.PI * 2);
    ctx.fill();
}
for (let i = 0; i < chmury.length; i++) {
    let c = chmury[i];
    rysujChmure(c.x, c.y, c.rozmiar);
}
//-------TRAWSKO--------
const WYSOKOSC_TRAWY = 60;
let przesuniecieTrawy = 0;
przesuniecieTrawy = (przesuniecieTrawy + PREDKOSC_RUR) % 24;
function rysujTrawe() {
    let y = canvas.height - WYSOKOSC_TRAWY;

    // ziemia
    ctx.fillStyle = "#8B5A2B";
    ctx.fillRect(0, y, canvas.width, WYSOKOSC_TRAWY);

    // pasek trawy na wierzchu
    ctx.fillStyle = "#5CBF2A";
    ctx.fillRect(0, y, canvas.width, 15);

    // ciemniejsza krawędź
    ctx.fillStyle = "#3E8E1C";
    ctx.fillRect(0, y + 12, canvas.width, 4);

    // ukośne paski, które jadą w lewo
    ctx.fillStyle = "#4CA71F";
    for (let x = -24; x < canvas.width + 24; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x - przesuniecieTrawy, y);
        ctx.lineTo(x - przesuniecieTrawy + 12, y);
        ctx.lineTo(x - przesuniecieTrawy + 4, y + 12);
        ctx.lineTo(x - przesuniecieTrawy - 8, y + 12);
        ctx.closePath();
        ctx.fill();
    }
}
// KOLIZJA PTAKA Z TRAWĄ
if (ptak.y + ptak.h > canvas.height - WYSOKOSC_TRAWY || ptak.y < 0) {
    koniecGry();
}
canvas.height - r.gora - PRZERWA - WYSOKOSC_TRAWY
let gora = 50 + Math.random() * (canvas.height - PRZERWA - WYSOKOSC_TRAWY - 100);
// gradient niebba
let niebo = ctx.createLinearGradient(0, 0, 0, canvas.height);
niebo.addColorStop(0, "#4EC0CA");   // góra: ciemniejszy błękit
niebo.addColorStop(1, "#C8F0F5");   // dół: jasny, przy horyzoncie
ctx.fillStyle = niebo;
ctx.fillRect(0, 0, canvas.width, canvas.height);