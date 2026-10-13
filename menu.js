// ---------- USTAWIENIA ----------
// Pod jakimi kluczami w localStorage każda gra trzyma swoje wyniki.
// Flappy zapisuje pod "wyniki", Snake pod "wyniki_snake".
const KLUCZE = {
    flappy: "wyniki",
    snake: "wyniki_snake"
};

// Ciekawostki: możesz dopisywać własne, wystarczy dodać tekst do tablicy
const FAKTY = {
    flappy: [
        "Flappy Bird stworzył w 2013 roku wietnamski programista Dong Nguyen. Na pierwszą wersję podobno wystarczyło mu kilka dni.",
        "Na początku 2014 roku gra stała się światowym hitem i podobno zarabiała około 50 tysięcy dolarów dziennie z reklam.",
        "W lutym 2014 autor sam wycofał grę ze sklepów, mimo ogromnej popularności. Twierdził, że stała się zbyt uzależniająca.",
        "Zielone rury we Flappy Birdzie przypominają słynne rury z Super Mario.",
        "Fizyka w tej grze jest banalna: skok ustawia prędkość w górę, a resztą zajmuje się grawitacja. Dokładnie tak działa też Twoja wersja!",
        "W oryginale grało się żółtym ptaszkiem, a w Twojej wersji bohaterem jest gołąb z opalizującą szyją."
    ],
    snake: [
        "Pierwowzorem Snake'a był automat Blockade z 1976 roku. Grało w niego dwóch graczy, którzy zostawiali za sobą ściany.",
        "Wersję znaną każdemu zaprogramował Taneli Armanto dla Nokii. Trafiła do telefonu Nokia 6110 w 1997 roku.",
        "Snake był preinstalowany podobno na ponad 350 milionach telefonów Nokia, więc to jedna z najczęściej uruchamianych gier w historii.",
        "W tej wersji idealny wynik to 397 punktów. Wtedy wąż wypełnia całą planszę 20 na 20 pól.",
        "Wąż w kodzie to zwykła tablica: nowa głowa dodawana jest na początek, a ogon usuwany z końca.",
        "W tej wersji wąż osiąga maksymalną prędkość po około 27 punktach. Każdy punkt skraca czas jednego kroku o 3 milisekundy."
    ]
};

// ---------- ELEMENTY STRONY ----------
const loginBox = document.getElementById("login-box");
const wybor = document.getElementById("wybor");
const nickInput = document.getElementById("nick-input");
const zalogujBtn = document.getElementById("zaloguj-btn");
const wylogujBtn = document.getElementById("wyloguj-btn");
const loginBlad = document.getElementById("login-blad");
const nickWyswietl = document.getElementById("nick-wyswietl");

// ---------- WYNIKI ----------
function wczytajWyniki(gra) {
    try {
        return JSON.parse(localStorage.getItem(KLUCZE[gra])) || {};
    } catch (e) {
        return {}; // uszkodzone dane = pusta tabela
    }
}

// Wypełnia listę TOP 3 dla danej gry
function pokazTop(gra) {
    let ol = document.getElementById("top-" + gra);
    let nick = localStorage.getItem("nick") || "";
    ol.innerHTML = "";

    let lista = Object.entries(wczytajWyniki(gra))
        .sort(function (a, b) { return b[1] - a[1]; })
        .slice(0, 3);

    if (lista.length === 0) {
        ol.textContent = "Brak wyników. Zagraj pierwszy!";
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        let li = document.createElement("li");
        let imie = document.createElement("span");
        let pkt = document.createElement("span");

        // textContent (nie innerHTML), żeby nick nie mógł wstrzyknąć kodu
        imie.textContent = lista[i][0];
        pkt.textContent = lista[i][1];
        pkt.className = "pkt";

        if (lista[i][0] === nick) li.className = "ja";

        li.appendChild(imie);
        li.appendChild(pkt);
        ol.appendChild(li);
    }
}

// Pokazuje rekord zalogowanego gracza
function pokazRekord(gra) {
    let nick = localStorage.getItem("nick") || "";
    let wyniki = wczytajWyniki(gra);
    document.getElementById("rekord-" + gra).textContent = wyniki[nick] || 0;
}

// ---------- CIEKAWOSTKI ----------
let numerFaktu = {
    flappy: Math.floor(Math.random() * FAKTY.flappy.length),
    snake: Math.floor(Math.random() * FAKTY.snake.length)
};

function pokazFakt(gra) {
    document.getElementById("fakt-" + gra).textContent = FAKTY[gra][numerFaktu[gra]];
}

document.querySelectorAll(".link-btn").forEach(function (przycisk) {
    przycisk.addEventListener("click", function () {
        let gra = przycisk.dataset.gra;
        numerFaktu[gra] = (numerFaktu[gra] + 1) % FAKTY[gra].length;
        pokazFakt(gra);
    });
});

// ---------- LOGOWANIE ----------
function odswiez() {
    let nick = localStorage.getItem("nick") || "";

    if (nick === "") {
        loginBox.classList.remove("hidden");
        wybor.classList.add("hidden");
        nickInput.focus();
        return;
    }

    loginBox.classList.add("hidden");
    wybor.classList.remove("hidden");
    nickWyswietl.textContent = nick;

    ["flappy", "snake"].forEach(function (gra) {
        pokazTop(gra);
        pokazRekord(gra);
        pokazFakt(gra);
    });
}

function zaloguj() {
    let wpisany = nickInput.value.trim();

    if (wpisany.length < 2) {
        loginBlad.textContent = "Nick musi mieć co najmniej 2 znaki.";
        return;
    }

    loginBlad.textContent = "";
    localStorage.setItem("nick", wpisany);
    odswiez();
}

zalogujBtn.addEventListener("click", zaloguj);
nickInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") zaloguj();
});
wylogujBtn.addEventListener("click", function () {
    localStorage.removeItem("nick");
    nickInput.value = "";
    odswiez();
});

odswiez();