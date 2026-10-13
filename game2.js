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
