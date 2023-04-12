const Coredatamapper = require ("./coreDatamapper");

const client = require ("../db/pg");

class Instrument extends Coredatamapper {
    tableName = 'instrument';
}

module.exports = new Instrument(client)