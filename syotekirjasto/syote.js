"use strict"

module.exports = kehote => {
    process.stdout.write(kehote);
    return new Promise(resolve => {
        const syote = process.stdin;
        syote.resume();
        syote.once("data", (data) => {
            syote.pause();
            resolve(data.toString().trim());
        });
    });
};
