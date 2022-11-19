"use strict";
const mariadb = require("mariadb");

module.exports = class Tietokanta {
    constructor(optiot) {
        this.optiot = optiot;
    }
    sqlKysely(sql, parametrit) {
        return new Promise(async (resolve, reject) => {
            let x;
            try {
                x = await mariadb.createConnection(this.optiot);
                let sqlTulos = await x.query(sql, parametrit);
                if (typeof sqlTulos === "undefined") {
                    reject("Virhe");
                }
                else if (typeof sqlTulos.affectedRows === "undefined") {
                    delete sqlTulos.meta;
                    resolve({ sqlTulos, sqlTulosjoukko: true });
                }
                else {
                    resolve({
                        sqlTulos: {
                            muutetutRivitMaara: sqlTulos.affectedRows,
                            syotId: sqlTulos.syotId,
                            status: sqlTulos.warningStatus
                        },
                        sqlTulosjoukko: false
                    });
                }
            }
            catch (err) {
                reject(err);
            }
            finally {
                if (x) x.end();
            }
        });
    }
}