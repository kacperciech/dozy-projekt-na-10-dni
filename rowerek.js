// Wspólny plik tłumaczeń. Musi być ładowany PIERWSZY na każdej stronie.
const TLUMACZENIA = {
    pl: {
        tytul_strony: "Arcade | Wybierz grę",
        podtytul: "Trzy gry. Jeden gracz. Wybierz i pobij rekord!",
        login_tytul: "Kim jesteś?",
        login_opis: "Podaj nick, żeby Twoje wyniki trafiły do rankingu",
        nick_placeholder: "Twój nick",
        wchodze: "Wchodzę",
        gracz: "Gracz:",
        zmien_gracza: "Zmień gracza",
        flappy_nazwa: "Flappy Gołąb",
        flappy_opis: "Leć między rurami i nie dotknij niczego. Proste zasady, trudne wykonanie.",
        flappy_ster: "⌨️ Spacja, klik lub dotyk",
        twoj_rekord: "Twój rekord:",
        twoj_czas: "Twój najlepszy czas:",
        top3: "🏆 TOP 3",
        top3_czasy: "🏆 Najlepsze czasy",
        czy_wiesz: "💡 Czy wiesz, że...",
        kolejna: "Kolejna ciekawostka ↻",
        graj_flappy: "▶ Graj we Flappy",
        snake_opis: "Zjadaj jabłka, rośnij i nie wjedź w siebie. Z każdym punktem jest szybciej.",
        snake_ster: "⌨️ Strzałki lub WASD, P to pauza",
        graj_snake: "▶ Graj w Snake",
        rajd_opis: "Przejedź 3 okrążenia jak najszybciej. Uważaj na żwir i błoto!",
        rajd_ster: "⌨️ Strzałki lub WASD, spacja to hamulec ręczny",
        graj_rajd: "▶ Jedź w Rajdzie",
        stopka: "Projekt na 10 dni · HTML + CSS + JavaScript",
        blad_nick: "Nick musi mieć co najmniej 2 znaki.",
        brak_wynikow: "Brak wyników. Zagraj pierwszy!",

        // strony gier
        login_gra_opis: "Podaj swój nick, żeby zagrać",
        graj_btn: "Graj",
        tabela: "Tabela wyników",
        menu: "← Menu",
        snake_panel_1: "Sterowanie: strzałki lub WASD",
        snake_panel_2: "P: pauza",
        snake_panel_3: "Telefon: przesuń palcem",

        // napisy na canvasie (Flappy i Snake)
        flappy_start: "Kliknij lub spacja",
        flappy_ponownie: "Kliknij, aby zagrać",
        koniec_gry: "KONIEC GRY",
        punkty: "Punkty:",
        rekord: "Rekord:",
        wynik: "Wynik:",
        snake_ster_canvas: "Strzałki lub WASD",
        snake_start: "Spacja lub klik, aby zacząć",
        pauza: "PAUZA",
        pauza_info: "Naciśnij P lub spację",
        snake_ponownie: "Spacja lub klik: jeszcze raz",

        // rajdówka
        rajd_nazwa: "Rajd",
        rajd_czas: "Czas:",
        rajd_okrazenie: "Okrążenie:",
        rajd_okrazenia: "Okrążenia:",
        rajd_predkosc: "Prędkość:",
        rajd_nawierzchnia: "Nawierzchnia:",
        rajd_najlepszy: "Najlepszy:",
        rajd_sterowanie: "Strzałki / WASD: jazda   Spacja: hamulec ręczny   R: restart",
        rajd_ruszaj: "Naciśnij strzałkę, aby ruszyć",
        rajd_meta: "META!",
        rajd_top3: "NAJLEPSZE CZASY",
        rajd_jeszcze_raz: "R: jeszcze raz",
        nawierz_asfalt: "asfalt",
        nawierz_zwir: "żwir",
        nawierz_trawa: "trawa",
        nawierz_blato: "błoto"
    },

    en: {
        tytul_strony: "Arcade | Choose a game",
        podtytul: "Three games. One player. Pick one and beat the record!",
        login_tytul: "Who are you?",
        login_opis: "Enter a nickname so your scores go on the leaderboard",
        nick_placeholder: "Your nickname",
        wchodze: "Let's go",
        gracz: "Player:",
        zmien_gracza: "Change player",
        flappy_nazwa: "Flappy Pigeon",
        flappy_opis: "Fly between the pipes and don't touch anything. Simple rules, hard to master.",
        flappy_ster: "⌨️ Space, click or tap",
        twoj_rekord: "Your record:",
        twoj_czas: "Your best time:",
        top3: "🏆 TOP 3",
        top3_czasy: "🏆 Best times",
        czy_wiesz: "💡 Did you know...",
        kolejna: "Next fact ↻",
        graj_flappy: "▶ Play Flappy",
        snake_opis: "Eat apples, grow longer and don't run into yourself. Every point makes it faster.",
        snake_ster: "⌨️ Arrow keys or WASD, P to pause",
        graj_snake: "▶ Play Snake",
        rajd_opis: "Drive 3 laps as fast as you can. Watch out for gravel and mud!",
        rajd_ster: "⌨️ Arrow keys or WASD, Space is the handbrake",
        graj_rajd: "▶ Play Rally",
        stopka: "10-day project · HTML + CSS + JavaScript",
        blad_nick: "Nickname must be at least 2 characters long.",
        brak_wynikow: "No scores yet. Be the first to play!",

        login_gra_opis: "Enter your nickname to play",
        graj_btn: "Play",
        tabela: "Leaderboard",
        menu: "← Menu",
        snake_panel_1: "Controls: arrow keys or WASD",
        snake_panel_2: "P: pause",
        snake_panel_3: "Phone: swipe",

        flappy_start: "Click or press Space",
        flappy_ponownie: "Click to play again",
        koniec_gry: "GAME OVER",
        punkty: "Points:",
        rekord: "Record:",
        wynik: "Score:",
        snake_ster_canvas: "Arrow keys or WASD",
        snake_start: "Space or click to start",
        pauza: "PAUSED",
        pauza_info: "Press P or Space",
        snake_ponownie: "Space or click: play again",

        rajd_nazwa: "Rally",
        rajd_czas: "Time:",
        rajd_okrazenie: "Lap:",
        rajd_okrazenia: "Laps:",
        rajd_predkosc: "Speed:",
        rajd_nawierzchnia: "Surface:",
        rajd_najlepszy: "Best:",
        rajd_sterowanie: "Arrows / WASD: drive   Space: handbrake   R: restart",
        rajd_ruszaj: "Press an arrow key to start",
        rajd_meta: "FINISH!",
        rajd_top3: "BEST TIMES",
        rajd_jeszcze_raz: "R: try again",
        nawierz_asfalt: "asphalt",
        nawierz_zwir: "gravel",
        nawierz_trawa: "grass",
        nawierz_blato: "mud"
    }
};

// Aktualny język (zapisany w przeglądarce, domyślnie polski)
let jezyk = localStorage.getItem("jezyk");
if (!TLUMACZENIA[jezyk]) jezyk = "pl";

// Zwraca tekst w aktualnym języku. Gdy brakuje tłumaczenia, bierze polski.
function t(klucz) {
    return TLUMACZENIA[jezyk][klucz] || TLUMACZENIA.pl[klucz] || klucz;
}

// Podmienia wszystkie teksty oznaczone data-i18n na stronie
function przetlumaczStrone() {
    document.documentElement.lang = jezyk;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    // podświetl aktywny przycisk języka (jeśli strona go ma)
    document.querySelectorAll("[data-jezyk]").forEach(function (b) {
        b.classList.toggle("aktywny", b.dataset.jezyk === jezyk);
    });
}

function ustawJezyk(nowy) {
    jezyk = nowy;
    localStorage.setItem("jezyk", nowy);
    przetlumaczStrone();
    // strona główna odświeża dzięki temu ciekawostki i ranking
    if (typeof poZmianieJezyka === "function") poZmianieJezyka();
}

// Przyciski PL / EN (istnieją tylko na stronie głównej)
document.querySelectorAll("[data-jezyk]").forEach(function (b) {
    b.addEventListener("click", function () {
        ustawJezyk(b.dataset.jezyk);
    });
});

przetlumaczStrone();