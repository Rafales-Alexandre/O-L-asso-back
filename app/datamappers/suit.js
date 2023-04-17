const CoreDatamapper = require ("./coreDatamapper");

const client = require ("../db/pg");

class Suit extends CoreDatamapper {
    tableName = 'suit';

    deleteSuit(id){
        return this.delete(id);
    }
}

module.exports = new Suit(client)