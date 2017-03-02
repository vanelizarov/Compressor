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

// const textize = (bin) => {
//     let text = '';
//     for (let i = 0, len = bin.length / 8; i < len; i++) {
//         text += String.fromCharCode(parseInt(bin.substring(i * 8, 8), 2));
//     }
//     return text;
// };

const encode = (imageData, callback) => {
    //console.log(imageData.length);

    let start = new Date();

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

        // tree.push(node);
        // tree.sort((a, b) => {
        //     if (a.freq < b.freq && !b.hasOwnProperty('char')) {
        //         return -1;
        //     }
        //     if (a.freq >= b.freq && !b.hasOwnProperty('char')) {
        //         return 1;
        //     }
        //     return 0;
        // });

        if (tree.length > 0) {
            for (let i = 0, l = tree.length; i < l; i++) {
                if (node.freq === tree[i].freq) {
                    tree.splice(i, 0, node);
                    break;
                }

                if (node.freq > tree[i].freq) {
                    if (tree[i + 1] !== undefined) {
                        if (node.freq < tree[i + 1].freq) {
                            tree.splice(i + 1, 0, node);
                            break;
                        }
                    } else {
                        tree.push(node);
                        break;
                    }
                }

                if (node.freq === tree[l - 1].freq) {
                    tree.splice(l - 1, 0, node);
                    break;
                }

                if (node.freq < tree[0].freq) {
                    tree.unshift(node);
                    break;
                }
            }

            len--;

        } else {
            tree.push(node);
            break;
        }
    }

    let bins = {};
    binarize(tree[0].hasOwnProperty('char') ? {children: [tree[0]]} : tree[0], bins);

    let binCompImgData = '';

    for (let i = 0, len = imageData.length; i < len; i++) {
        binCompImgData += bins[imageData[i]];
    }

    let finish = new Date();

    callback(binCompImgData, finish.getTime() - start.getTime());

};

module.exports = {
    encode: encode
};