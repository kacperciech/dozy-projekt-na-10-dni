// ---------- USTAWIENIA ----------
// Mapowanie kluczy w localStorage dla poszczególnych gier
const KLUCZE = {
    flappy: "wyniki",
    snake: "wyniki_snake"
};

// Baza ciekawostek w języku polskim i angielskim
const FAKTY = {
    pl: {
        flappy: [
            "Flappy Bird stworzył w 2013 roku wietnamski programista Dong Nguyen.",
            "W lutym 2014 autor sam wycofał grę ze sklepów, mimo ogromnej popularności."
        ],
        snake: [
            "Wersję Snake'a znaną każdemu zaprogramował Taneli Armanto dla Nokii w 1997 roku.",
            "W tej wersji idealny wynik to 397 punktów – wtedy wąż wypełnia całą planszę."
        ]
    },
    en: {
        flappy: [
            "Flappy Bird was created in 2013 by Vietnamese developer Dong Nguyen."
        ],
        snake: [
            "The version everyone knows was programmed by Taneli Armanto for Nokia in 1997."
        ]
    }
};

const loginBox = document.getElementById("login-box");
const wybor = document.getElementById("wybor");
const nickInput = document.getElementById("nick-input");
const zalogujBtn = document.getElementById("zaloguj-btn");
const wylogujBtn = document.getElementById("wyloguj-btn");
const loginBlad = document.getElementById("login-blad");
const nickWyswietl = document.getElementById("nick-wyswietl");

// ---------- WYNIKI I RANKING TOP 3 ----------
function wczytajWyniki(gra) {
    try {
        return JSON.parse(localStorage.getItem(KLUCZE[gra])) || {};
    } catch (e) {
        return {};
    }
}

// Generowanie listy TOP 3 graczy na karcie danej gry
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

        imie.textContent = lista[i][0];
        pkt.textContent = lista[i][1];
        pkt.className = "pkt";

        if (lista[i][0] === nick) li.className = "ja";

        li.appendChild(imie);
        li.appendChild(pkt);
        ol.appendChild(li);
    }
}

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
    let lista = FAKTY[jezyk][gra];
    document.getElementById("fakt-" + gra).textContent = lista[numerFaktu[gra] % lista.length];
}

document.querySelectorAll(".link-btn").forEach(function (przycisk) {
    przycisk.addEventListener("click", function () {
        let gra = przycisk.dataset.gra;
        numerFaktu[gra] = (numerFaktu[gra] + 1) % FAKTY[jezyk][gra].length;
        pokazFakt(gra);
    });
});

// ---------- LOGOWANIE I ODŚWIEŻANIE WIDOKU ----------
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