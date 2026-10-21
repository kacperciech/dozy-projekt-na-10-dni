// Wspólny plik tłumaczeń i motywu. Musi być ładowany przed skryptami każdej strony.
const TLUMACZENIA = {
    pl: {
        tytul_strony: "Arcade | Wybierz grę",
        motyw_jasny: "Jasny motyw",
        motyw_ciemny: "Ciemny motyw",
        soundtrack_play: "Włącz spokojny soundtrack",
        soundtrack_stop: "Wyłącz soundtrack",
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
        flappy_skok: "↑ Skok",
        twoj_rekord: "Twój rekord:",
        twoj_czas: "Twój najlepszy czas:",
        top3: "🏆 TOP 3",
        top3_czasy: "🏆 Najlepsze czasy",
        czy_wiesz: "💡 Czy wiesz, że...",
        kolejna: "Kolejna ciekawostka ↻",
        graj_flappy: "▶ Graj we Flappy",
        snake_opis: "Zjadaj jabłka, rośnij i nie wjedź w siebie. Z każdym punktem jest szybciej.",
        snake_ster: "⌨️ Strzałki lub WASD, P to pauza · 📱 gesty i przyciski",
        graj_snake: "▶ Graj w Snake",
        rajd_opis: "Wybierz jedną z 4 długich tras i przejedź 3 okrążenia. Uważaj na piasek, żwir i błoto!",
        rajd_ster: "⌨️ Strzałki lub WASD, Q/E zmienia trasę · 📱 przyciski na ekranie",
        graj_rajd: "▶ Jedź w Rajdzie",
        breakout_nazwa: "Breakout",
        breakout_opis: "Odbijaj piłkę paletką, rozbij cegiełki i nie pozwól jej spaść!",
        breakout_ster: "⌨️ Strzałki lub A/D, mysz albo dotyk · P: pauza",
        breakout_pauzuj: "Pauza",
        breakout_wznow: "Wznów",
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
        tetris_ster: "⌨️ ← → ruch, ↑ obrót, ↓ szybciej, spacja: zrzut, P: pauza · 📱 przyciski",
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
        snake_panel_3: "Telefon: przesuń palcem lub użyj przycisków",
        snake_pauzuj: "Pauza",
        snake_wznow: "Wznów",
        kontrolka_gora: "W górę",
        kontrolka_dol: "W dół",
        kontrolka_lewo: "W lewo",
        kontrolka_prawo: "W prawo",

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
        tetris_wznow: "Wznów",
        tetris_pauza: "PAUZA",
        tetris_pauza_info: "Naciśnij P, aby wrócić do gry",
        tetris_koniec: "KONIEC GRY",
        tetris_ponownie: "Spacja lub kliknij: jeszcze raz",
        tetris_sterowanie: "← → ruch · ↑ obrót · ↓ szybciej · spacja: zrzut · P: pauza · przyciski dotykowe",

        // rajdówka
        rajd_nazwa: "Rajd",
        rajd_czas: "Czas:",
        rajd_okrazenie: "Okrążenie:",
        rajd_okrazenia: "Okrążenia:",
        rajd_predkosc: "Prędkość:",
        rajd_nawierzchnia: "Nawierzchnia:",
        rajd_najlepszy: "Najlepszy:",
        rajd_sterowanie: "Strzałki / WASD: jazda   Q/E: trasa   Spacja: ręczny   R: restart",
        rajd_gaz: "↑ Gaz",
        rajd_hamulec: "↓ Hamulec",
        rajd_reczny: "Ręczny",
        rajd_poprzednia_trasa: "◀ Trasa",
        rajd_nastepna_trasa: "Trasa ▶",
        rajd_restart: "Restart",
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
        soundtrack_play: "Play calm soundtrack",
        soundtrack_stop: "Turn soundtrack off",
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
        flappy_skok: "↑ Flap",
        twoj_rekord: "Your record:",
        twoj_czas: "Your best time:",
        top3: "🏆 TOP 3",
        top3_czasy: "🏆 Best times",
        czy_wiesz: "💡 Did you know...",
        kolejna: "Next fact ↻",
        graj_flappy: "▶ Play Flappy",
        snake_opis: "Eat apples, grow longer and don't run into yourself. Every point makes it faster.",
        snake_ster: "⌨️ Arrows or WASD, P to pause · 📱 swipe or buttons",
        graj_snake: "▶ Play Snake",
        rajd_opis: "Choose from 4 long tracks and race 3 laps. Watch out for sand, gravel and mud!",
        rajd_ster: "⌨️ Arrows or WASD, Q/E changes track · 📱 on-screen buttons",
        graj_rajd: "▶ Play Rally",
        breakout_nazwa: "Breakout",
        breakout_opis: "Bounce the ball with your paddle, smash the bricks and keep the ball in play!",
        breakout_ster: "⌨️ Arrows or A/D, mouse or touch · P: pause",
        breakout_pauzuj: "Pause",
        breakout_wznow: "Resume",
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
        tetris_ster: "⌨️ ← → move, ↑ rotate, ↓ faster, Space: drop, P: pause · 📱 buttons",
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
        snake_panel_3: "Phone: swipe or use the buttons",
        snake_pauzuj: "Pause",
        snake_wznow: "Resume",
        kontrolka_gora: "Up",
        kontrolka_dol: "Down",
        kontrolka_lewo: "Left",
        kontrolka_prawo: "Right",

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
        tetris_wznow: "Resume",
        tetris_pauza: "PAUSED",
        tetris_pauza_info: "Press P to resume",
        tetris_koniec: "GAME OVER",
        tetris_ponownie: "Space or click: play again",
        tetris_sterowanie: "← → move · ↑ rotate · ↓ faster · Space: drop · P: pause · touch buttons",

        rajd_nazwa: "Rally",
        rajd_czas: "Time:",
        rajd_okrazenie: "Lap:",
        rajd_okrazenia: "Laps:",
        rajd_predkosc: "Speed:",
        rajd_nawierzchnia: "Surface:",
        rajd_najlepszy: "Best:",
        rajd_sterowanie: "Arrows / WASD: drive   Q/E: track   Space: handbrake   R: restart",
        rajd_gaz: "↑ Gas",
        rajd_hamulec: "↓ Brake",
        rajd_reczny: "Handbrake",
        rajd_poprzednia_trasa: "◀ Track",
        rajd_nastepna_trasa: "Track ▶",
        rajd_restart: "Restart",
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

// Wspólny zegar aktualizuje logikę 60 razy na sekundę, niezależnie od odświeżania ekranu.
function uruchomPetleGry(aktualizuj, rysuj) {
    const krok = 1000 / 60;
    let poprzedniCzas = 0;
    let akumulator = 0;

    function klatka(czas) {
        if (poprzedniCzas) {
            akumulator += Math.min(czas - poprzedniCzas, 250);
        }
        poprzedniCzas = czas;

        while (akumulator >= krok) {
            aktualizuj(krok / 1000);
            akumulator -= krok;
        }

        rysuj();
        requestAnimationFrame(klatka);
    }

    // Po powrocie do karty nie nadrabiamy czasu, gdy gra była niewidoczna.
    document.addEventListener("visibilitychange", function () {
        poprzedniCzas = 0;
        akumulator = 0;
    });

    requestAnimationFrame(klatka);
}

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
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
        el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel));
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

// Dźwięki są generowane lokalnie przez Web Audio, bez zewnętrznych plików.
window.dzwiekGier = (function () {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        let audioContext = null;
        let silnikAudio = document.getElementById("rajd-silnik");
        let gruchanieAudio = document.getElementById("flappy-gruchanie");
        let biegSilnika = 1;
        let ostatniaZmianaBiegu = -Infinity;
        let koniecZmianyBiegu = 0;
        let korektaBiegu = 1;
        let muzykaTimer = null;
        let nutaMuzyki = 0;
        let ambientBus = null;
        let ambientTimer = null;
        let ambientKrok = 0;
        const melodia = [659, 494, 523, 587, 523, 494, 440, 440, 523, 659, 587, 523, 494, 523, 587, 659];
        const ambientAkordy = [
            [130.81, 164.81, 196.00, 246.94],
            [110.00, 146.83, 164.81, 220.00],
            [87.31, 130.81, 174.61, 220.00],
            [98.00, 146.83, 196.00, 246.94]
        ];
        const PROGI_BIEGOW = [0, 90, 170, 255, 345, 440, 560];
        const GORA_BIEGOW = [90, 170, 255, 345, 440, 560];

        if (silnikAudio) {
            silnikAudio.addEventListener("error", function () {
                console.error("Nie udało się wczytać pliku rally-engine.wav.", silnikAudio.error);
            });
        }

        function kontekst() {
            if (!AudioContextClass) return null;
            if (!audioContext) audioContext = new AudioContextClass();
            if (audioContext.state === "suspended") audioContext.resume();
            return audioContext;
        }

        function ton(czestotliwosc, czas, opcje) {
            const audio = kontekst();
            if (!audio) return;
            const ustawienia = opcje || {};
            const oscylator = audio.createOscillator();
            const glosnosc = audio.createGain();
            const start = audio.currentTime + (ustawienia.opoznienie || 0);
            const koniec = start + czas;
            oscylator.type = ustawienia.typ || "sine";
            oscylator.frequency.setValueAtTime(czestotliwosc, start);
            if (ustawienia.koniec) {
                oscylator.frequency.exponentialRampToValueAtTime(ustawienia.koniec, koniec);
            }
            glosnosc.gain.setValueAtTime(0.0001, start);
            glosnosc.gain.exponentialRampToValueAtTime(ustawienia.glosnosc || 0.08, start + 0.01);
            glosnosc.gain.exponentialRampToValueAtTime(0.0001, koniec);
            oscylator.connect(glosnosc);
            glosnosc.connect(audio.destination);
            oscylator.start(start);
            oscylator.stop(koniec + 0.02);
            oscylator.onended = function () {
                oscylator.disconnect();
                glosnosc.disconnect();
            };
        }

        function szum(czas, glosnoscMaks, czestotliwosc) {
            const audio = kontekst();
            if (!audio) return;
            const probki = Math.ceil(audio.sampleRate * czas);
            const bufor = audio.createBuffer(1, probki, audio.sampleRate);
            const dane = bufor.getChannelData(0);
            for (let i = 0; i < probki; i++) dane[i] = Math.random() * 2 - 1;
            const zrodlo = audio.createBufferSource();
            const filtr = audio.createBiquadFilter();
            const glosnosc = audio.createGain();
            zrodlo.buffer = bufor;
            filtr.type = "lowpass";
            filtr.frequency.value = czestotliwosc;
            glosnosc.gain.setValueAtTime(glosnoscMaks, audio.currentTime);
            glosnosc.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + czas);
            zrodlo.connect(filtr);
            filtr.connect(glosnosc);
            glosnosc.connect(audio.destination);
            zrodlo.start();
            zrodlo.onended = function () {
                zrodlo.disconnect();
                filtr.disconnect();
                glosnosc.disconnect();
            };
        }

        function nutaAmbientu(czestotliwosc, czas, maksGlosnosc, typ) {
            const audio = kontekst();
            if (!audio || !ambientBus) return;
            const oscylator = audio.createOscillator();
            const glosnosc = audio.createGain();
            const start = audio.currentTime + 0.03;
            const koniec = start + czas;
            oscylator.type = typ;
            oscylator.frequency.setValueAtTime(czestotliwosc, start);
            glosnosc.gain.setValueAtTime(0.0001, start);
            glosnosc.gain.exponentialRampToValueAtTime(maksGlosnosc, start + Math.min(0.8, czas * 0.25));
            glosnosc.gain.setValueAtTime(maksGlosnosc, koniec - Math.min(0.8, czas * 0.25));
            glosnosc.gain.exponentialRampToValueAtTime(0.0001, koniec);
            oscylator.connect(glosnosc);
            glosnosc.connect(ambientBus);
            oscylator.start(start);
            oscylator.stop(koniec + 0.02);
            oscylator.onended = function () {
                oscylator.disconnect();
                glosnosc.disconnect();
            };
        }

        function krokAmbientu() {
            const numerAkordu = Math.floor(ambientKrok / 3) % ambientAkordy.length;
            const akord = ambientAkordy[numerAkordu];
            if (ambientKrok % 3 === 0) {
                akord.forEach(function (czestotliwosc, indeks) {
                    nutaAmbientu(czestotliwosc, 6.1, [0.012, 0.008, 0.006, 0.004][indeks], "sine");
                });
            }
            const nuta = akord[(ambientKrok % 3 + 1) % akord.length];
            nutaAmbientu(nuta * 2, 1.8, 0.007, "triangle");
            ambientKrok++;
        }

        function zatrzymajSilnik() {
            if (silnikAudio) {
                silnikAudio.pause();
                silnikAudio.currentTime = 0;
            }
            biegSilnika = 1;
            ostatniaZmianaBiegu = -Infinity;
            koniecZmianyBiegu = 0;
            korektaBiegu = 1;
        }

        return {
            odblokuj: kontekst,
            gruchanie: function () {
                if (gruchanieAudio) {
                    gruchanieAudio.currentTime = 0;
                    gruchanieAudio.play().catch(function (error) {
                        if (error.name === "AbortError" && gruchanieAudio.paused) return;
                        console.error("Nie udało się odtworzyć pliku flappy-coo.wav:", error);
                    });
                    return;
                }
                ton(390, 0.18, { typ: "triangle", koniec: 230, glosnosc: 0.12 });
                ton(270, 0.24, { typ: "sine", koniec: 180, glosnosc: 0.1, opoznienie: 0.11 });
            },
            ugryzienie: function () {
                ton(520, 0.09, { typ: "square", koniec: 760, glosnosc: 0.055 });
                ton(760, 0.12, { typ: "triangle", koniec: 420, glosnosc: 0.07, opoznienie: 0.07 });
            },
            cegla: function () {
                szum(0.1, 0.055, 1500);
                ton(210, 0.12, { typ: "square", koniec: 95, glosnosc: 0.045 });
            },
            silnik: function (predkosc, gaz, hamulec) {
                if (!silnikAudio) return;
                const teraz = audioContext ? audioContext.currentTime : performance.now() / 1000;
                const predkoscJazdy = Math.abs(predkosc);
                let zmianaBiegu = 0;
                if (teraz - ostatniaZmianaBiegu > 0.45) {
                    if (biegSilnika < 6 && predkoscJazdy >= PROGI_BIEGOW[biegSilnika] * 0.96) {
                        biegSilnika++;
                        zmianaBiegu = 1;
                    } else if (biegSilnika > 1 &&
                        predkoscJazdy < PROGI_BIEGOW[biegSilnika - 1] * 0.72) {
                        biegSilnika--;
                        zmianaBiegu = -1;
                    }
                }

                if (zmianaBiegu !== 0) {
                    ostatniaZmianaBiegu = teraz;
                    korektaBiegu = zmianaBiegu > 0 ? 0.72 : 1.16;
                    koniecZmianyBiegu = teraz + 0.16;
                }

                const poprzedniProg = PROGI_BIEGOW[biegSilnika - 1];
                const nastepnyProg = GORA_BIEGOW[biegSilnika - 1];
                const obroty = Math.max(0, Math.min(1, (predkoscJazdy - poprzedniProg) / (nastepnyProg - poprzedniProg)));
                const obrotySilnika = 0.72 + obroty * 0.78 + (gaz ? 0.12 : -0.08);
                const biegAktywny = teraz < koniecZmianyBiegu ? korektaBiegu : 1;

                silnikAudio.playbackRate = Math.max(0.65, Math.min(1.75, obrotySilnika * biegAktywny));
                silnikAudio.volume = predkoscJazdy < 3 && !gaz
                    ? 0.16
                    : Math.max(0.18, Math.min(0.72, 0.28 + obroty * 0.2 + (gaz ? 0.24 : 0) - (hamulec ? 0.12 : 0)));
                if (silnikAudio.paused) {
                    silnikAudio.play().catch(function (error) {
                        if (error.name === "AbortError" && silnikAudio.paused) return;
                        console.error("Nie udało się odtworzyć dźwięku silnika:", error);
                    });
                }
            },
            zatrzymajSilnik: zatrzymajSilnik,
            muzykaTetris: function (wlacz) {
                if (!wlacz) {
                    if (muzykaTimer !== null) window.clearInterval(muzykaTimer);
                    muzykaTimer = null;
                    return;
                }
                if (muzykaTimer !== null) return;
                kontekst();
                nutaMuzyki = 0;
                muzykaTimer = window.setInterval(function () {
                    ton(melodia[nutaMuzyki], 0.2, { typ: "triangle", glosnosc: 0.035 });
                    nutaMuzyki = (nutaMuzyki + 1) % melodia.length;
                }, 230);
            },
            muzykaMenu: function (wlacz) {
                const audio = kontekst();
                if (!audio) return;
                if (!wlacz) {
                    if (ambientTimer !== null) window.clearInterval(ambientTimer);
                    ambientTimer = null;
                    if (ambientBus) {
                        const poprzedniaSzyna = ambientBus;
                        poprzedniaSzyna.gain.cancelScheduledValues(audio.currentTime);
                        poprzedniaSzyna.gain.setTargetAtTime(0.0001, audio.currentTime, 0.35);
                        window.setTimeout(function () { poprzedniaSzyna.disconnect(); }, 1800);
                        ambientBus = null;
                    }
                    return;
                }
                if (ambientTimer !== null) return;
                ambientBus = audio.createGain();
                ambientBus.gain.setValueAtTime(0.0001, audio.currentTime);
                ambientBus.gain.exponentialRampToValueAtTime(0.22, audio.currentTime + 2.5);
                ambientBus.connect(audio.destination);
                ambientKrok = 0;
                krokAmbientu();
                ambientTimer = window.setInterval(krokAmbientu, 2000);
            }
        };
})();

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