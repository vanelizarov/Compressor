const utils = require('../utils');

const procLog = (v) => Math.round( (255 / Math.log10(256)) * (Math.log10(1 + v)) );
const procExp = (v) => Math.round( (255 / Math.log10(256)) * (Math.pow(1.01, v) - 1) );

const logarithmic = (imageData, callback) => {

    let et = new utils.ExecTime();
    et.start();

    let encoded = [];

    for (let i = 0, len = imageData.length; i < len; i++) {
        encoded.push(procLog(imageData[i]));
    }

    et.finish();

    callback(encoded, et.measure());

};

const exponential = (imageData, callback) => {

    let et = new utils.ExecTime();
    et.start();

    let encoded = [];

    for (let i = 0, len = imageData.length; i < len; i++) {
        encoded.push(procExp(imageData[i]));
    }

    et.finish();

    //console.log(encoded);

    callback(encoded, et.measure());

};

module.exports = {
    log: logarithmic,
    exp: exponential
};