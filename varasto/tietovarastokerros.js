"use strict";

const { STATUSKOODIT, STATUSVIESTIT } = require("./statuskoodit");
const Tietokanta = require("./tietokanta");
const optiot = require("./SQLconfig.json");

const haeKaikkiSql = "select kirjaID, nimi, tekija, aihe, painovuosi from kirja";
const haeYksi = "select kirjaID, nimi, tekija, aihe, painovuosi from kirja where kirjaID=?";
const lisaa = "insert into kirja (kirjaID,nimi,tekija,aihe,painovuosi) values(?,?,?,?,?)";
const paivita = "update kirja set nimi=?, tekija=?, aihe=?, painovuosi=? where kirjaID=?";
const poista = "delete from kirja where kirjaID=?";

const parametrit = kirja => [
    +kirja.kirjaID, kirja.nimi, kirja.tekija, kirja.aihe, kirja.painovuosi
];
const paivitaParametrit = kirja => [
    kirja.nimi, kirja.tekija, kirja.aihe, kirja.painovuosi, +kirja.kirjaID
];

module.exports = class Tietovarasto {
    constructor() {
        this.db = new Tietokanta(optiot);
    }
    get STATUSKOODIT() {
        return STATUSKOODIT;
    };
    haeKaikki() {
        return new Promise(async (resolve, reject) => {
            try {
                const tulos = await this.db.sqlKysely(haeKaikkiSql);
                resolve(tulos.sqlTulos);
            }
            catch (err) {
                console.log(err)
                reject(STATUSVIESTIT.OHJELMAVIRHE());
            }
        });
    }
    hae(kirjaID) {
        return new Promise(async (resolve, reject) => {
            if (!kirjaID) {
                reject(STATUSVIESTIT.EI_LOYTYNYT("tyhjä"));
            }
            else {
                try {
                    const tulos = await this.db.sqlKysely(haeYksi, [kirjaID]);
                    if (tulos.sqlTulos.length > 0) {
                        resolve(tulos.sqlTulos[0]);
                    }
                    else {
                        reject(STATUSVIESTIT.EI_LOYTYNYT(kirjaID))
                    }
                }
                catch (err) {
                    reject(STATUSVIESTIT.OHJELMAVIRHE());
                }
            }
        });
    }
    lisaa(uusi) {
        return new Promise(async (resolve, reject) => {
            try {
                if (uusi) {
                    if (!uusi.kirjaID) {
                        reject(STATUSVIESTIT.EI_LISATTY());
                    }
                    else {
                        const tulos = await this.db.sqlKysely(haeYksi, [uusi.kirjaID]);
                        if (tulos.sqlTulos.length > 0) {
                            reject(STATUSVIESTIT.JO_KAYTOSSA(uusi.kirjaID));
                        }
                        else {
                            const status = await this.db.sqlKysely(lisaa, parametrit(uusi));
                            resolve(STATUSVIESTIT.LISAYS_OK(uusi.kirjaID));
                        }
                    }
                }
                else {
                    reject(STATUSVIESTIT.EI_LISATTY());
                }
            }
            catch (err) {
                reject(STATUSVIESTIT.EI_LISATTY());
            }
        });
    }
    poista(kirjaID) {
        return new Promise(async (resolve, reject) => {
            if (!kirjaID) {
                reject(STATUSVIESTIT.EI_LOYTYNYT("tyhjä"));
            }
            else {
                try {
                    const status = await this.db.sqlKysely(poista, [kirjaID]);
                    if (status.sqlTulos.muutetutRivitMaara === 0) {
                        resolve(STATUSVIESTIT.EI_POISTETTU());
                    }
                    else {
                        resolve(STATUSVIESTIT.POISTO_OK(kirjaID));
                    }
                }
                catch (err) {
                    reject(STATUSVIESTIT.OHJELMAVIRHE());
                }
            }
        })
    }
    paivita(muutos) {
        return new Promise(async (resolve, reject) => {
            if (muutos) {
                try {
                    const status = await this.db.sqlKysely(paivita, paivitaParametrit(muutos));
                    if (status.sqlTulos.muutetutRivitMaara === 0) {
                        resolve(STATUSVIESTIT.EI_PAIVITETTY());
                    }
                    else {
                        resolve(STATUSVIESTIT.PAIVITYS_OK(muutos.kirjaID));
                    }
                }
                catch (err) {
                    reject(STATUSVIESTIT.EI_PAIVITETTY());
                }
            }
            else {
                reject(STATUSVIESTIT.EI_PAIVITETTY());
            }
        });
    }
}