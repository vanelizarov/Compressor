const utils = require('../utils');

const binarize = (from, to) => {

    if (from.hasOwnProperty('children')) {
        for (let i = 0, len = from.children.length; i < len; i++) {
            from.children[i].bin = `${from.bin === undefined ? '' : from.bin}${i}`;
            if (from.children[i].hasOwnProperty('char')) {
                to[from.children[i].char] = from.children[i].bin;
            }
            binarize(from.children[i], to);
        }
    }

};

const encode = (imageData, callback) => {

    const et = new utils.ExecTime();
    et.start();

    let freqs = {};

    for (let i = 0, len = imageData.length; i < len; i++) {
        if (!freqs.hasOwnProperty(imageData[i])) {
            freqs[imageData[i]] = 1;
        } else {
            freqs[imageData[i]]++;
        }
    }

    let tree = [];

    for (let f in freqs) {
        if (freqs.hasOwnProperty(f)) {
            tree.push({
                char: f,
                freq: freqs[f]
            });
        }
    }

    tree.sort((a, b) => {
        return a.freq - b.freq;
    });

    let len = tree.length;
    while (len > 1) {
        let node = {
            freq: tree[0].freq + tree[1].freq,
            children: [
                tree[0],
                tree[1]
            ]
        };
        tree.splice(0, 2);

        if (tree.length > 0) {
            utils.add(node, tree, 'freq');
            len--;
        } else {
            tree.push(node);
            break;
        }
    }

    let bins = {};
    binarize(tree[0].hasOwnProperty('char') ? {children: [tree[0]]} : tree[0], bins);

    let binCompImgData = [bins];

    for (let i = 0, len = imageData.length; i < len; i++) {
        binCompImgData.push(bins[imageData[i]]);
    }

    et.finish();

    callback(binCompImgData, et.measure());

};

const decode = (encoded, callback) => {

    const et = new utils.ExecTime();
    et.start();

    let keys = encoded.splice(0, 1)[0];
    let decoded = [];

    for (let i = 0, len = encoded.length; i < len; i++) {
        decoded.push(Number.parseInt(utils.getKey(keys, encoded[i])));
    }

    et.finish();

    callback(decoded, et.measure());

};

module.exports = {
    encode,
    decode
};