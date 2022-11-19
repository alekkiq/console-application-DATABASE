"use strict";

const syote = require("./syotekirjasto/syote");
const Tietovarasto = require("./varasto/tietovarastokerros");
const varasto = new Tietovarasto();

const valikkoText = `
Valitse

1. Hae kaikki kirjat
2. Hae yksi kirja
3. Lisää kirja
4. Poista kirja
5. Muuta jonkin kirjan tietoja
6. Lopeta ohjelma

Valitse (1,2,3,4,5,6): `;

const lopetus = `
-----
Kiitos että käytit ohjelmaa!
-----
`;
const virhe = `
-----
Anna numero 1,2,3,4,5,6
-----
`;
valikko();

async function valikko() {
    let loppu = false;
    do {
        const valinta = await syote(valikkoText);
        if (valinta === "1") {
            await haeKaikkiKirjat();
        }
        else if (valinta === "2") {
            await haeYksiKirja();
        }
        else if (valinta === "3") {
            await lisaaKirja();
        }
        else if (valinta === "4") {
            await poistaKirja();
        }
        else if (valinta === "5") {
            await paivitaKirja();
        }
        else if (valinta === "6") {
            console.log(lopetus);
            loppu = true;
        }
        else {
            console.log(virhe);
        }
    }
    while (!loppu);
}

function muodostaViesti(viesti) {
    return `------\nStatus\n------\n${viesti}`;
}
async function haeKaikkiKirjat() {
    console.log("\nKaikki kirjat");
    for (const kirja of await varasto.haeKaikki()) {
        console.log(rivi(kirja));
    }
}
function rivi(kirja) {
    return `
    Kirja ${kirja.kirjaID}: 
    Nimi: ${kirja.nimi}, 
    Tekijä: ${kirja.tekija}, 
    Aihe: ${kirja.aihe},
    Painovuosi: ${kirja.painovuosi}
    `;
}

async function haeYksiKirja() {
    try {
        const id = +await syote("Anna kirjan ID: ");
        const tulos = await varasto.hae(id);
        console.log("\nHakutulos");
        console.log(rivi(tulos));
    }
    catch (err) {
        console.log(muodostaViesti(err.viesti));
    }
}

async function lueKirjatiedot() {
    const kirjaID = +await syote("Anna kirjan ID: ");
    const nimi = await syote("Nimi: ");
    const tekija = await syote("Tekija: ");
    const aihe = await syote("Aihe: ");
    const painovuosi = +await syote("Painovuosi: ");

    return {
        kirjaID,
        nimi,
        tekija,
        aihe,
        painovuosi
    };
}

async function lisaaKirja() {
    try {
        const uusi = await lueKirjatiedot();
        const tulos = await varasto.lisaa(uusi);
        console.log(muodostaViesti(tulos.viesti));
    }
    catch (err) {
        console.log(muodostaViesti(err.viesti));
    }
}

async function poistaKirja() {
    try {
        const id = +await syote("Anna kirjan ID: ");
        const status = await varasto.poista(id);
        console.log(muodostaViesti(status.viesti));
    }
    catch (err) {
        console.log(muodostaViesti(err.viesti));
    }
}

async function paivitaKirja() {
    try {
        const muutos = await lueKirjatiedot();
        const tulos = await varasto.paivita(muutos);
        console.log(muodostaViesti(tulos.viesti));
    }
    catch (err) {
        console.log(muodostaViesti(err.viesti));
    }
}