function ExecTime() {

    this._startTime = null;
    this._finishTime = null;

    this.start = () => this._startTime = new Date();
    this.finish = () => this._finishTime = new Date();
    this.measure = () => this._finishTime.getTime() - this._startTime.getTime();

}

const getKey = (obj, value) => Object.keys(obj).find((k) => obj[k] === value);

const swap = (obj) => {
    let swapped = {};
    for (let k in obj) {
        swapped[obj[k]] = parseInt(k); // TODO: test performance with hasOwnProperty() added
    }
    return swapped;
};

const add = (v, arr, comp = '') => {

    for (let i = 0, len = arr.length; i < len; i++) {

        let _v = comp === '' ? v : v[comp];
        let _arr = comp === '' ? arr[i] : arr[i][comp];

        if (_v === _arr) {
            arr.splice(i, 0, v);
            break;
        }

        if (_v > _arr) {
            if (arr[i + 1] !== undefined) {
                let __arr = comp === '' ? arr[i + 1] : arr[i + 1][comp];
                if (_v < __arr) {
                    arr.splice(i + 1, 0, v);
                    break;
                }
            } else {
                arr.push(v);
                break;
            }
        }

        if (_v === _arr) {
            arr.splice(len - 1, 0, v);
            break;
        }

        if (_v < _arr) {
            arr.unshift(v);
            break;
        }
    }

    return arr;

};

const normalize = (arr, size, value = 0) => {

    if (arr.length > size) {
        while (arr.length !== size) {
            arr.pop();
        }
    }

    if (arr.length < size) {
        while (arr.length !== size) {
            arr.push(value);
        }
    }

    return arr;

};

module.exports = {
    ExecTime,
    getKey,
    add,
    swap,
    normalize
};