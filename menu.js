// ---------- USTAWIENIA ----------
// Każda gra: pod jakim kluczem w localStorage trzyma wyniki
// i czy lepszy jest wynik MNIEJSZY (rosnaco: true, np. czas w rajdzie).
const GRY = {
    flappy: { klucz: "wyniki",       rosnaco: false },
    snake:  { klucz: "wyniki_snake", rosnaco: false },
    rajd:   { klucz: "wyniki_rajd",  rosnaco: true },
    breakout: { klucz: "wyniki_breakout", rosnaco: false },
    tetris: { klucz: "wyniki_tetris", rosnaco: false }
};
// Lista nazw gier utworzona z konfiguracji powyżej.
const LISTA_GIER = Object.keys(GRY);

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
        ],
        rajd: [
            "W rajdach załogi nie ścigają się obok siebie. Jadą pojedynczo na czas po zamkniętych odcinkach specjalnych, a wygrywa najkrótszy łączny czas.",
            "Obok kierowcy siedzi pilot, który czyta mu opis trasy, tzw. pacenotes, zanim kierowca zobaczy zakręt.",
            "Mistrzostwa Świata w Rajdach (WRC) rozgrywane są od 1973 roku.",
            "Na żwirze i w błocie auto ma o wiele mniejszą przyczepność niż na asfalcie. W Twojej grze każda nawierzchnia ma własną przyczepność i limit prędkości.",
            "Hamulec ręczny w rajdach pomaga wprowadzić auto w poślizg w ciasnym zakręcie. W tej grze też: spacja zmniejsza przyczepność tylnych kół.",
            "W tej wersji o miejscu w rankingu decyduje łączny czas trzech okrążeń, liczony co do setnej części sekundy."
        ],
        breakout: [
            "Breakout stworzył Atari w 1976 roku. Przy jego projektowaniu pomagał Steve Wozniak, późniejszy współzałożyciel Apple.",
            "W Breakoucie odbijasz piłkę od paletki, żeby rozbić wszystkie cegiełki i nie pozwolić piłce wypaść poza planszę.",
            "Gra Breakout zainspirowała wiele późniejszych gier zręcznościowych, w tym Arkanoida."
        ],
        tetris: [
            "Tetris powstał w 1984 roku. Jego twórcą jest radziecki programista Aleksiej Pażytnow.",
            "Nazwa Tetris łączy grecki przedrostek „tetra” (cztery) z ulubionym sportem twórcy — tenisem.",
            "W Tetrisie każdy klocek składa się z czterech kwadratów, a pełne rzędy znikają z planszy."
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
        ],
        rajd: [
            "Rally crews don't race side by side. They drive one at a time against the clock on closed special stages, and the shortest total time wins.",
            "Next to the driver sits a co-driver who reads out a description of the road, called pace notes, before the driver sees the corner.",
            "The World Rally Championship (WRC) has been held since 1973.",
            "On gravel and mud a car has far less grip than on asphalt. In your game every surface has its own grip and speed limit.",
            "In rallying the handbrake helps throw the car into a slide in a tight corner. It works that way here too: Space reduces grip.",
            "In this version your ranking depends on the total time of three laps, measured to a hundredth of a second."
        ],
        breakout: [
            "Atari released Breakout in 1976. Steve Wozniak, later co-founder of Apple, helped design it.",
            "In Breakout, bounce the ball off the paddle to smash every brick without letting the ball fall off the board.",
            "Breakout inspired many later arcade games, including Arkanoid."
        ],
        tetris: [
            "Tetris was created in 1984 by Soviet software engineer Alexey Pajitnov.",
            "The name Tetris combines the Greek prefix “tetra” (four) with the creator's favorite sport, tennis.",
            "Every Tetris piece is made of four squares, and completed rows disappear from the board."
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
const wyzwanieGra = document.getElementById("wyzwanie-gra");
const wyzwanieLink = document.getElementById("wyzwanie-link");
const wyzwanieOdliczanie = document.getElementById("wyzwanie-odliczanie");
const soundtrackBtn = document.getElementById("soundtrack-btn");
const soundtrackLabel = document.getElementById("soundtrack-label");

const WYZWANIA = [
    { nazwa: "flappy_nazwa", link: "document.html" },
    { nazwa: "snake_nazwa", link: "document2.html" },
    { nazwa: "rajd_nazwa", link: "rajd.html" },
    { nazwa: "breakout_nazwa", link: "breakout.html" },
    { nazwa: "tetris_nazwa", link: "tetris.html" }
];

const OSIAGNIECIA = [
    { gra: "flappy", cel: 10 },
    { gra: "snake", cel: 10 },
    { gra: "rajd", cel: 1 },
    { gra: "breakout", cel: 300 },
    { gra: "tetris", cel: 500 }
];

function aktualizujWyzwanie() {
    const teraz = new Date();
    const dzien = Math.floor(Date.UTC(teraz.getFullYear(), teraz.getMonth(), teraz.getDate()) / 86400000);
    const wyzwanie = WYZWANIA[dzien % WYZWANIA.length];
    const jutro = new Date(teraz.getFullYear(), teraz.getMonth(), teraz.getDate() + 1);
    const pozostalo = Math.max(0, jutro.getTime() - teraz.getTime());
    const godziny = Math.floor(pozostalo / 3600000);
    const minuty = Math.floor((pozostalo % 3600000) / 60000);
    const sekundy = Math.floor((pozostalo % 60000) / 1000);

    wyzwanieGra.textContent = t(wyzwanie.nazwa);
    wyzwanieLink.href = wyzwanie.link;
    wyzwanieOdliczanie.textContent = [godziny, minuty, sekundy]
        .map(function (wartosc) { return String(wartosc).padStart(2, "0"); })
        .join(":");
}

aktualizujWyzwanie();
setInterval(aktualizujWyzwanie, 1000);

// ---------- WYNIKI ----------
// Odczytuje wyniki danej gry z localStorage; uszkodzony zapis nie zatrzymuje menu.
function wczytajWyniki(gra) {
    try {
        return JSON.parse(localStorage.getItem(GRY[gra].klucz)) || {};
    } catch (e) {
        return {}; // uszkodzone dane = pusta tabela
    }
}

// Czas w sekundach jako m:ss.cc (tylko dla rajdu)
function fmtCzas(s) {
    // Ranking rajdu przechowuje sekundy, a menu pokazuje je jako minuty i setne.
    const min = Math.floor(s / 60);
    const sek = (s % 60).toFixed(2).padStart(5, "0");
    return min + ":" + sek;
}

function formatuj(gra, wartosc) {
    // Punkty gier są liczbami, natomiast wynik rajdu wymaga formatowania czasu.
    return gra === "rajd" ? fmtCzas(wartosc) : wartosc;
}

// Wypełnia listę TOP 3 dla danej gry
function pokazTop(gra) {
    let ol = document.getElementById("top-" + gra);
    let nick = localStorage.getItem("nick") || "";
    ol.innerHTML = "";

    // Kolejność zależy od gry: punkty sortujemy malejąco, a czas rajdu rosnąco.
    let lista = Object.entries(wczytajWyniki(gra))
        .sort(function (a, b) {
            return GRY[gra].rosnaco ? a[1] - b[1] : b[1] - a[1];
        })
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
        pkt.textContent = formatuj(gra, lista[i][1]);
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
    let el = document.getElementById("rekord-" + gra);

    if (gra === "rajd") {
        el.textContent = wyniki[nick] !== undefined ? fmtCzas(wyniki[nick]) : "--";
    } else {
        el.textContent = wyniki[nick] || 0;
    }
}

function pokazOsiagniecia() {
    const nick = localStorage.getItem("nick") || "";
    let odblokowane = 0;

    OSIAGNIECIA.forEach(function (osiagniecie) {
        const { gra, cel } = osiagniecie;
        const wyniki = wczytajWyniki(gra);
        const wartosc = Number(wyniki[nick]) || 0;
        const postep = gra === "rajd" ? (wartosc > 0 ? 1 : 0) : Math.min(cel, wartosc);
        const odblokowaneTeraz = postep >= cel;

        if (odblokowaneTeraz) odblokowane++;
        document.getElementById("osiagniecie-" + gra).classList.toggle("odblokowane", odblokowaneTeraz);
        document.getElementById("postep-" + gra).textContent = postep + "/" + cel;
        document.getElementById("status-" + gra).textContent = t(
            odblokowaneTeraz ? "osiagniecie_odblokowane" : "osiagniecie_zamkniete"
        );
    });

    document.getElementById("osiagniecia-licznik").textContent = t("osiagniecia_licznik")
        .replace("{odblokowane}", String(odblokowane))
        .replace("{razem}", String(OSIAGNIECIA.length));
}

// ---------- CIEKAWOSTKI ----------
let numerFaktu = {};
LISTA_GIER.forEach(function (gra) {
    // Losujemy początkową ciekawostkę osobno dla każdej karty.
    numerFaktu[gra] = Math.floor(Math.random() * FAKTY.pl[gra].length);
});

function pokazFakt(gra) {
    // Ten sam numer wskazuje odpowiadający sobie fakt w wybranym języku.
    let lista = FAKTY[jezyk][gra]; // jezyk pochodzi z rowerek.js
    document.getElementById("fakt-" + gra).textContent = lista[numerFaktu[gra] % lista.length];
}

// Każdy przycisk ciekawostki przechodzi do następnego faktu danej gry.
document.querySelectorAll(".link-btn").forEach(function (przycisk) {
    przycisk.addEventListener("click", function () {
        let gra = przycisk.dataset.gra;
        numerFaktu[gra] = (numerFaktu[gra] + 1) % FAKTY[jezyk][gra].length;
        pokazFakt(gra);
    });
});

// ---------- LOGOWANIE ----------
// Pokazuje formularz logowania albo menu gracza i uzupełnia dane z rankingów.
function odswiez() {
    let nick = localStorage.getItem("nick") || "";

    // Bez nicku widoczny jest formularz; po zalogowaniu uzupełniamy karty gier.
    if (nick === "") {
        loginBox.classList.remove("hidden");
        wybor.classList.add("hidden");
        nickInput.focus();
        return;
    }

    loginBox.classList.add("hidden");
    wybor.classList.remove("hidden");
    nickWyswietl.textContent = nick;

    LISTA_GIER.forEach(function (gra) {
        pokazTop(gra);
        pokazRekord(gra);
        pokazFakt(gra);
    });
    pokazOsiagniecia();
}

// rowerek.js wywołuje tę funkcję po kliknięciu PL / EN
function poZmianieJezyka() {
    aktualizujWyzwanie();
    odswiez();
    const muzykaWlaczona = soundtrackBtn.getAttribute("aria-pressed") === "true";
    soundtrackLabel.textContent = t(muzykaWlaczona ? "soundtrack_stop" : "soundtrack_play");
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

// Podłączenie przycisków formularza, Entera oraz wylogowania.
zalogujBtn.addEventListener("click", zaloguj);
nickInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") zaloguj();
});
wylogujBtn.addEventListener("click", function () {
    localStorage.removeItem("nick");
    nickInput.value = "";
    odswiez();
});

soundtrackBtn.addEventListener("click", function () {
    const wlacz = soundtrackBtn.getAttribute("aria-pressed") !== "true";
    dzwiekGier.muzykaMenu(wlacz);
    soundtrackBtn.setAttribute("aria-pressed", String(wlacz));
    soundtrackLabel.textContent = t(wlacz ? "soundtrack_stop" : "soundtrack_play");
});

odswiez();
