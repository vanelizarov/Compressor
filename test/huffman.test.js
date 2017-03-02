const should = require('should');
const huffman = require('../src/js/logic/huffman');

describe('Huffman algorithm', function() {
    describe('#encode()', function() {

        it("should return '110100' when passing [255, 255, 100, 30]", function(done) {
            huffman.encode([255, 255, 100, 30], function(encoded) {
                encoded.should.equal('110100');
                done();
            });
        });

        it("should return '0000' when passing [0, 0, 0, 0]", function(done) {
            huffman.encode([0, 0, 0, 0], function(encoded) {
                encoded.should.equal('0000');
                done();
            });
        });

    })
});