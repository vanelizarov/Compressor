const utils = require('../utils');

const encode = (imageData, callback) => {

    const et = new utils.ExecTime();
    et.start();

    let dict = {};
    let data = [];

    for (let i = 0, len = imageData.length; i < len; i++) {
        data[i] = String.fromCharCode(imageData[i]);
    }

    let encoded = [];
    let char;
    let phrase = data[0];
    let code = 256;

    for (let i = 1, len = data.length; i < len; i++) {
        char = data[i];

        if (dict[phrase + char] != null) {
            phrase += char;
        } else {
            encoded.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + char] = code;
            code++;
            phrase = char;
        }
    }

    encoded.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));

    for (let i = 0, len = encoded.length; i < len; i++) {
        encoded[i] = String.fromCharCode(encoded[i]);
    }

    et.finish();

    callback(encoded, et.measure());

};

const decode = (encoded, callback) => {

    const et = new utils.ExecTime();
    et.start();

    let dict = {};
    let currentChar = encoded[0];
    let oldPhrase = currentChar;
    let decoded = [currentChar];
    let code = 256;
    let phrase;
    for (let i = 1, len = encoded.length; i < len; i++) {
        let currentCode = encoded[i].charCodeAt(0);

        if (currentCode < 256) {
            phrase = encoded[i];
        } else {
            phrase = dict[currentCode] ? dict[currentCode] : (oldPhrase + currentChar);
        }

        if (phrase.length > 1) {
            decoded.push(...phrase.split(''));
        } else {
            decoded.push(phrase);
        }

        currentChar = phrase[0];
        dict[code] = oldPhrase + currentChar;
        code++;
        oldPhrase = phrase;
    }


    for (let i = 0, len = decoded.length; i < len; i++) {
        decoded[i] = decoded[i].charCodeAt(0);
    }

    et.finish();
    callback(utils.normalize(decoded, 180000, 255), et.measure()); // TODO: fix decoded size

};

const adapt = (encoded, size, callback) => {

    let adapted = [];
    encoded = utils.normalize(encoded, size);

    for (let i = 0, len = encoded.length; i < len; i++) {
        adapted.push(`${encoded[i]}`.charCodeAt(0));
    }



    callback(adapted);

};

module.exports = {
    encode,
    decode,
    adapt
};


































