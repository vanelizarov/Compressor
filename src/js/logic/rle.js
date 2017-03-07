const utils = require('../utils');

const encode = (imageData, callback) => {

    const et = new utils.ExecTime();
    et.start();

    let encoded = [];
    let count = 1;
    let valueA = imageData[0];

    for (let i = 1, len = imageData.length; i < len; i++) {
        let valueB = imageData[i];

        if (valueA === valueB) {
            count++;
        } else {
            encoded.push(count);
            encoded.push(valueA);
            valueA = valueB;
            count = 1;
        }

        if (i === len - 1) {
            encoded.push(count);
            encoded.push(valueA);
            break;
        }

    }

    et.finish();

    let length = 0;

    for (let i = 0, len = encoded.length; i < len; i += 2) {
        length += Math.ceil(encoded[i] / 256);
    }

    callback(encoded, et.measure(), length);

};

const decode = (encoded, callback) => {

    const et = new utils.ExecTime();
    et.start();

    let decoded = [];

    for (let i = 0, lenEnc = encoded.length; i < lenEnc; i += 2) {
        for (let _ = 0, lenRun = encoded[i]; _ < lenRun; _++) {
            decoded.push(encoded[i + 1]);
        }
    }

    et.finish();

    callback(decoded, et.measure());

};

const adapt = (encoded, size, callback) => {

    let adapted = [];

    for (let i = 1, len = encoded.length; i < len; i += 2) {
        adapted.push(encoded[i]);
    }

    for (let i = 3, len = encoded.length; i < len; i += 4) {
        adapted[i] = 255;
    }

    adapted = utils.normalize(adapted, size, 255);

    callback(adapted);

};

module.exports = {
    encode,
    decode,
    adapt
};