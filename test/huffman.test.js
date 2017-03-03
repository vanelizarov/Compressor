const should = require('should');
const huffman = require('../src/js/logic/huffman');

describe('Huffman algorithm', function() {

    describe('#encode()', function() {

        it("should return [1,1,01,00] when passing [255,255,100,30]", function(done) {
            huffman.encode([255, 255, 100, 30], function(encoded) {
                encoded.splice(0, 1);
                encoded.should.eql(['1', '1', '01', '00']);
                done();
            });
        });

        it("should return [0,0,0,0] when passing [0,0,0,0]", function(done) {
            huffman.encode([0, 0, 0, 0], function(encoded) {
                encoded.splice(0, 1);
                encoded.should.eql(['0', '0' , '0' ,'0']);
                done();
            });
        });

    });


    describe('#decode()', function() {

        it("should return [255,255,100,30] when passing [1,1,01,00]", function(done) {

            const encoded = ['1', '1', '01', '00'];
            encoded.unshift({'255': '1', '100': '01', '30': '00'});

            huffman.decode(encoded, function(decoded) {
                decoded.should.eql([255, 255, 100, 30]);
                done();
            });

        });

        it("should return [255,255,255,255] when passing [0,0,0,0]", function(done) {

            const encoded = ['0', '0', '0', '0'];
            encoded.unshift({'255': '0'});

            huffman.decode(encoded, function(decoded) {
                decoded.should.eql([255, 255, 255, 255]);
                done();
            });

        });

        //it("should return []")

    })

});

