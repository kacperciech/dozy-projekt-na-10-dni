// ---------- 1. PRZYGOTOWANIE ----------
const canvas = document.getElementById("gra");
const ctx = canvas.getContext("2d");

const POLE = 20;                    // Rozmiar pojedynczego pola w pikselach
const SIATKA = canvas.width / POLE; // Liczba pól w poziomie i pionie (20x20)
const KROK_START = 140;             // Czas w ms między ruchami węża na starcie
const KROK_MIN = 60;                // Minimalny czas (maksymalna prędkość węża)

// Zmienne gry
let waz, kierunek, nastepny, jedzenie;
let punkty = 0;
let rekord = 0;
let krok = KROK_START;
let stan = "start";                 // Stan gry: "start", "gra", "pauza", "koniec"
let akumulatorRuchu = 0;

const loginEkran = document.getElementById("login-ekran");
const graKontener = document.getElementById("gra-kontener");
const nickInput = document.getElementById("nick-input");
const zalogujBtn = document.getElementById("zaloguj-btn");
const wylogujBtn = document.getElementById("wyloguj-btn");
const loginBlad = document.getElementById("login-blad");
const nickWyswietl = document.getElementById("nick-wyswietl");
const tabelaEle = document.getElementById("tabela");
const pauzaBtn = document.getElementById("snake-pauza-btn");

// Przywraca nick zapamiętany wcześniej na stronie głównej.
let nick = localStorage.getItem("nick") || "";

// ---------- 2. WYNIKI (localStorage) ----------
// Wczytuje wyniki Snake'a; przy nieprawidłowym zapisie zwraca pusty ranking.
function wczytajWyniki() {
    try {
        return JSON.parse(localStorage.getItem("wyniki_snake")) || {};
    } catch (e) {
        return {};
    }
}

function zapiszWynik() {
    let wyniki = wczytajWyniki();
    // W Snake'u większa liczba zjedzonych jabłek oznacza lepszy wynik.
    if (wyniki[nick] === undefined || punkty > wyniki[nick]) {
        wyniki[nick] = punkty;
        localStorage.setItem("wyniki_snake", JSON.stringify(wyniki));
    }
    rekord = wyniki[nick];
}

// Sortuje i wyświetla najlepsze wyniki, wyróżniając aktualnego gracza.
function odswiezTabele() {
    let lista = Object.entries(wczytajWyniki());
    lista.sort(function (a, b) { return b[1] - a[1]; });
    lista = lista.slice(0, 10);

    tabelaEle.innerHTML = "";
    if (lista.length === 0) {
        tabelaEle.textContent = t("brak_wynikow");
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
        tabelaEle.appendChild(li);
    }
}

// ---------- 3. LOGOWANIE ----------
// Sprawdza nick i uruchamia rozgrywkę dla poprawnie zalogowanego gracza.
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
    document.activeElement.blur();
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

// Pokazuje planszę, przygotowuje nową rundę i aktualizuje ranking.
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

// ---------- 4. RESET GRY I LOSOWANIE JEDZENIA ----------
// Wąż reprezentowany jest jako tablica współrzędnych segmentów (waz[0] to głowa)
function reset() {
    waz = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    kierunek = { x: 1, y: 0 };
    nastepny = { x: 1, y: 0 };
    punkty = 0;
    krok = KROK_START;
    akumulatorRuchu = 0;
    losujJedzenie();
}

// Losuje pozycję jedzenia w miejscach wolnych od ciała węża
function losujJedzenie() {
    // Najpierw zbieramy wolne pola, aby jedzenie nigdy nie pojawiło się na wężu.
    let wolne = [];
    for (let x = 0; x < SIATKA; x++) {
        for (let y = 0; y < SIATKA; y++) {
            let zajete = waz.some(function (s) { return s.x === x && s.y === y; });
            if (!zajete) wolne.push({ x: x, y: y });
        }
    }
    jedzenie = wolne[Math.floor(Math.random() * wolne.length)];
}

reset();

// ---------- 5. STEROWANIE ----------
// Zmienia kierunek ruchu i nie pozwala odwrócić się bezpośrednio do tyłu.
function ustawKierunek(dx, dy) {
    // Blokada nagłego zawrócenia o 180 stopni w przeciwnym kierunku
    if (dx === -kierunek.x && dy === -kierunek.y) return;
    nastepny = { x: dx, y: dy };
}

function akcja() {
    if (nick === "") return;
    dzwiekGier.odblokuj();
    // Ta sama akcja rozpoczyna grę, wznawia pauzę albo przygotowuje nową rundę.
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
    // Nie przechwytujemy klawiszy, gdy gracz wpisuje nick w polu tekstowym.
    if (e.target.tagName === "INPUT") return;
    if (nick === "") return;

    if (KLAWISZE[e.code]) {
        e.preventDefault();
        dzwiekGier.odblokuj();
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

canvas.addEventListener("click", function () {
    dzwiekGier.odblokuj();
    akcja();
});

// Obsługa gestów na ekranach dotykowych; krótkie stuknięcie działa jak klik.
let poczatekDotyku = null;

canvas.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) {
        poczatekDotyku = null;
        return;
    }

    poczatekDotyku = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
    };
    dzwiekGier.odblokuj();
    e.preventDefault();
}, { passive: false });

canvas.addEventListener("touchend", function (e) {
    if (!poczatekDotyku) return;
    e.preventDefault();

    let dx = e.changedTouches[0].clientX - poczatekDotyku.x;
    let dy = e.changedTouches[0].clientY - poczatekDotyku.y;
    poczatekDotyku = null;

    if (Math.max(Math.abs(dx), Math.abs(dy)) < 18) {
        akcja();
        return;
    }
    if (nick === "" || stan === "koniec") return;

    if (stan === "start" || stan === "pauza") stan = "gra";
    if (Math.abs(dx) > Math.abs(dy)) {
        ustawKierunek(dx > 0 ? 1 : -1, 0);
    } else {
        ustawKierunek(0, dy > 0 ? 1 : -1);
    }
}, { passive: false });

canvas.addEventListener("touchcancel", function () {
    poczatekDotyku = null;
});

// Przyciski dotykowe korzystają z tej samej blokady zawracania co klawiatura i gesty.
document.querySelectorAll("[data-kierunek]").forEach(function (przycisk) {
    przycisk.addEventListener("click", function () {
        const ruch = KLAWISZE[przycisk.dataset.kierunek];
        if (nick === "" || stan === "koniec" || !ruch) return;
        dzwiekGier.odblokuj();
        if (stan === "start" || stan === "pauza") stan = "gra";
        ustawKierunek(ruch[0], ruch[1]);
    });
});

pauzaBtn.addEventListener("click", function () {
    if (stan === "gra") {
        stan = "pauza";
        akumulatorRuchu = 0;
    } else if (stan === "pauza") {
        stan = "gra";
    }
    rysuj();
});

// ---------- 6. KONIEC GRY ----------
// Kończy rundę, zapisuje wynik i odświeża tabelę rekordów.
function koniecGry() {
    stan = "koniec";
    zapiszWynik();
    odswiezTabele();
}

// ---------- 7. AKTUALIZACJA (Logika kroku węża) ----------
// Przesuwa węża, sprawdza kolizje, obsługuje jedzenie i zwiększa trudność.
function aktualizuj() {
    kierunek = nastepny;

    // Wąż porusza się po siatce całymi polami, a nie piksel po pikselu.
    let glowa = {
        x: waz[0].x + kierunek.x,
        y: waz[0].y + kierunek.y
    };

    // Sprawdzenie kolizji ze ścianą
    if (glowa.x < 0 || glowa.x >= SIATKA || glowa.y < 0 || glowa.y >= SIATKA) {
        koniecGry();
        return;
    }

    let zjada = jedzenie && glowa.x === jedzenie.x && glowa.y === jedzenie.y;

    // Sprawdzenie kolizji z samym sobą
    // Gdy wąż nie je, ogon zaraz zniknie i można bezpiecznie wejść na jego pole.
    let przeszkody = zjada ? waz : waz.slice(0, -1);
    for (let i = 0; i < przeszkody.length; i++) {
        if (przeszkody[i].x === glowa.x && przeszkody[i].y === glowa.y) {
            koniecGry();
            return;
        }
    }

    waz.unshift(glowa); // Dodanie nowej głowy z przodu

    if (zjada) {
        punkty++;
        dzwiekGier.ugryzienie();
        krok = Math.max(KROK_MIN, KROK_START - punkty * 3); // Zwiększanie prędkości
        if (waz.length === SIATKA * SIATKA) {
            koniecGry();
            return;
        }
        losujJedzenie();
    } else {
        waz.pop(); // Usunięcie ogona, jeśli wąż nie zjadł jedzenia
    }
}

// ---------- 8. RYSOWANIE PLANSZY I WĘŻA ----------
// Rysuje tekst z obrysem, by był czytelny na każdej części planszy.
function napis(tekst, x, y, rozmiar, wyrownanie) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.font = "bold " + rozmiar + "px Arial";
    ctx.textAlign = wyrownanie || "center";
    ctx.strokeText(tekst, x, y);
    ctx.fillText(tekst, x, y);
}

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
    // Naprzemienne kolory pól ułatwiają śledzenie ruchu po planszy.
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

    ctx.fillStyle = "#e53935";
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fill();
}

function rysujWaza() {
    // Rysujemy od ogona do głowy, żeby głowa pozostała na wierzchu.
    for (let i = waz.length - 1; i >= 0; i--) {
        let s = waz[i];
        let jasnosc = 38 + (i / waz.length) * 22;
        ctx.fillStyle = "hsl(215, 70%, " + jasnosc + "%)";
        zaokraglony(s.x * POLE + 1, s.y * POLE + 1, POLE - 2, POLE - 2, 6);
        ctx.fill();
    }
}

function rysuj() {
    pauzaBtn.textContent = t(stan === "pauza" ? "snake_wznow" : "snake_pauzuj");
    // Plansza i elementy gry są odświeżane również podczas startu, pauzy i końca rundy.
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rysujPlansze();
    rysujJedzenie();
    rysujWaza();

    if (stan === "gra") {
        napis(t("wynik") + " " + punkty, 10, 28, 20, "left");
        return;
    }

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

// ---------- 9. URUCHOMIENIE I PĘTLA GRY ----------
// Pętla animacji wykonuje ruch węża w ustalonych odstępach i odświeża planszę.
if (nick !== "") {
    pokazGre();
} else {
    nickInput.focus();
}

function aktualizujZegar(dt) {
    if (stan === "gra") {
        akumulatorRuchu += dt * 1000;
        while (akumulatorRuchu >= krok && stan === "gra") {
            akumulatorRuchu -= krok;
            aktualizuj();
        }
    } else {
        akumulatorRuchu = 0;
    }
}

uruchomPetleGry(aktualizujZegar, rysuj);