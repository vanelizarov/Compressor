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

const textize = (bin) => {
    let text = '';
    for (let i = 0, len = bin.length / 8; i < len; i++) {
        text += String.fromCharCode(parseInt(bin.substring(i * 8, 8), 2));
    }
    return text;
};

export const encode = (imageData, callback) => {
    //console.log(imageData.length);

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
        tree.push(node);
        tree.sort((a, b) => {
            if (a.freq < b.freq && !b.hasOwnProperty('char')) {
                return -1;
            }
            if (a.freq >= b.freq && !b.hasOwnProperty('char')) {
                return 1;
            }
            return 0;
        });

        len--;
    }

    let bins = {};
    binarize(tree[0], bins);

    let binCompImgData = '';

    for (let i = 0, len = imageData.length; i < len; i++) {
        binCompImgData += bins[imageData[i]];
    }

    callback(textize(binCompImgData));

};