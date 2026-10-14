// ---------- 1. PRZYGOTOWANIE ----------
const canvas = document.getElementById("gra");
const ctx = canvas.getContext("2d");

const POLE = 20;                    // rozmiar jednego pola w pikselach
const SIATKA = canvas.width / POLE; // 400 / 20 = 20 pól w poziomie i pionie
const KROK_START = 140;             // co ile ms wąż robi ruch na początku
const KROK_MIN = 60;                // najszybciej, jak może się poruszać

// Zmienne gry
let waz, kierunek, nastepny, jedzenie;
let punkty = 0;
let rekord = 0;                     // rekord AKTUALNEGO gracza
let krok = KROK_START;
let stan = "start";                 // "start", "gra", "pauza", "koniec"
let ostatniKrok = 0;

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
function wczytajWyniki() {
    try {
        return JSON.parse(localStorage.getItem("wyniki_snake")) || {};
    } catch (e) {
        return {};
    }
}

function zapiszWynik() {
    let wyniki = wczytajWyniki();
    if (wyniki[nick] === undefined || punkty > wyniki[nick]) {
        wyniki[nick] = punkty;
        localStorage.setItem("wyniki_snake", JSON.stringify(wyniki));
    }
    rekord = wyniki[nick];
}

function odswiezTabele() {
    let lista = Object.entries(wczytajWyniki());
    lista.sort(function (a, b) {
        return b[1] - a[1];
    });
    lista = lista.slice(0, 10);

    tabelaEl.innerHTML = "";
    if (lista.length === 0) {
        tabelaEl.textContent = t("brak_wynikow");
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        let li = document.createElement("li");
        let imie = document.createElement("span");
        let pkt = document.createElement("span");

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
        loginBlad.textContent = t("blad_nick");
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

    rekord = wczytajWyniki()[nick] || 0;

    reset();
    stan = "start";
    odswiezTabele();
}

zalogujBtn.addEventListener("click", zaloguj);
wylogujBtn.addEventListener("click", wyloguj);
nickInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") zaloguj();
});

// ---------- 4. RESET GRY ----------
// Wąż to TABLICA pól. Pierwszy element (waz[0]) to głowa.
function reset() {
    waz = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    kierunek = { x: 1, y: 0 };  // ostatni wykonany ruch (w prawo)
    nastepny = { x: 1, y: 0 };  // kierunek, który wąż przyjmie w następnym kroku
    punkty = 0;
    krok = KROK_START;
    losujJedzenie();
}

// Losuje jedzenie tylko na polach, na których nie ma węża
function losujJedzenie() {
    let wolne = [];
    for (let x = 0; x < SIATKA; x++) {
        for (let y = 0; y < SIATKA; y++) {
            let zajete = waz.some(function (s) {
                return s.x === x && s.y === y;
            });
            if (!zajete) wolne.push({ x: x, y: y });
        }
    }
    jedzenie = wolne[Math.floor(Math.random() * wolne.length)];
}

reset();

// ---------- 5. STEROWANIE ----------
function ustawKierunek(dx, dy) {
    // zakaz zawrócenia o 180 stopni (wąż wjechałby sam w siebie)
    if (dx === -kierunek.x && dy === -kierunek.y) return;
    nastepny = { x: dx, y: dy };
}

// Spacja / klik: start, wznowienie po pauzie albo nowa gra po przegranej
function akcja() {
    if (nick === "") return;
    if (stan === "start" || stan === "pauza") {
        stan = "gra";
    } else if (stan === "koniec") {
        reset();
        stan = "start";
    }
}

const KLAWISZE = {
    ArrowUp: [0, -1],    KeyW: [0, -1],
    ArrowDown: [0, 1],   KeyS: [0, 1],
    ArrowLeft: [-1, 0],  KeyA: [-1, 0],
    ArrowRight: [1, 0],  KeyD: [1, 0]
};

document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT") return; // pisanie nicku
    if (nick === "") return;

    if (KLAWISZE[e.code]) {
        e.preventDefault(); // strzałki nie przewijają strony
        if (stan === "koniec") return;
        if (stan === "start" || stan === "pauza") stan = "gra";
        ustawKierunek(KLAWISZE[e.code][0], KLAWISZE[e.code][1]);
    } else if (e.code === "Space") {
        e.preventDefault();
        akcja();
    } else if (e.code === "KeyP") {
        if (stan === "gra") stan = "pauza";
        else if (stan === "pauza") stan = "gra";
    }
});

canvas.addEventListener("click", akcja);

// Telefon: przesunięcie palcem zmienia kierunek, samo stuknięcie = akcja
let dotykX = 0;
let dotykY = 0;

canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    dotykX = e.touches[0].clientX;
    dotykY = e.touches[0].clientY;
}, { passive: false });

canvas.addEventListener("touchend", function (e) {
    e.preventDefault();
    let dx = e.changedTouches[0].clientX - dotykX;
    let dy = e.changedTouches[0].clientY - dotykY;

    if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
        akcja();
        return;
    }
    if (stan === "koniec") return;
    if (stan === "start" || stan === "pauza") stan = "gra";

    if (Math.abs(dx) > Math.abs(dy)) {
        ustawKierunek(dx > 0 ? 1 : -1, 0);
    } else {
        ustawKierunek(0, dy > 0 ? 1 : -1);
    }
}, { passive: false });

// ---------- 6. KONIEC GRY ----------
function koniecGry() {
    stan = "koniec";
    zapiszWynik();
    odswiezTabele();
}

// ---------- 7. JEDEN KROK GRY (logika) ----------
function aktualizuj() {
    kierunek = nastepny;

    // nowa głowa = stara głowa przesunięta o kierunek
    let glowa = {
        x: waz[0].x + kierunek.x,
        y: waz[0].y + kierunek.y
    };

    // uderzenie w ścianę
    if (glowa.x < 0 || glowa.x >= SIATKA || glowa.y < 0 || glowa.y >= SIATKA) {
        koniecGry();
        return;
    }

    let zjada = jedzenie && glowa.x === jedzenie.x && glowa.y === jedzenie.y;

    // Uderzenie w siebie. Jeśli wąż nie rośnie, jego ogon zaraz zniknie,
    // więc ostatnie pole nie jest przeszkodą.
    let przeszkody = zjada ? waz : waz.slice(0, -1);
    for (let i = 0; i < przeszkody.length; i++) {
        if (przeszkody[i].x === glowa.x && przeszkody[i].y === glowa.y) {
            koniecGry();
            return;
        }
    }

    waz.unshift(glowa); // dodaj nową głowę z przodu

    if (zjada) {
        // wąż rośnie (nie usuwamy ogona), +1 punkt, gra przyspiesza
        punkty++;
        krok = Math.max(KROK_MIN, KROK_START - punkty * 3);

        if (waz.length === SIATKA * SIATKA) { // plansza cała zapełniona
            koniecGry();
            return;
        }
        losujJedzenie();
    } else {
        waz.pop(); // usuń ogon, wąż tylko się przesuwa
    }
}

// ---------- 8. RYSOWANIE ----------
function napis(tekst, x, y, rozmiar, wyrownanie) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.font = "bold " + rozmiar + "px Arial";
    ctx.textAlign = wyrownanie || "center";
    ctx.strokeText(tekst, x, y);
    ctx.fillText(tekst, x, y);
}

// prostokąt z zaokrąglonymi rogami
function zaokraglony(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function rysujPlansze() {
    for (let x = 0; x < SIATKA; x++) {
        for (let y = 0; y < SIATKA; y++) {
            ctx.fillStyle = (x + y) % 2 === 0 ? "#a7d948" : "#8ecc39";
            ctx.fillRect(x * POLE, y * POLE, POLE, POLE);
        }
    }
}

function rysujJedzenie() {
    if (!jedzenie) return;
    let cx = jedzenie.x * POLE + POLE / 2;
    let cy = jedzenie.y * POLE + POLE / 2 + 1;

    // jabłko
    ctx.fillStyle = "#e53935";
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fill();

    // połysk
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(cx - 2.5, cy - 2.5, 2, 0, Math.PI * 2);
    ctx.fill();

    // listek
    ctx.fillStyle = "#2e7d32";
    ctx.beginPath();
    ctx.ellipse(cx + 3, cy - 7, 3.5, 1.7, -0.5, 0, Math.PI * 2);
    ctx.fill();
}

function rysujWaza() {
    // od ogona do głowy, żeby głowa była na wierzchu
    for (let i = waz.length - 1; i >= 0; i--) {
        let s = waz[i];
        // głowa ciemniejsza, ogon jaśniejszy
        let jasnosc = 38 + (i / waz.length) * 22;
        ctx.fillStyle = "hsl(215, 70%, " + jasnosc + "%)";
        zaokraglony(s.x * POLE + 1, s.y * POLE + 1, POLE - 2, POLE - 2, 6);
        ctx.fill();
    }

    // oczy na głowie, zwrócone w stronę ruchu
    let g = waz[0];
    let cx = g.x * POLE + POLE / 2;
    let cy = g.y * POLE + POLE / 2;
    let px = -kierunek.y; // wektor prostopadły do kierunku
    let py = kierunek.x;

    for (let strona = -1; strona <= 1; strona += 2) {
        let ex = cx + kierunek.x * 3 + px * 4 * strona;
        let ey = cy + kierunek.y * 3 + py * 4 * strona;

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(ex + kierunek.x, ey + kierunek.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

function rysuj() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rysujPlansze();
    rysujJedzenie();
    rysujWaza();

    if (stan === "gra") {
        napis(t("wynik") + " " + punkty, 10, 28, 20, "left");
        return;
    }

    // ciemna nakładka, żeby napisy były czytelne
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (stan === "start") {
        napis("SNAKE", canvas.width / 2, 150, 48);
        napis(t("gracz") + " " + nick, canvas.width / 2, 200, 22);
        napis(t("snake_ster_canvas"), canvas.width / 2, 245, 22);
        napis(t("snake_start"), canvas.width / 2, 285, 20);
    } else if (stan === "pauza") {
        napis(t("pauza"), canvas.width / 2, 190, 48);
        napis(t("pauza_info"), canvas.width / 2, 235, 22);
    } else if (stan === "koniec") {
        napis(t("koniec_gry"), canvas.width / 2, 150, 40);
        napis(t("wynik") + " " + punkty, canvas.width / 2, 205, 28);
        napis(t("rekord") + " " + rekord, canvas.width / 2, 245, 28);
        napis(t("snake_ponownie"), canvas.width / 2, 300, 20);
    }
}

// ---------- 9. START PROGRAMU ----------
if (nick !== "") {
    pokazGre();
} else {
    nickInput.focus();
}

// Pętla: rysuje w każdej klatce, ale wąż rusza się tylko co "krok" milisekund
function petla(czas) {
    if (stan === "gra") {
        if (czas - ostatniKrok >= krok) {
            ostatniKrok = czas;
            aktualizuj();
        }
    } else {
        ostatniKrok = czas; // poza grą zerujemy licznik, żeby po wznowieniu nie skoczył
    }
    rysuj();
    requestAnimationFrame(petla);
}
requestAnimationFrame(petla);