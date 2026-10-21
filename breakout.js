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
const zyciaEl = document.getElementById("zycia-wyswietl");
const przyciskiPoziomow = document.querySelectorAll(".breakout-poziom-btn");
const pauzaBtn = document.getElementById("breakout-pauza-btn");

const KOLUMNY = 8;
const WIERSZE = 5;
const PUNKTY_ZA_CEGIELKE = 10;
const PREDKOSC_PILKI = 330;
const PALETKA = { w: 92, h: 13, y: canvas.height - 42 };
const PROMIEN = 8;

let nick = localStorage.getItem("nick") || "";
let rekord = 0;
let punkty = 0;
let zycia = 3;
let poziom = 1;
let stan = "start";
let pierwszyStart = true;
let paletkaX = (canvas.width - PALETKA.w) / 2;
let pilki = [];
let cegielki = [];
let boostery = [];

const UKLADY_POZIOMOW = [
    ["########", "###+####", "########", "####+###", "########"],
    ["..##....", ".######.", "########", ".##+##..", "..####.."],
    ["########", "#..##..#", "##.++..#", "#..##..#", "########"],
    ["...##...", "..####..", ".######.", "########", "###+.##."],
    ["#+##.##+", "#.##.##.", "########", ".##++##.", "..####.."]
];
const KOLORY_CEGIELEK = ["#ff5c70", "#ffad42", "#ffe15b", "#62d990", "#56c7e8"];

document.title = t("breakout_nazwa");

function wczytajWyniki() {
    try {
        return JSON.parse(localStorage.getItem("wyniki_breakout")) || {};
    } catch (e) {
        return {};
    }
}

function zapiszWynik() {
    const wyniki = wczytajWyniki();
    if (wyniki[nick] === undefined || punkty > wyniki[nick]) {
        wyniki[nick] = punkty;
        localStorage.setItem("wyniki_breakout", JSON.stringify(wyniki));
    }
    rekord = wyniki[nick];
}

function odswiezTabele() {
    const lista = Object.entries(wczytajWyniki())
        .sort(function (a, b) { return b[1] - a[1]; })
        .slice(0, 10);

    tabelaEl.innerHTML = "";
    if (lista.length === 0) {
        tabelaEl.textContent = t("brak_wynikow");
        return;
    }

    lista.forEach(function (wynik) {
        const li = document.createElement("li");
        const imie = document.createElement("span");
        const pkt = document.createElement("span");
        imie.textContent = wynik[0];
        pkt.textContent = wynik[1];
        pkt.className = "pkt";
        if (wynik[0] === nick) li.className = "ja";
        li.appendChild(imie);
        li.appendChild(pkt);
        tabelaEl.appendChild(li);
    });
}

function pokazGre() {
    loginEkran.classList.add("hidden");
    graKontener.classList.remove("hidden");
    nickWyswietl.textContent = nick;
    rekord = Number(wczytajWyniki()[nick]) || 0;
    reset();
    odswiezTabele();
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
    punkty = 0;
    zycia = 3;
    poziom = 1;
    stan = "start";
    pierwszyStart = true;
    paletkaX = (canvas.width - PALETKA.w) / 2;
    utworzPilke();
    boostery = [];
    utworzCegielki();
    aktualizujZycia();
    aktualizujSelektorPoziomu();
}

function aktualizujSelektorPoziomu() {
    przyciskiPoziomow.forEach(function (przycisk) {
        const aktywny = Number(przycisk.dataset.poziom) === poziom;
        przycisk.setAttribute("aria-pressed", String(aktywny));
    });
}

function wybierzPoziom(numerPoziomu) {
    if (!Number.isInteger(numerPoziomu) ||
        numerPoziomu < 1 ||
        numerPoziomu > UKLADY_POZIOMOW.length ||
        nick === "") return;

    punkty = 0;
    zycia = 3;
    poziom = numerPoziomu;
    stan = "start";
    pierwszyStart = false;
    paletkaX = (canvas.width - PALETKA.w) / 2;
    utworzPilke();
    boostery = [];
    utworzCegielki();
    aktualizujZycia();
    aktualizujSelektorPoziomu();
}

function utworzPilke() {
    pilki = [{
        x: paletkaX + PALETKA.w / 2,
        y: PALETKA.y - PROMIEN,
        dx: 0,
        dy: 0
    }];
}

function utworzCegielki() {
    cegielki = [];
    const szerokosc = 52;
    const wysokosc = 21;
    const odstep = 5;
    const startX = (canvas.width - KOLUMNY * szerokosc - (KOLUMNY - 1) * odstep) / 2;
    const uklad = UKLADY_POZIOMOW[poziom - 1];

    for (let wiersz = 0; wiersz < uklad.length; wiersz++) {
        for (let kolumna = 0; kolumna < uklad[wiersz].length; kolumna++) {
            const typ = uklad[wiersz][kolumna];
            if (typ === ".") continue;
            cegielki.push({
                x: startX + kolumna * (szerokosc + odstep),
                y: 76 + wiersz * 30,
                w: szerokosc,
                h: wysokosc,
                kolor: KOLORY_CEGIELEK[wiersz],
                aktywna: true,
                booster: typ === "+"
            });
        }
    }
}

function aktualizujZycia() {
    zyciaEl.textContent = String(zycia);
}

function koniecGry(wygrana) {
    stan = wygrana ? "wygrana" : "koniec";
    zapiszWynik();
    odswiezTabele();
}

function akcja() {
    if (nick === "") return;
    dzwiekGier.odblokuj();
    if (stan === "start") {
        stan = "gra";
        pierwszyStart = false;
        pilki.forEach(function (pilka) {
            if (pilka.dx === 0 && pilka.dy === 0) {
                pilka.dx = PREDKOSC_PILKI * 0.42;
                pilka.dy = -PREDKOSC_PILKI * 0.91;
            }
        });
    } else if (stan === "pauza") {
        stan = "gra";
    } else if (stan === "koniec" || stan === "wygrana") {
        reset();
    }
}

function ustawPaletke(clientX) {
    const rect = canvas.getBoundingClientRect();
    const pozycja = (clientX - rect.left) * (canvas.width / rect.width);
    paletkaX = Math.max(0, Math.min(canvas.width - PALETKA.w, pozycja - PALETKA.w / 2));
    if (stan === "start") utworzPilke();
}

function dodajPilki(dodatkowaPilka) {
    const liczbaNowychPilek = Math.min(2, 5 - pilki.length);
    const kat = Math.atan2(dodatkowaPilka.dx, -dodatkowaPilka.dy);
    for (let i = 0; i < liczbaNowychPilek; i++) {
        const nowyKat = kat + (i === 0 ? -1 : 1) * Math.PI / 6;
        pilki.push({
            x: dodatkowaPilka.x,
            y: dodatkowaPilka.y,
            dx: PREDKOSC_PILKI * Math.sin(nowyKat),
            dy: -PREDKOSC_PILKI * Math.cos(nowyKat)
        });
    }
}

function aktualizuj(dt) {
    for (let p = pilki.length - 1; p >= 0; p--) {
        const pilka = pilki[p];
        pilka.x += pilka.dx * dt;
        pilka.y += pilka.dy * dt;

        if (pilka.x - PROMIEN <= 0) {
            pilka.x = PROMIEN;
            pilka.dx = Math.abs(pilka.dx);
        } else if (pilka.x + PROMIEN >= canvas.width) {
            pilka.x = canvas.width - PROMIEN;
            pilka.dx = -Math.abs(pilka.dx);
        }
        if (pilka.y - PROMIEN <= 0) {
            pilka.y = PROMIEN;
            pilka.dy = Math.abs(pilka.dy);
        }

        if (pilka.dy > 0 &&
            pilka.y + PROMIEN >= PALETKA.y &&
            pilka.y - PROMIEN <= PALETKA.y + PALETKA.h &&
            pilka.x >= paletkaX - PROMIEN &&
            pilka.x <= paletkaX + PALETKA.w + PROMIEN) {
            const trafienie = (pilka.x - (paletkaX + PALETKA.w / 2)) / (PALETKA.w / 2);
            const kat = trafienie * Math.PI / 3;
            pilka.dx = PREDKOSC_PILKI * Math.sin(kat);
            pilka.dy = -PREDKOSC_PILKI * Math.cos(kat);
            pilka.y = PALETKA.y - PROMIEN;
        }

        for (let i = 0; i < cegielki.length; i++) {
            const cegielka = cegielki[i];
            if (!cegielka.aktywna) continue;
            if (pilka.x + PROMIEN < cegielka.x ||
                pilka.x - PROMIEN > cegielka.x + cegielka.w ||
                pilka.y + PROMIEN < cegielka.y ||
                pilka.y - PROMIEN > cegielka.y + cegielka.h) continue;

            cegielka.aktywna = false;
            punkty += PUNKTY_ZA_CEGIELKE;
            dzwiekGier.cegla();
            pilka.dy = -pilka.dy;
            if (cegielka.booster) {
                boostery.push({ x: cegielka.x + cegielka.w / 2, y: cegielka.y, dy: 150 });
            }
            if (cegielki.every(function (cegla) { return !cegla.aktywna; })) {
                if (poziom === UKLADY_POZIOMOW.length) {
                    koniecGry(true);
                } else {
                    poziom++;
                    boostery = [];
                    utworzCegielki();
                }
                return;
            }
            break;
        }

        if (pilka.y - PROMIEN > canvas.height) {
            pilki.splice(p, 1);
        }
    }

    if (pilki.length === 0 && stan === "gra") {
        zycia--;
        aktualizujZycia();
        if (zycia <= 0) {
            koniecGry(false);
        } else {
            stan = "start";
            boostery = [];
            utworzPilke();
        }
    }

    if (stan !== "gra") return;

    boostery.forEach(function (booster) {
        booster.y += booster.dy * dt;
        if (booster.y + 12 >= PALETKA.y &&
            booster.y - 12 <= PALETKA.y + PALETKA.h &&
            booster.x >= paletkaX - 12 &&
            booster.x <= paletkaX + PALETKA.w + 12) {
            booster.zlapany = true;
            dodajPilki({
                dx: pilki[0].dx,
                dy: pilki[0].dy,
                x: paletkaX + PALETKA.w / 2,
                y: PALETKA.y - PROMIEN
            });
        }
    });
    boostery = boostery.filter(function (booster) {
        return !booster.zlapany && booster.y - 12 <= canvas.height;
    });
}

function zaokraglony(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();
}

function napis(tekst, x, y, rozmiar) {
    ctx.font = "bold " + rozmiar + "px Arial";
    ctx.textAlign = "center";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillStyle = "#fff";
    ctx.strokeText(tekst, x, y);
    ctx.fillText(tekst, x, y);
}

function rysuj() {
    pauzaBtn.textContent = t(stan === "pauza" ? "breakout_wznow" : "breakout_pauzuj");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#101827";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    for (let x = 18; x < canvas.width; x += 30) {
        for (let y = 18; y < canvas.height; y += 30) {
            ctx.fillRect(x, y, 2, 2);
        }
    }

    ctx.textAlign = "left";
    ctx.font = "bold 18px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(t("wynik") + " " + punkty, 18, 36);
    ctx.textAlign = "right";
    ctx.fillText(t("breakout_zycia") + " " + zycia, canvas.width - 18, 36);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffe15b";
    ctx.fillText(t("breakout_poziom") + " " + poziom, canvas.width / 2, 36);

    cegielki.forEach(function (cegielka) {
        if (!cegielka.aktywna) return;
        ctx.fillStyle = cegielka.kolor;
        zaokraglony(cegielka.x, cegielka.y, cegielka.w, cegielka.h, 5);
        ctx.fillStyle = "rgba(255, 255, 255, 0.28)";
        ctx.fillRect(cegielka.x + 5, cegielka.y + 3, cegielka.w - 10, 2);
        if (cegielka.booster) {
            ctx.fillStyle = "#fff";
            ctx.font = "bold 16px Arial";
            ctx.textAlign = "center";
            ctx.fillText("+", cegielka.x + cegielka.w / 2, cegielka.y + 17);
        }
    });

    boostery.forEach(function (booster) {
        ctx.beginPath();
        ctx.arc(booster.x, booster.y, 11, 0, Math.PI * 2);
        ctx.fillStyle = "#4ec0ca";
        ctx.shadowColor = "#4ec0ca";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#101827";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.fillText("+", booster.x, booster.y + 5);
    });

    ctx.fillStyle = "#4ec0ca";
    zaokraglony(paletkaX, PALETKA.y, PALETKA.w, PALETKA.h, 7);
    pilki.forEach(function (pilka) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(pilka.x, pilka.y, PROMIEN, 0, Math.PI * 2);
        ctx.fill();
    });

    if (stan === "gra") return;
    ctx.fillStyle = "rgba(5, 10, 20, 0.72)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (stan === "start") {
        napis("BREAKOUT", canvas.width / 2, 250, 42);
        napis(pierwszyStart ? t("breakout_start") : t("breakout_kontynuuj"), canvas.width / 2, 300, 18);
    } else if (stan === "pauza") {
        napis(t("breakout_pauza"), canvas.width / 2, 270, 40);
        napis(t("breakout_pauza_info"), canvas.width / 2, 315, 18);
    } else {
        napis(stan === "wygrana" ? t("breakout_wygrana") : t("breakout_koniec"), canvas.width / 2, 245, 28);
        napis(t("wynik") + " " + punkty, canvas.width / 2, 290, 24);
        napis(t("rekord") + " " + rekord, canvas.width / 2, 330, 22);
        napis(t("breakout_ponownie"), canvas.width / 2, 380, 18);
    }
}

zalogujBtn.addEventListener("click", zaloguj);
wylogujBtn.addEventListener("click", wyloguj);
nickInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") zaloguj();
});

document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "INPUT" || nick === "") return;
    if (e.code === "ArrowLeft" || e.code === "KeyA") {
        e.preventDefault();
        paletkaX = Math.max(0, paletkaX - 36);
        if (stan === "start") utworzPilke();
    } else if (e.code === "ArrowRight" || e.code === "KeyD") {
        e.preventDefault();
        paletkaX = Math.min(canvas.width - PALETKA.w, paletkaX + 36);
        if (stan === "start") utworzPilke();
    } else if (e.code === "Space") {
        e.preventDefault();
        akcja();
    } else if (e.code === "KeyP") {
        if (stan === "gra") stan = "pauza";
        else if (stan === "pauza") stan = "gra";
    }
});

canvas.addEventListener("pointermove", function (e) {
    ustawPaletke(e.clientX);
});
canvas.addEventListener("pointerdown", function (e) {
    ustawPaletke(e.clientX);
    akcja();
});

document.querySelectorAll("[data-ruch-paletki]").forEach(function (przycisk) {
    przycisk.addEventListener("click", function () {
        const kierunek = Number(przycisk.dataset.ruchPaletki);
        paletkaX = Math.max(0, Math.min(canvas.width - PALETKA.w, paletkaX + kierunek * 48));
        if (stan === "start") utworzPilke();
    });
});

pauzaBtn.addEventListener("click", function () {
    if (stan === "gra") stan = "pauza";
    else if (stan === "pauza") stan = "gra";
    else akcja();
    rysuj();
});

przyciskiPoziomow.forEach(function (przycisk) {
    przycisk.addEventListener("click", function () {
        wybierzPoziom(Number(przycisk.dataset.poziom));
    });
});

if (nick !== "") {
    nickInput.value = nick;
    pokazGre();
} else {
    nickInput.focus();
}
uruchomPetleGry(function (dt) {
    if (stan === "gra") aktualizuj(dt);
}, rysuj);
