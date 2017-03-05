const should = require('should');
const lzw = require('../src/js/logic/lzw');

describe('LZW algorithm', function() {

    describe('#encode()', function() {

        it("should return ['ÿ','f','g','Ā','h','ÿ'] when passing [255,102,103,255,102,104,255]", function(done) {

            lzw.encode([255, 102, 103, 255, 102, 104, 255], function(encoded) {
                encoded.should.eql([ 'ÿ', 'f', 'g', 'Ā', 'h', 'ÿ' ]);
                // console.log(encoded);
                done();
            });

        });

    });


    describe('#decode()', function() {

        it("should return [255,102,103,255,102,104,255] when passing ['ÿ','f','g','Ā','h','ÿ']", function(done) {

            lzw.decode(['ÿ', 'f', 'g', 'Ā', 'h', 'ÿ'], function(decoded) {
                decoded.should.eql([255, 102, 103, 255, 102, 104, 255]);
                 // console.log(decoded);
                done();
            });

        });

    });

});