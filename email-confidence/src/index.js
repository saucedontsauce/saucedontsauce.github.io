const cfg = require("./config.json");
require("./helpers.js")

const onlyLetters = /[A-Za-z]/g;
const vowels = /[AEIOUaeiou]/g;

function seemsGarbage(str) {
    const letters = (str.match(onlyLetters) || []).length;
    if (letters === 0) return false;                 // or true, your call
    const v = (str.match(vowels) || []).length;
    const ratio = v / letters;
    return ratio > 0.5 || ratio < 0.10;
}