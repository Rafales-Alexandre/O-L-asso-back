const CoreDatamapper = require ("./coreDatamapper");

const client = require ("../db/pg");

class Suit extends CoreDatamapper {
    tableName = 'suit';
}

module.exports = new Suit(client)