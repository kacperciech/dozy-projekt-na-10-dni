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