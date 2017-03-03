const should = require('should');
const rle = require('../src/js/logic/rle');

describe('RLE algorithm', function() {

    describe('#encode()', function() {

        it("should return [1,255,1,130,3,56,2,72,1,21] when passing [255,130,56,56,56,72,72,21]", function(done) {
            rle.encode([255,130,56,56,56,72,72,21], function(encoded) {
                encoded.should.eql([1,255,1,130,3,56,2,72,1,21]);
                done();
            });
        });

    });


    describe('#decode()', function() {

        it("should return [255,130,56,56,56,72,72,21] when passing [1,255,1,130,3,56,2,72,1,21]", function(done) {
            rle.decode([1,255,1,130,3,56,2,72,1,21], function(decoded) {
                decoded.should.eql([255,130,56,56,56,72,72,21]);
                done();
            })
        });

    });

});


//[255, 130, 56, 56, 56, 72, 72, 21]
//1 255 1 130 3 56 2 72 1 21