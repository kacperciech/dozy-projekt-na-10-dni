const canvas = document.getElementById("gra");
const ctx = canvas.getContext("2d");
const loginEkran = document.getElementById("login-ekran");
const graKontener = document.getElementById("gra-kontener");
const nickInput = document.getElementById("nick-input");
const zalogujBtn = document.getElementById("zaloguj-btn");
const wylogujBtn = document.getElementById("wyloguj-btn");
const loginBlad = document.getElementById("login-blad");
const nickWyswietl = document.getElementById("nick-wyswietl");
const tabelaEl = document.getElementById("tabela");
const rekordEl = document.getElementById("rekord-wyswietl");
const wynikEl = document.getElementById("wynik-wyswietl");
const poziomEl = document.getElementById("poziom-wyswietl");
const rzedyEl = document.getElementById("rzedy-wyswietl");
const pauzaBtn = document.getElementById("pauza-btn");

const KOLUMNY = 10;
const WIERSZE = 20;
const ROZMIAR = 30;
const KLOCKI = [
    { ksztalt: [[1, 1, 1, 1]], kolor: "#43d9e8" },
    { ksztalt: [[1, 0, 0], [1, 1, 1]], kolor: "#4779ee" },
    { ksztalt: [[0, 0, 1], [1, 1, 1]], kolor: "#f2a541" },
    { ksztalt: [[1, 1], [1, 1]], kolor: "#f2d64b" },
    { ksztalt: [[0, 1, 1], [1, 1, 0]], kolor: "#54d17a" },
    { ksztalt: [[0, 1, 0], [1, 1, 1]], kolor: "#b66bea" },
    { ksztalt: [[1, 1, 0], [0, 1, 1]], kolor: "#ef5a70" }
];

let nick = localStorage.getItem("nick") || "";
let plansza;
let klocek;
let wynik = 0;
let rekord = 0;
let poziom = 1;
let rzedy = 0;
let stan = "start";
let czasOpadania = 0;
let ostatniCzas = 0;

document.title = t("tetris_nazwa");

function wczytajWyniki() {
    try {
        return JSON.parse(localStorage.getItem("wyniki_tetris")) || {};
    } catch (e) {
        return {};
    }
}

function zapiszWynik() {
    const wyniki = wczytajWyniki();
    if (wynik > (Number(wyniki[nick]) || 0)) {
        wyniki[nick] = wynik;
        localStorage.setItem("wyniki_tetris", JSON.stringify(wyniki));
    }
    rekord = Number(wyniki[nick]) || 0;
    rekordEl.textContent = rekord;
    odswiezTabele();
}

function odswiezTabele() {
    const lista = Object.entries(wczytajWyniki())
        .sort(function (a, b) { return Number(b[1]) - Number(a[1]); })
        .slice(0, 10);

    tabelaEl.innerHTML = "";
    if (lista.length === 0) {
        tabelaEl.textContent = t("brak_wynikow");
        return;
    }

    lista.forEach(function (pozycja) {
        const li = document.createElement("li");
        const imie = document.createElement("span");
        const punkty = document.createElement("span");
        imie.textContent = pozycja[0];
        punkty.textContent = pozycja[1];
        punkty.className = "pkt";
        if (pozycja[0] === nick) li.className = "ja";
        li.appendChild(imie);
        li.appendChild(punkty);
        tabelaEl.appendChild(li);
    });
}

function pokazGre() {
    loginEkran.classList.add("hidden");
    graKontener.classList.remove("hidden");
    nickWyswietl.textContent = nick;
    rekord = Number(wczytajWyniki()[nick]) || 0;
    rekordEl.textContent = rekord;
    odswiezTabele();
    reset();
    canvas.focus();
}

function zaloguj() {
    const wpisany = nickInput.value.trim();
    if (wpisany.length < 2) {
        loginBlad.textContent = t("blad_nick");
        return;
    }
    nick = wpisany;
    localStorage.setItem("nick", nick);
    loginBlad.textContent = "";
    pokazGre();
    document.activeElement.blur();
}

function wyloguj() {
    nick = "";
    stan = "start";
    localStorage.removeItem("nick");
    nickInput.value = "";
    loginEkran.classList.remove("hidden");
    graKontener.classList.add("hidden");
    document.activeElement.blur();
    nickInput.focus();
}

function reset() {
    plansza = Array.from({ length: WIERSZE }, function () {
        return Array(KOLUMNY).fill("");
    });
    wynik = 0;
    poziom = 1;
    rzedy = 0;
    czasOpadania = 0;
    stan = "start";
    aktualizujStatystyki();
    utworzKlocek();
    rysuj();
}

function utworzKlocek() {
    const typ = KLOCKI[Math.floor(Math.random() * KLOCKI.length)];
    klocek = {
        ksztalt: typ.ksztalt.map(function (wiersz) { return wiersz.slice(); }),
        kolor: typ.kolor,
        x: Math.floor((KOLUMNY - typ.ksztalt[0].length) / 2),
        y: 0
    };
    if (kolizja(klocek, 0, 0, klocek.ksztalt)) zakonczGre();
}

function kolizja(aktywny, dx, dy, ksztalt) {
    for (let y = 0; y < ksztalt.length; y++) {
        for (let x = 0; x < ksztalt[y].length; x++) {
            if (!ksztalt[y][x]) continue;
            const planszaX = aktywny.x + x + dx;
            const planszaY = aktywny.y + y + dy;
            if (planszaX < 0 || planszaX >= KOLUMNY || planszaY >= WIERSZE) return true;
            if (planszaY >= 0 && plansza[planszaY][planszaX]) return true;
        }
    }
    return false;
}

function obroc(ksztalt) {
    return ksztalt[0].map(function (_, kolumna) {
        return ksztalt.map(function (wiersz) { return wiersz[kolumna]; }).reverse();
    });
}

function obrocKlocek() {
    const nowyKsztalt = obroc(klocek.ksztalt);
    const przesuniecia = [0, -1, 1, -2, 2];
    for (let i = 0; i < przesuniecia.length; i++) {
        if (!kolizja(klocek, przesuniecia[i], 0, nowyKsztalt)) {
            klocek.x += przesuniecia[i];
            klocek.ksztalt = nowyKsztalt;
            rysuj();
            return;
        }
    }
}

function przesun(dx, dy) {
    if (!kolizja(klocek, dx, dy, klocek.ksztalt)) {
        klocek.x += dx;
        klocek.y += dy;
        return true;
    }
    return false;
}

function zablokujKlocek() {
    klocek.ksztalt.forEach(function (wiersz, y) {
        wiersz.forEach(function (wartosc, x) {
            const planszaY = klocek.y + y;
            if (wartosc && planszaY >= 0) plansza[planszaY][klocek.x + x] = klocek.kolor;
        });
    });

    let wyczyszczone = 0;
    plansza = plansza.filter(function (wiersz) {
        if (wiersz.every(Boolean)) {
            wyczyszczone++;
            return false;
        }
        return true;
    });
    while (plansza.length < WIERSZE) plansza.unshift(Array(KOLUMNY).fill(""));

    if (wyczyszczone > 0) {
        const punktyZaRzedy = [0, 100, 300, 500, 800];
        wynik += punktyZaRzedy[wyczyszczone] * poziom;
        rzedy += wyczyszczone;
        poziom = Math.floor(rzedy / 10) + 1;
        aktualizujStatystyki();
    }
    utworzKlocek();
}

function aktualizujStatystyki() {
    wynikEl.textContent = wynik;
    poziomEl.textContent = poziom;
    rzedyEl.textContent = rzedy;
}

function zakonczGre() {
    stan = "koniec";
    zapiszWynik();
}

function rozpocznij() {
    if (stan === "koniec") reset();
    stan = "gra";
    ostatniCzas = 0;
    canvas.focus();
}

function przelaczPauze() {
    if (stan === "gra") {
        stan = "pauza";
    } else if (stan === "pauza") {
        stan = "gra";
        ostatniCzas = 0;
    }
}

function akcja(typ) {
    if (stan !== "gra") {
        if (typ === "start" && (stan === "start" || stan === "koniec")) rozpocznij();
        return;
    }
    if (typ === "lewo") przesun(-1, 0);
    if (typ === "prawo") przesun(1, 0);
    if (typ === "dol" && przesun(0, 1)) {
        wynik++;
        aktualizujStatystyki();
    } else if (typ === "dol") {
        zablokujKlocek();
    }
    if (typ === "obrot") obrocKlocek();
    if (typ === "zrzut") {
        let odleglosc = 0;
        while (przesun(0, 1)) odleglosc++;
        wynik += odleglosc * 2;
        aktualizujStatystyki();
        zablokujKlocek();
    }
    rysuj();
}

function kolorujPole(x, y, kolor) {
    ctx.fillStyle = kolor;
    ctx.fillRect(x * ROZMIAR + 1, y * ROZMIAR + 1, ROZMIAR - 2, ROZMIAR - 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.24)";
    ctx.strokeRect(x * ROZMIAR + 1.5, y * ROZMIAR + 1.5, ROZMIAR - 3, ROZMIAR - 3);
}

function rysujKsztalt(aktywny, yOffset, przezroczystosc) {
    ctx.globalAlpha = przezroczystosc;
    aktywny.ksztalt.forEach(function (wiersz, y) {
        wiersz.forEach(function (wartosc, x) {
            const poleY = aktywny.y + y + yOffset;
            if (wartosc && poleY >= 0) kolorujPole(aktywny.x + x, poleY, aktywny.kolor);
        });
    });
    ctx.globalAlpha = 1;
}

function rysujNakladke(tytul, opis) {
    ctx.fillStyle = "rgba(10, 15, 28, 0.78)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 27px Arial";
    ctx.fillText(tytul, canvas.width / 2, canvas.height / 2 - 12);
    ctx.font = "15px Arial";
    ctx.fillStyle = "#c6d0e6";
    ctx.fillText(opis, canvas.width / 2, canvas.height / 2 + 22, canvas.width - 24);
}

function rysuj() {
    ctx.fillStyle = "#101827";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= KOLUMNY; x++) {
        ctx.beginPath();
        ctx.moveTo(x * ROZMIAR + 0.5, 0);
        ctx.lineTo(x * ROZMIAR + 0.5, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= WIERSZE; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * ROZMIAR + 0.5);
        ctx.lineTo(canvas.width, y * ROZMIAR + 0.5);
        ctx.stroke();
    }
    plansza.forEach(function (wiersz, y) {
        wiersz.forEach(function (kolor, x) {
            if (kolor) kolorujPole(x, y, kolor);
        });
    });
    if (klocek) {
        let ghostY = 0;
        while (!kolizja(klocek, 0, ghostY + 1, klocek.ksztalt)) ghostY++;
        rysujKsztalt(klocek, ghostY, 0.2);
        rysujKsztalt(klocek, 0, 1);
    }

    if (stan === "start") rysujNakladke(t("tetris_nazwa"), t("tetris_start"));
    if (stan === "pauza") rysujNakladke(t("tetris_pauza"), t("tetris_pauza_info"));
    if (stan === "koniec") rysujNakladke(t("tetris_koniec"), t("tetris_ponownie"));
}

function petla(czas) {
    if (stan === "gra") {
        const delta = ostatniCzas ? Math.min(czas - ostatniCzas, 100) : 0;
        czasOpadania += delta;
        ostatniCzas = czas;
        const interwal = Math.max(90, 800 - (poziom - 1) * 65);
        if (czasOpadania >= interwal) {
            czasOpadania = 0;
            if (!przesun(0, 1)) zablokujKlocek();
            aktualizujStatystyki();
        }
        rysuj();
    }
    requestAnimationFrame(petla);
}

document.addEventListener("keydown", function (e) {
    if (nick === "" || graKontener.classList.contains("hidden")) return;
    const klawisz = e.key.toLowerCase();
    const klawiszeSterowania = ["arrowleft", "arrowright", "arrowdown", "arrowup", " ", "a", "d", "s", "w", "p", "enter"];
    if (klawiszeSterowania.includes(klawisz)) e.preventDefault();

    if (klawisz === "p") {
        przelaczPauze();
        rysuj();
    } else if (klawisz === " " || klawisz === "enter") {
        if (stan === "start" || stan === "koniec") {
            akcja("start");
        } else if (klawisz === " " && stan === "gra" && !e.repeat) {
            akcja("zrzut");
        }
    } else if (stan === "gra") {
        if (klawisz === "arrowleft" || klawisz === "a") akcja("lewo");
        if (klawisz === "arrowright" || klawisz === "d") akcja("prawo");
        if (klawisz === "arrowdown" || klawisz === "s") akcja("dol");
        if (klawisz === "arrowup" || klawisz === "w" || klawisz === "x") akcja("obrot");
    }
});

canvas.addEventListener("click", function () {
    if (stan === "start" || stan === "koniec") rozpocznij();
});

document.querySelectorAll("[data-ruch]").forEach(function (przycisk) {
    przycisk.addEventListener("click", function () {
        const ruch = przycisk.dataset.ruch;
        if (stan === "start" || stan === "koniec") {
            rozpocznij();
            return;
        }
        akcja(ruch);
    });
});

pauzaBtn.addEventListener("click", function () {
    przelaczPauze();
    rysuj();
});

zalogujBtn.addEventListener("click", zaloguj);
nickInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") zaloguj();
});
wylogujBtn.addEventListener("click", wyloguj);

if (nick !== "") pokazGre();
else nickInput.focus();

requestAnimationFrame(petla);
