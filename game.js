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

// Zmienne stanu gry
let ptak, rury, punkty, licznikKlatek;
let rekord = 0;      // Rekord aktualnego gracza
let stan = "start";  // Status gry: "start", "gra", "koniec"
let chmury = [];
let przesuniecieTrawy = 0;
let animacja = 0;    // Licznik klatek odpowiadający za machanie skrzydłem gołębia

// Elementy interfejsu strony (DOM)
const loginEkran = document.getElementById("login-ekran");
const graKontener = document.getElementById("gra-kontener");
const nickInput = document.getElementById("nick-input");
const zalogujBtn = document.getElementById("zaloguj-btn");
const wylogujBtn = document.getElementById("wyloguj-btn");
const loginBlad = document.getElementById("login-blad");
const nickWyswietl = document.getElementById("nick-wyswietl");
const tabelaEl = document.getElementById("tabela");

// Pobieranie zapisanego nicku gracza z localStorage
let nick = localStorage.getItem("nick") || "";

// ---------- 2. WYNIKI (localStorage) ----------
// Wczytywanie bazy wyników wszystkich graczy
function wczytajWyniki() {
    try {
        return JSON.parse(localStorage.getItem("wyniki")) || {};
    } catch (e) {
        return {}; // W razie uszkodzenia danych zwraca pusty obiekt
    }
}

// Zapisywanie rekordu gracza, jeśli pobił swój dotychczasowy wynik
function zapiszWynik() {
    let wyniki = wczytajWyniki();
    // Wynik Flappy rośnie, więc zapisujemy go tylko wtedy, gdy jest większy od rekordu.
    if (wyniki[nick] === undefined || punkty > wyniki[nick]) {
        wyniki[nick] = punkty;
        localStorage.setItem("wyniki", JSON.stringify(wyniki));
    }
    rekord = wyniki[nick];
}

// Odświeżanie i sortowanie tabeli TOP 10 graczy
function odswiezTabele() {
    let wyniki = wczytajWyniki();
    let lista = Object.entries(wyniki);
    lista.sort(function (a, b) { return b[1] - a[1]; });
    lista = lista.slice(0, 10); // Pobieranie tylko najlepszej dziesiątki

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
// Weryfikuje nick, zapisuje go i pokazuje ekran rozgrywki.
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

// Usuwa bieżącego gracza i wraca do formularza logowania.
function wyloguj() {
    nick = "";
    localStorage.removeItem("nick");
    nickInput.value = "";
    loginEkran.classList.remove("hidden");
    graKontener.classList.add("hidden");
    document.activeElement.blur();
    nickInput.focus();
}

// Przygotowuje grę i wyświetla zapisany ranking dla zalogowanego gracza.
function pokazGre() {
    loginEkran.classList.add("hidden");
    graKontener.classList.remove("hidden");
    nickWyswietl.textContent = nick;

    let wyniki = wczytajWyniki();
    rekord = wyniki[nick] || 0;

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
// Losuje położenie, rozmiar i prędkość chmur na tle planszy.
function stworzChmury() {
    chmury = [];
    for (let i = 0; i < 5; i++) {
        // Każda chmura ma własną skalę i tempo, by tło wyglądało naturalniej.
        chmury.push({
            x: Math.random() * canvas.width,
            y: 30 + Math.random() * 200,
            rozmiar: 0.6 + Math.random() * 0.8,
            predkosc: 0.2 + Math.random() * 0.3
        });
    }
}

// ---------- 5. RESET GRY ----------
// Przywraca pozycję ptaka, rury i licznik punktów do wartości początkowych.
function reset() {
    ptak = { x: 80, y: 250, w: 34, h: 26, predkosc: 0 };
    rury = [];
    punkty = 0;
    licznikKlatek = 0;
}

reset();
stworzChmury();

// ---------- 6. STEROWANIE ----------
// Obsługa skoku ptaka (klawiatura, kliknięcie myszką, dotyk ekranu)
function skok() {
    if (nick === "") return;

    // Pierwsze naciśnięcie rozpoczyna grę, a kolejne utrzymują ptaka w powietrzu.
    if (stan === "start") {
        stan = "gra";
        ptak.predkosc = SKOK;
        dzwiekGier.gruchanie();
    } else if (stan === "gra") {
        ptak.predkosc = SKOK;
        dzwiekGier.gruchanie();
    } else if (stan === "koniec") {
        reset();
        stan = "start";
    }
}

document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
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
// Zmienia stan gry i zapisuje wynik, jeśli jest to nowy rekord.
function koniecGry() {
    stan = "koniec";
    zapiszWynik();
    odswiezTabele();
}

// ---------- 8. AKTUALIZACJA (Logika gry w klatce) ----------
// Przesuwa obiekty, stosuje grawitację i wykrywa kolizje.
function aktualizuj() {
    // Chmury poruszają się także na ekranie startowym i po zakończeniu gry.
    // Ruch chmur w tle
    for (let i = 0; i < chmury.length; i++) {
        chmury[i].x -= chmury[i].predkosc;
        if (chmury[i].x < -100) {
            chmury[i].x = canvas.width + 50;
            chmury[i].y = 30 + Math.random() * 200;
        }
    }

    if (stan === "gra") animacja += 0.3;
    else if (stan === "start") animacja += 0.12;

    if (stan !== "gra") return;

    przesuniecieTrawy = (przesuniecieTrawy + PREDKOSC_RUR) % 24;

    // Aplikowanie grawitacji do pozycji ptaka
    ptak.predkosc += GRAWITACJA;
    ptak.y += ptak.predkosc;

    // Generowanie nowych rur co określoną liczbę klatek
    licznikKlatek++;
    if (licznikKlatek % CO_ILE_KLATEK === 0) {
        // Szczelina rur jest losowa, ale zawsze zostaje miejsce nad ziemią i pod sufitem.
        let gora = 50 + Math.random() * (canvas.height - PRZERWA - WYSOKOSC_TRAWY - 100);
        rury.push({ x: canvas.width, gora: gora, zaliczona: false });
    }

    // Ruch rur i wykrywanie kolizji z ptakiem
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

    rury = rury.filter(function (r) {
        return r.x + SZEROKOSC_RURY > 0;
    });

    // Kolizja z ziemią (trawą) lub sufitem
    if (ptak.y + ptak.h > canvas.height - WYSOKOSC_TRAWY || ptak.y < 0) {
        koniecGry();
    }
}

// ---------- 9. RYSOWANIE GRAFIKI ----------
// Rysuje czytelny napis na planszy wraz z obrysem.
function napis(tekst, x, y, rozmiar) {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.font = "bold " + rozmiar + "px Arial";
    ctx.textAlign = "center";
    ctx.strokeText(tekst, x, y);
    ctx.fillText(tekst, x, y);
}

// Rysuje gradientowe niebo jako tło rozgrywki.
function rysujNiebo() {
    let niebo = ctx.createLinearGradient(0, 0, 0, canvas.height);
    niebo.addColorStop(0, "#4EC0CA");
    niebo.addColorStop(1, "#C8F0F5");
    ctx.fillStyle = niebo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function rysujChmure(x, y, s) {
    // Kilka nachodzących na siebie kół tworzy jedną miękką sylwetkę chmury.
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.beginPath();
    ctx.arc(x, y, 25 * s, 0, Math.PI * 2);
    ctx.arc(x + 25 * s, y - 10 * s, 30 * s, 0, Math.PI * 2);
    ctx.arc(x + 55 * s, y, 25 * s, 0, Math.PI * 2);
    ctx.arc(x + 25 * s, y + 8 * s, 25 * s, 0, Math.PI * 2);
    ctx.fill();
}

function rysujTrawe() {
    // Przesunięcie wzoru daje wrażenie ruchu podłoża bez przesuwania samej planszy.
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

// Rysowanie postaci gołębia z animacją skrzydeł i przechyłem
function rysujGolebia() {
    let cx = ptak.x + ptak.w / 2;
    let cy = ptak.y + ptak.h / 2;

    ctx.save();
    ctx.translate(cx, cy);

    let kat = Math.max(-0.45, Math.min(0.9, ptak.predkosc * 0.08));
    ctx.rotate(kat);

    // Ogon
    ctx.fillStyle = "#5d6470";
    ctx.beginPath();
    ctx.moveTo(-12, -2);
    ctx.lineTo(-22, -4);
    ctx.lineTo(-22, 5);
    ctx.lineTo(-12, 4);
    ctx.closePath();
    ctx.fill();

    // Nóżki
    ctx.strokeStyle = "#d9667a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-2, 9);
    ctx.lineTo(-4, 13);
    ctx.moveTo(3, 9);
    ctx.lineTo(5, 13);
    ctx.stroke();

    // Ciało
    ctx.fillStyle = "#8e97a6";
    ctx.beginPath();
    ctx.ellipse(0, 2, 14, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Szyja z gradientem
    let szyja = ctx.createLinearGradient(4, -6, 12, 2);
    szyja.addColorStop(0, "#2fa37a");
    szyja.addColorStop(1, "#8e4bb5");
    ctx.fillStyle = szyja;
    ctx.beginPath();
    ctx.arc(8, -2, 6, 0, Math.PI * 2);
    ctx.fill();

    // Głowa i oko
    ctx.fillStyle = "#7d8695";
    ctx.beginPath();
    ctx.arc(11, -7, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ff8a1f";
    ctx.beginPath();
    ctx.arc(14, -8, 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function rysuj() {
    // Całą klatkę rysujemy od nowa, w kolejności od tła do elementów pierwszego planu.
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
        ctx.fillRect(r.x, r.gora + PRZERWA, SZEROKOSC_RURY, canvas.height - r.gora - PRZERWA - WYSOKOSC_TRAWY);
    }

    rysujTrawe();
    rysujGolebia();

    if (stan === "start") {
        napis("FLAPPY", canvas.width / 2, 200, 48);
        napis(t("gracz") + " " + nick, canvas.width / 2, 250, 22);
        napis(t("flappy_start"), canvas.width / 2, 290, 24);
    } else if (stan === "gra") {
        napis(punkty, canvas.width / 2, 70, 48);
    } else if (stan === "koniec") {
        napis(t("koniec_gry"), canvas.width / 2, 200, 40);
        napis(t("punkty") + " " + punkty, canvas.width / 2, 260, 28);
        napis(t("rekord") + " " + rekord, canvas.width / 2, 300, 28);
        napis(t("flappy_ponownie"), canvas.width / 2, 360, 22);
    }
}

// ---------- 10. START PROGRAMU I GŁÓWNA PĘTLA ----------
// Odtwarza animację przez ciągłe aktualizowanie stanu i rysowanie planszy.
if (nick !== "") {
    pokazGre();
} else {
    nickInput.focus();
}

function petla() {
    aktualizuj();
    rysuj();
    requestAnimationFrame(petla);
}
petla();