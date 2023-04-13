const Coredatamapper = require ("./coreDatamapper");

const client = require ("../db/pg");

class Suit extends Coredatamapper {
    tableName = 'suit';
}

module.exports = new Suit(client)