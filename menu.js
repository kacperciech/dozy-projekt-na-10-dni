// ---------- USTAWIENIA ----------
// Pod jakimi kluczami w localStorage każda gra trzyma swoje wyniki.
const KLUCZE = {
    flappy: "wyniki",
    snake: "wyniki_snake"
};

// Ciekawostki w obu językach. Kolejność musi być taka sama w PL i EN,
// wtedy po zmianie języka zostaje ta sama ciekawostka.
const FAKTY = {
    pl: {
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
    },
    en: {
        flappy: [
            "Flappy Bird was created in 2013 by Vietnamese developer Dong Nguyen. The first version reportedly took him just a few days.",
            "In early 2014 the game became a worldwide hit, reportedly earning around $50,000 a day from ads.",
            "In February 2014 the author pulled the game from the app stores despite its huge popularity, saying it had become too addictive.",
            "The green pipes in Flappy Bird look a lot like the famous pipes from Super Mario.",
            "The physics is very simple: a flap sets the upward speed and gravity does the rest. That's exactly how your version works too!",
            "In the original you played a yellow bird, but in your version the hero is a pigeon with an iridescent neck."
        ],
        snake: [
            "Snake's predecessor was the 1976 arcade game Blockade, where two players left walls behind them as they moved.",
            "The version everyone knows was programmed by Taneli Armanto for Nokia. It shipped on the Nokia 6110 in 1997.",
            "Snake was reportedly preinstalled on over 350 million Nokia phones, making it one of the most-launched games in history.",
            "In this version a perfect score is 397 points. At that point the snake fills the whole 20 by 20 board.",
            "In code the snake is just an array: a new head is added to the front and the tail is removed from the end.",
            "In this version the snake reaches top speed at around 27 points. Each point shortens one step by 3 milliseconds."
        ]
    }
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
        ol.textContent = t("brak_wynikow");
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
    flappy: Math.floor(Math.random() * FAKTY.pl.flappy.length),
    snake: Math.floor(Math.random() * FAKTY.pl.snake.length)
};

function pokazFakt(gra) {
    let lista = FAKTY[jezyk][gra]; // jezyk pochodzi z rowerek.js
    document.getElementById("fakt-" + gra).textContent = lista[numerFaktu[gra] % lista.length];
}

document.querySelectorAll(".link-btn").forEach(function (przycisk) {
    przycisk.addEventListener("click", function () {
        let gra = przycisk.dataset.gra;
        numerFaktu[gra] = (numerFaktu[gra] + 1) % FAKTY[jezyk][gra].length;
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

// rowerek.js wywołuje tę funkcję po kliknięciu PL / EN
function poZmianieJezyka() {
    odswiez();
}

function zaloguj() {
    let wpisany = nickInput.value.trim();

    if (wpisany.length < 2) {
        loginBlad.textContent = t("blad_nick");
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