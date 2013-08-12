var sqlite3 = require('..');
var assert = require('assert');
var fs = require('fs');

describe('new Database() is_sync=true', function() {
    it('retrieve 100 rows synchronously with Database#allSync and sync db constructor', function() {
        var is_sync = new Boolean(true);
        var db = new sqlite3.Database('test/support/big.db', sqlite3.OPEN_READONLY, is_sync);
        var total = 100;
        var rows = db.allSync('SELECT id, txt FROM foo LIMIT 0, ?', total);
        assert.equal(rows.length, total, "Only retrieved " + rows.length + " out of " + total + " rows.");
        assert.equal(rows[0].id, 0, "First row doesn't contain an id of 0");
        assert.equal(rows[0].text, undefined, "First row doesn't contain undefined text");
    });
});

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

describe('execSync', function() {
    var db;
    before(function(done) {
        db = new sqlite3.Database(':memory:', done);
    });

    it('Database#execSync', function() {
        var sql = fs.readFileSync('test/support/script.sql', 'utf8');
        db.execSync(sql);

        var rows = db.allSync("SELECT type, name FROM sqlite_master ORDER BY type, name");
        assert.deepEqual(rows, [
            { type: 'index', name: 'grid_key_lookup' },
            { type: 'index', name: 'grid_utfgrid_lookup' },
            { type: 'index', name: 'images_id' },
            { type: 'index', name: 'keymap_lookup' },
            { type: 'index', name: 'map_index' },
            { type: 'index', name: 'name' },
            { type: 'table', name: 'grid_key' },
            { type: 'table', name: 'grid_utfgrid' },
            { type: 'table', name: 'images' },
            { type: 'table', name: 'keymap' },
            { type: 'table', name: 'map' },
            { type: 'table', name: 'metadata' },
            { type: 'view', name: 'grid_data' },
            { type: 'view', name: 'grids' },
            { type: 'view', name: 'tiles' }
        ]);
    });
});
