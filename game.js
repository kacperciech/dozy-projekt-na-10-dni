// ---------- 1. PRZYGOTOWANIE ----------
const canvas = document.getElementById("gra");
const ctx = canvas.getContext("2d");

const GRAWITACJA = 0.25;
const SKOK = -4.6;
const SZEROKOSC_RURY = 67;
const PRZERWA = 150;
const PREDKOSC_RUR = 2;
const CO_ILE_KLATEK = 150;
const WYSOKOSC_TRAWY = 60;

// Zmienne gry
let ptak, rury, punkty, licznikKlatek;
let rekord = 0;      // rekord AKTUALNEGO gracza
let stan = "start";  // "start", "gra", "koniec"
let chmury = [];
let przesuniecieTrawy = 0;

// Elementy strony (logowanie i tabela)
const loginEkran = document.getElementById("login-ekran");
const graKontener = document.getElementById("gra-kontener");
const nickInput = document.getElementById("nick-input");
const zalogujBtn = document.getElementById("zaloguj-btn");
const wylogujBtn = document.getElementById("wyloguj-btn");
const loginBlad = document.getElementById("login-blad");
const nickWyswietl = document.getElementById("nick-wyswietl");
const tabelaEl = document.getElementById("tabela");

// Aktualny gracz (pusty tekst = nikt nie jest zalogowany)
let nick = localStorage.getItem("nick") || "";

// ---------- 2. WYNIKI (localStorage) ----------
// Wyniki trzymamy jako obiekt: { "Ania": 12, "Kuba": 7 }
// czyli jeden najlepszy wynik na gracza.
function wczytajWyniki() {
    try {
        return JSON.parse(localStorage.getItem("wyniki")) || {};
    } catch (e) {
        return {}; // jeśli dane są uszkodzone, zaczynamy od pustych
    }
}

function zapiszWynik() {
    let wyniki = wczytajWyniki();
    // zapisz, jeśli gracza jeszcze nie ma albo pobił swój rekord
    if (wyniki[nick] === undefined || punkty > wyniki[nick]) {
        wyniki[nick] = punkty;
        localStorage.setItem("wyniki", JSON.stringify(wyniki));
    }
    rekord = wyniki[nick];
}

function odswiezTabele() {
    let wyniki = wczytajWyniki();

    // zamień obiekt na tablicę par [nick, punkty] i posortuj malejąco
    let lista = Object.entries(wyniki);
    lista.sort(function (a, b) {
        return b[1] - a[1];
    });
    lista = lista.slice(0, 10); // tylko TOP 10

    tabelaEl.innerHTML = "";
    if (lista.length === 0) {
        tabelaEl.textContent = "Brak wyników. Zagraj pierwszy!";
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        let li = document.createElement("li");
        let imie = document.createElement("span");
        let pkt = document.createElement("span");

        // textContent (a nie innerHTML), żeby nick nie mógł wstrzyknąć kodu
        imie.textContent = lista[i][0];
        pkt.textContent = lista[i][1];
        pkt.className = "pkt";

        if (lista[i][0] === nick) li.className = "ja";

        li.appendChild(imie);
        li.appendChild(pkt);
        tabelaEl.appendChild(li);
    }
}

// ---------- 3. LOGOWANIE ----------
function zaloguj() {
    let wpisany = nickInput.value.trim();

    if (wpisany.length < 2) {
        loginBlad.textContent = "Nick musi mieć co najmniej 2 znaki.";
        return;
    }

    nick = wpisany;
    localStorage.setItem("nick", nick);
    loginBlad.textContent = "";
    pokazGre();
    document.activeElement.blur(); // żeby spacja nie "klikała" przycisku
}

function wyloguj() {
    nick = "";
    localStorage.removeItem("nick");
    nickInput.value = "";
    loginEkran.classList.remove("hidden");
    graKontener.classList.add("hidden");
    document.activeElement.blur();
    nickInput.focus();
}

function pokazGre() {
    loginEkran.classList.add("hidden");
    graKontener.classList.remove("hidden");
    nickWyswietl.textContent = nick;

    let wyniki = wczytajWyniki();
    rekord = wyniki[nick] || 0; // wczytaj rekord tego gracza

    reset();
    stan = "start";
    odswiezTabele();
}

zalogujBtn.addEventListener("click", zaloguj);
wylogujBtn.addEventListener("click", wyloguj);
nickInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") zaloguj();
});

// ---------- 4. CHMURY: tworzenie ----------
function stworzChmury() {
    chmury = [];
    for (let i = 0; i < 5; i++) {
        chmury.push({
            x: Math.random() * canvas.width,
            y: 30 + Math.random() * 200,
            rozmiar: 0.6 + Math.random() * 0.8,
            predkosc: 0.2 + Math.random() * 0.3
        });
    }
}

// ---------- 5. RESET GRY ----------
function reset() {
    ptak = { x: 80, y: 250, w: 34, h: 26, predkosc: 0 };
    rury = [];
    punkty = 0;
    licznikKlatek = 0;
}

reset();
stworzChmury();

// ---------- 6. STEROWANIE ----------
function skok() {
    if (nick === "") return; // bez logowania nie da się grać

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
        // jeśli gracz pisze nick, spacja ma działać normalnie
        if (e.target.tagName === "INPUT") return;
        e.preventDefault();
        skok();
    }
});
canvas.addEventListener("click", skok);
canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    skok();
});

// ---------- 7. KONIEC GRY ----------
function koniecGry() {
    stan = "koniec";
    zapiszWynik();
    odswiezTabele();
}

// ---------- 8. AKTUALIZACJA (logika) ----------
function aktualizuj() {
    // Chmury płyną zawsze
    for (let i = 0; i < chmury.length; i++) {
        chmury[i].x -= chmury[i].predkosc;
        if (chmury[i].x < -100) {
            chmury[i].x = canvas.width + 50;
            chmury[i].y = 30 + Math.random() * 200;
        }
    }

    if (stan !== "gra") return;

    // Trawa jedzie razem z rurami
    przesuniecieTrawy = (przesuniecieTrawy + PREDKOSC_RUR) % 24;

    // Grawitacja
    ptak.predkosc += GRAWITACJA;
    ptak.y += ptak.predkosc;

    // Nowa rura co jakiś czas
    licznikKlatek++;
    if (licznikKlatek % CO_ILE_KLATEK === 0) {
        let gora = 50 + Math.random() * (canvas.height - PRZERWA - WYSOKOSC_TRAWY - 100);
        rury.push({ x: canvas.width, gora: gora, zaliczona: false });
    }

    // Ruch rur, kolizje, punkty
    for (let i = 0; i < rury.length; i++) {
        let r = rury[i];
        r.x -= PREDKOSC_RUR;

        let wZasiegu = ptak.x < r.x + SZEROKOSC_RURY && ptak.x + ptak.w > r.x;
        let uderzaGora = ptak.y < r.gora;
        let uderzaDol = ptak.y + ptak.h > r.gora + PRZERWA;
        if (wZasiegu && (uderzaGora || uderzaDol)) {
            koniecGry();
        }

        if (!r.zaliczona && r.x + SZEROKOSC_RURY < ptak.x) {
            r.zaliczona = true;
            punkty++;
        }
    }

    // Usuń rury poza ekranem
    rury = rury.filter(function (r) {
        return r.x + SZEROKOSC_RURY > 0;
    });

    // Kolizja z trawą i sufitem
    if (ptak.y + ptak.h > canvas.height - WYSOKOSC_TRAWY || ptak.y < 0) {
        koniecGry();
    }
}

// ---------- 9. RYSOWANIE ----------
function napis(tekst, x, y, rozmiar) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.font = "bold " + rozmiar + "px Arial";
    ctx.textAlign = "center";
    ctx.strokeText(tekst, x, y);
    ctx.fillText(tekst, x, y);
}

function rysujNiebo() {
    let niebo = ctx.createLinearGradient(0, 0, 0, canvas.height);
    niebo.addColorStop(0, "#4EC0CA");
    niebo.addColorStop(1, "#C8F0F5");
    ctx.fillStyle = niebo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function rysujChmure(x, y, s) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.beginPath();
    ctx.arc(x, y, 25 * s, 0, Math.PI * 2);
    ctx.arc(x + 25 * s, y - 10 * s, 30 * s, 0, Math.PI * 2);
    ctx.arc(x + 55 * s, y, 25 * s, 0, Math.PI * 2);
    ctx.arc(x + 25 * s, y + 8 * s, 25 * s, 0, Math.PI * 2);
    ctx.fill();
}

function rysujTrawe() {
    let y = canvas.height - WYSOKOSC_TRAWY;

    ctx.fillStyle = "#8B5A2B";
    ctx.fillRect(0, y, canvas.width, WYSOKOSC_TRAWY);

    ctx.fillStyle = "#5CBF2A";
    ctx.fillRect(0, y, canvas.width, 15);

    ctx.fillStyle = "#3E8E1C";
    ctx.fillRect(0, y + 12, canvas.width, 4);

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

function rysuj() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rysujNiebo();

    for (let i = 0; i < chmury.length; i++) {
        let c = chmury[i];
        rysujChmure(c.x, c.y, c.rozmiar);
    }

    ctx.fillStyle = "green";
    for (let i = 0; i < rury.length; i++) {
        let r = rury[i];
        ctx.fillRect(r.x, 0, SZEROKOSC_RURY, r.gora);
        ctx.fillRect(r.x, r.gora + PRZERWA, SZEROKOSC_RURY,
                     canvas.height - r.gora - PRZERWA - WYSOKOSC_TRAWY);
    }

    rysujTrawe();

    ctx.fillStyle = "yellow";
    ctx.fillRect(ptak.x, ptak.y, ptak.w, ptak.h);

    if (stan === "start") {
        napis("FLAPPY", canvas.width / 2, 200, 48);
        napis("Gracz: " + nick, canvas.width / 2, 250, 22);
        napis("Kliknij lub spacja", canvas.width / 2, 290, 24);
    } else if (stan === "gra") {
        napis(punkty, canvas.width / 2, 70, 48);
    } else if (stan === "koniec") {
        napis("KONIEC GRY", canvas.width / 2, 200, 40);
        napis("Punkty: " + punkty, canvas.width / 2, 260, 28);
        napis("Rekord: " + rekord, canvas.width / 2, 300, 28);
        napis("Kliknij, aby zagrać", canvas.width / 2, 360, 22);
    }
}

// ---------- 10. START PROGRAMU ----------
// Jeśli gracz był już zalogowany (nick zapisany), od razu pokaż grę
if (nick !== "") {
    pokazGre();
} else {
    nickInput.focus();
}

// Pętla gry zawsze na samym końcu
function petla() {
    aktualizuj();
    rysuj();
    requestAnimationFrame(petla);
}
petla();