const should = require('should');

const add = (v, arr) => {

    for (let i = 0, len = arr.length; i < len - 1; i++) {
        if (v === arr[i]) {
            arr.splice(i, 0, v + 'a');
            break;
        }

        if (v > arr[i] && v < arr[i + 1]) {
            arr.splice(i + 1, 0, v + 'a');
            break;
        }

        if (v === arr[len - 1]) {
            arr.splice(len - 1, 0, v + 'a');
            break;
        }

        if (v > arr[len - 1]) {
            arr.push(v + 'a');
            break;
        }
    }

    return arr;

};

let a = [1,3,5,7,9];

describe('Add value to right place in array', function() {
   describe('#indexOf()', function() {

       it('should return 2 when value is 5', function() {
           add(5, [1,3,5,7,9]).indexOf('5a').should.equal(2);
       });

       it('should return 3 when value is 6', function() {
           add(6, [1,3,5,7,9]).indexOf('6a').should.equal(3);
       });

       it('should return 3 when value is 7', function() {
           add(7, [1,3,5,7,9]).indexOf('7a').should.equal(3);
       });

       it('should return 6 when value is 9', function() {
           add(5, [1,3,5,7,9]).indexOf('9a').should.equal(6);
       });

       it('should return 0 when value is 0', function() {
           add(0, [1,3,5,7,9]).indexOf('0a').should.equal(0);
       });


   });
});