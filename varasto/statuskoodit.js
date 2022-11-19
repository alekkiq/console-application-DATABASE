"use strict";

const STATUSKOODIT = {
    OHJELMAVIRHE: 0,
    EI_LOYTYNYT: 1,
    LISAYS_OK: 2,
    EI_LISATTY: 3,
    JO_KAYTOSSA: 4,
    POISTO_OK: 5,
    EI_POISTETTU: 6,
    PAIVITYS_OK: 7,
    EI_PAIVITETTY: 8
};

const STATUSVIESTIT = {
    OHJELMAVIRHE: () => ({
        viesti: "Anteeksi! Virhe ohjelmassamme",
        statuskoodi: STATUSKOODIT.OHJELMAVIRHE,
        tyyppi: "virhe"
    }),
    EI_LOYTYNYT: kirjaID => ({
        viesti: `Annetulla kirjaID:llä ${kirjaID} ei löytynyt kirjoja`,
        statuskoodi: STATUSKOODIT.EI_LOYTYNYT,
        tyyppi: "virhe"
    }),
    LISAYS_OK: kirjaID => ({
        viesti: `Kirja kirjaID:llä ${kirjaID} lisättiin`,
        statuskoodi: STATUSKOODIT.LISAYS_OK,
        tyyppi: "info"
    }),
    EI_LISATTY: () => ({
        viesti: "Tietoja ei lisätty",
        statuskoodi: STATUSKOODIT.EI_LISATTY,
        tyyppi: "virhe"
    }),
    JO_KAYTOSSA: kirjaID => ({
        viesti: `KirjaID ${kirjaID} oli jo käytössä`,
        statuskoodi: STATUSKOODIT.JO_KAYTOSSA,
        tyyppi: "virhe"
    }),
    POISTO_OK: kirjaID => ({
        viesti: `Kirja kirjaID:llä ${kirjaID} poistettiin`,
        statuskoodi: STATUSKOODIT.POISTO_OK,
        tyyppi: "info"
    }),
    EI_POISTETTU: () => ({
        viesti: "Annetulla kirjaID:llä ei löytynyt kirjoja. Mitään ei poistettu",
        statuskoodi: STATUSKOODIT.EI_POISTETTU,
        tyyppi: "virhe"
    }),
    PAIVITYS_OK: kirjaID => ({
        viesti: `Kirja kirjaID:llä ${kirjaID} päivitettiin`,
        statuskoodi: STATUSKOODIT.PAIVITYS_OK,
        tyyppi: "info"
    }),
    EI_PAIVITETTY: () => ({
        viesti: "Kirjaa ei muutettu",
        statuskoodi: STATUSKOODIT.EI_PAIVITETTY,
        tyyppi: "virhe"
    })
};

module.exports = { STATUSKOODIT, STATUSVIESTIT };