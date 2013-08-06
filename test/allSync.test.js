var sqlite3 = require('..');
var assert = require('assert');

describe('allSync', function() {
    var db;
    before(function(done) {
        db = new sqlite3.Database('test/support/big.db', sqlite3.OPEN_READONLY, done);
    });

    it('retrieve 100 rows synchronously with Database#allSync', function() {
        var total = 100;
        var rows = db.allSync('SELECT id, txt FROM foo LIMIT 0, ?', total);
        assert.equal(rows.length, total, "Only retrieved " + rows.length + " out of " + total + " rows.");
        assert.equal(rows[0].id, 0, "First row doesn't contain an id of 0");
        assert.equal(rows[0].text, undefined, "First row doesn't contain undefined text");
    });
});
