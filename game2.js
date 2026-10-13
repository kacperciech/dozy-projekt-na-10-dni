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
        tabelaEl.textContent = "Brak wyników. Zagraj pierwszy!";
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