const CoreDatamapper = require ("./coreDatamapper");
const client = require ("../db/pg");

class Instrument extends CoreDatamapper {
    tableName = 'instrument';


    }


module.exports = new Instrument(client);