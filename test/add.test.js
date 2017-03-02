const should = require('should');

const add = (v, arr) => {

    for (let i = 0, len = arr.length; i < len; i++) {
        if (v === arr[i]) {
            arr.splice(i, 0, v + 'a');
            break;
        }

        if (v > arr[i]) {
            if (arr[i + 1] !== undefined) {
                if (v < arr[i + 1]) {
                    arr.splice(i + 1, 0, v + 'a');
                    break;
                }
            } else {
                arr.push(v + 'a');
                break;
            }
        }

        if (v === arr[len - 1]) {
            arr.splice(len - 1, 0, v + 'a');
            break;
        }

        if (v < arr[0]) {
            arr.unshift(v + 'a');
            break;
        }
    }

    return arr;

};


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

       it('should return 5 when value is 10', function() {
           add(10, [1,3,5,7,9]).indexOf('10a').should.equal(5);
       });

       it('should return 0 when value is 0', function() {
           add(0, [1,3,5,7,9]).indexOf('0a').should.equal(0);
       });


   });
});