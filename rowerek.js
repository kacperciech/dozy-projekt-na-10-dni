// Wspólny plik tłumaczeń i motywu. Musi być ładowany przed skryptami każdej strony.
const TLUMACZENIA = {
    pl: {
        tytul_strony: "Arcade | Wybierz grę",
        motyw_jasny: "Jasny motyw",
        motyw_ciemny: "Ciemny motyw",
        podtytul: "Pięć gier. Jeden gracz. Wybierz i pobij rekord!",
        wyzwanie_etykieta: "WYZWANIE DNIA",
        "wyzwanie-dzis": "Dziś na celowniku:",
        "wyzwanie-opis": "Pobij swój rekord i zgarnij chwałę!",
        "wyzwanie-koniec": "Nowe wyzwanie za",
        "wyzwanie-graj": "Podejmij wyzwanie →",
        osiagniecia_tytul: "Twoje osiągnięcia",
        osiagniecia_opis: "Graj, zdobywaj punkty i odblokowuj odznaki.",
        osiagniecia_licznik: "Odblokowane: {odblokowane}/{razem}",
        osiagniecie_flappy: "Pewne skrzydła",
        osiagniecie_flappy_opis: "Zdobądź 10 punktów we Flappy.",
        osiagniecie_snake: "Wąż nie do zatrzymania",
        osiagniecie_snake_opis: "Zdobądź 10 punktów w Snake’u.",
        osiagniecie_rajd: "Do mety!",
        osiagniecie_rajd_opis: "Ukończ trzy okrążenia w Rajdzie.",
        osiagniecie_breakout: "Mistrz cegiełek",
        osiagniecie_breakout_opis: "Zdobądź 300 punktów w Breakoucie.",
        osiagniecie_tetris: "Mistrz układania",
        osiagniecie_tetris_opis: "Zdobądź 500 punktów w Tetrisie.",
        osiagniecie_odblokowane: "Odblokowane",
        osiagniecie_zamkniete: "Do zdobycia",
        snake_nazwa: "Snake",
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
        rajd_opis: "Wybierz jedną z 4 długich tras i przejedź 3 okrążenia. Uważaj na piasek, żwir i błoto!",
        rajd_ster: "⌨️ Strzałki lub WASD, Q/E zmienia trasę, spacja to hamulec ręczny",
        graj_rajd: "▶ Jedź w Rajdzie",
        breakout_nazwa: "Breakout",
        breakout_opis: "Odbijaj piłkę paletką, rozbij cegiełki i nie pozwól jej spaść!",
        breakout_ster: "⌨️ Strzałki lub A/D, mysz albo dotyk · P: pauza",
        breakout_poziom: "Poziom",
        breakout_wybierz_poziom: "Wybierz poziom",
        breakout_poziom_1: "Poziom 1",
        breakout_poziom_2: "Poziom 2",
        breakout_poziom_3: "Poziom 3",
        breakout_poziom_4: "Poziom 4",
        breakout_poziom_5: "Poziom 5",
        breakout_zmiana_poziomu: "Zmiana poziomu rozpoczyna nową grę.",
        graj_breakout: "▶ Graj w Breakout",
        tetris_nazwa: "Tetris",
        tetris_opis: "Układaj spadające klocki, czyść rzędy i zdobywaj punkty.",
        tetris_ster: "⌨️ ← → ruch, ↑ obrót, ↓ szybciej, spacja: zrzut, P: pauza",
        graj_tetris: "▶ Graj w Tetrisa",
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
        breakout_start: "Kliknij lub naciśnij spację, aby zacząć",
        breakout_kontynuuj: "Kliknij lub naciśnij spację, aby odbić piłkę",
        breakout_pauza: "PAUZA",
        breakout_pauza_info: "Naciśnij P, aby wrócić do gry",
        breakout_koniec: "KONIEC GRY",
        breakout_wygrana: "WSZYSTKIE CEGIEŁKI ROZBITE!",
        breakout_zycia: "Życia:",
        breakout_ponownie: "Kliknij lub spacja: jeszcze raz",
        tetris_wynik: "Wynik:",
        tetris_poziom: "Poziom:",
        tetris_rzedow: "Rzędy:",
        tetris_start: "Spacja lub kliknij, aby zacząć",
        tetris_pauzuj: "Pauzuj",
        tetris_pauza: "PAUZA",
        tetris_pauza_info: "Naciśnij P, aby wrócić do gry",
        tetris_koniec: "KONIEC GRY",
        tetris_ponownie: "Spacja lub kliknij: jeszcze raz",
        tetris_sterowanie: "← → ruch · ↑ obrót · ↓ szybciej · spacja: zrzut · P: pauza",

        // rajdówka
        rajd_nazwa: "Rajd",
        rajd_czas: "Czas:",
        rajd_okrazenie: "Okrążenie:",
        rajd_okrazenia: "Okrążenia:",
        rajd_predkosc: "Prędkość:",
        rajd_nawierzchnia: "Nawierzchnia:",
        rajd_najlepszy: "Najlepszy:",
        rajd_sterowanie: "Strzałki / WASD: jazda   Q/E: trasa   Spacja: ręczny   R: restart",
        rajd_wybor_mapy: "Q / E: wybierz trasę",
        rajd_mapa: "Trasa:",
        rajd_mapa_lesna: "Leśna",
        rajd_mapa_pustynna: "Pustynna",
        rajd_mapa_gorska: "Górska",
        rajd_mapa_nadrzeczna: "Nadrzeczna",
        rajd_ruszaj: "Naciśnij strzałkę, aby ruszyć",
        rajd_meta: "META!",
        rajd_top3: "NAJLEPSZE CZASY",
        rajd_jeszcze_raz: "R: jeszcze raz",
        nawierz_asfalt: "asfalt",
        nawierz_piasek: "piasek",
        nawierz_zwir: "żwir",
        nawierz_trawa: "trawa",
        nawierz_blato: "błoto"
    },

    en: {
        tytul_strony: "Arcade | Choose a game",
        motyw_jasny: "Light theme",
        motyw_ciemny: "Dark theme",
        podtytul: "Five games. One player. Pick one and beat the record!",
        wyzwanie_etykieta: "DAILY CHALLENGE",
        "wyzwanie-dzis": "Today's target:",
        "wyzwanie-opis": "Beat your record and claim the glory!",
        "wyzwanie-koniec": "Next challenge in",
        "wyzwanie-graj": "Take the challenge →",
        osiagniecia_tytul: "Your achievements",
        osiagniecia_opis: "Play, score points and unlock badges.",
        osiagniecia_licznik: "Unlocked: {odblokowane}/{razem}",
        osiagniecie_flappy: "Steady wings",
        osiagniecie_flappy_opis: "Score 10 points in Flappy.",
        osiagniecie_snake: "Unstoppable snake",
        osiagniecie_snake_opis: "Score 10 points in Snake.",
        osiagniecie_rajd: "Finish line!",
        osiagniecie_rajd_opis: "Complete three laps in Rally.",
        osiagniecie_breakout: "Brick breaker",
        osiagniecie_breakout_opis: "Score 300 points in Breakout.",
        osiagniecie_tetris: "Tetris master",
        osiagniecie_tetris_opis: "Score 500 points in Tetris.",
        osiagniecie_odblokowane: "Unlocked",
        osiagniecie_zamkniete: "In progress",
        snake_nazwa: "Snake",
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
        rajd_opis: "Choose from 4 long tracks and race 3 laps. Watch out for sand, gravel and mud!",
        rajd_ster: "⌨️ Arrows or WASD, Q/E changes track, Space is the handbrake",
        graj_rajd: "▶ Play Rally",
        breakout_nazwa: "Breakout",
        breakout_opis: "Bounce the ball with your paddle, smash the bricks and keep the ball in play!",
        breakout_ster: "⌨️ Arrows or A/D, mouse or touch · P: pause",
        breakout_poziom: "Level",
        breakout_wybierz_poziom: "Choose a level",
        breakout_poziom_1: "Level 1",
        breakout_poziom_2: "Level 2",
        breakout_poziom_3: "Level 3",
        breakout_poziom_4: "Level 4",
        breakout_poziom_5: "Level 5",
        breakout_zmiana_poziomu: "Changing the level starts a new game.",
        graj_breakout: "▶ Play Breakout",
        tetris_nazwa: "Tetris",
        tetris_opis: "Stack falling blocks, clear rows and score points.",
        tetris_ster: "⌨️ ← → move, ↑ rotate, ↓ faster, Space: drop, P: pause",
        graj_tetris: "▶ Play Tetris",
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
        breakout_start: "Click or press Space to start",
        breakout_kontynuuj: "Click or press Space to launch the ball",
        breakout_pauza: "PAUSED",
        breakout_pauza_info: "Press P to resume",
        breakout_koniec: "GAME OVER",
        breakout_wygrana: "ALL BRICKS CLEARED!",
        breakout_zycia: "Lives:",
        breakout_ponownie: "Click or press Space to play again",
        tetris_wynik: "Score:",
        tetris_poziom: "Level:",
        tetris_rzedow: "Lines:",
        tetris_start: "Press Space or click to start",
        tetris_pauzuj: "Pause",
        tetris_pauza: "PAUSED",
        tetris_pauza_info: "Press P to resume",
        tetris_koniec: "GAME OVER",
        tetris_ponownie: "Space or click: play again",
        tetris_sterowanie: "← → move · ↑ rotate · ↓ faster · Space: drop · P: pause",

        rajd_nazwa: "Rally",
        rajd_czas: "Time:",
        rajd_okrazenie: "Lap:",
        rajd_okrazenia: "Laps:",
        rajd_predkosc: "Speed:",
        rajd_nawierzchnia: "Surface:",
        rajd_najlepszy: "Best:",
        rajd_sterowanie: "Arrows / WASD: drive   Q/E: track   Space: handbrake   R: restart",
        rajd_wybor_mapy: "Q / E: choose a track",
        rajd_mapa: "Track:",
        rajd_mapa_lesna: "Forest",
        rajd_mapa_pustynna: "Desert",
        rajd_mapa_gorska: "Mountain",
        rajd_mapa_nadrzeczna: "Riverside",
        rajd_ruszaj: "Press an arrow key to start",
        rajd_meta: "FINISH!",
        rajd_top3: "BEST TIMES",
        rajd_jeszcze_raz: "R: try again",
        nawierz_asfalt: "asphalt",
        nawierz_piasek: "sand",
        nawierz_zwir: "gravel",
        nawierz_trawa: "grass",
        nawierz_blato: "mud"
    }
};

// Aktualny język (zapisany w przeglądarce, domyślnie polski)
let jezyk = localStorage.getItem("jezyk");
if (!TLUMACZENIA[jezyk]) jezyk = "pl";
// Motyw jest wspólny dla wszystkich stron i domyślnie pozostaje ciemny.
let motyw = localStorage.getItem("motyw") === "jasny" ? "jasny" : "ciemny";

// Zwraca tekst w aktualnym języku. Gdy brakuje tłumaczenia, bierze polski.
function t(klucz) {
    // Brak tłumaczenia w bieżącym języku nie blokuje strony: używamy polskiego tekstu.
    return TLUMACZENIA[jezyk][klucz] || TLUMACZENIA.pl[klucz] || klucz;
}

// Dopasowuje ikonę i nazwę przycisku do motywu, który można włączyć.
function aktualizujPrzelacznikMotywu() {
    // Etykieta i ikona opisują motyw, który można włączyć po kliknięciu.
    document.querySelectorAll("[data-motyw-przelacz]").forEach(function (przycisk) {
        const jasnyMotyw = motyw === "ciemny";
        const etykieta = t(jasnyMotyw ? "motyw_jasny" : "motyw_ciemny");
        przycisk.querySelector("[data-motyw-etykieta]").textContent = etykieta;
        przycisk.setAttribute("aria-label", etykieta);
        przycisk.querySelector("[aria-hidden]").textContent = jasnyMotyw ? "☀️" : "🌙";
    });
}

// Podmienia wszystkie teksty oznaczone data-i18n na stronie
function przetlumaczStrone() {
    document.documentElement.lang = jezyk;

    // Atrybuty data-i18n łączą element HTML z kluczami w tabeli tłumaczeń.
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
    aktualizujPrzelacznikMotywu();
}

// Zapisuje wybór języka, odświeża teksty oraz dane menu głównego.
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

document.documentElement.dataset.theme = motyw === "jasny" ? "light" : "dark";
document.body.dataset.theme = motyw === "jasny" ? "light" : "dark";
// Ustawiamy motyw na obu elementach, bo style stron mogą odwoływać się do html albo body.
// Obsługuje zmianę motywu, zapisuje ją i aktualizuje kolory bieżącej strony.
document.querySelectorAll("[data-motyw-przelacz]").forEach(function (przycisk) {
    przycisk.addEventListener("click", function () {
        motyw = motyw === "ciemny" ? "jasny" : "ciemny";
        localStorage.setItem("motyw", motyw);
        document.documentElement.dataset.theme = motyw === "jasny" ? "light" : "dark";
        document.body.dataset.theme = motyw === "jasny" ? "light" : "dark";
        aktualizujPrzelacznikMotywu();
    });
});

przetlumaczStrone();