const CoreDatamapper = require ("./coreDatamapper");
const client = require ("../db/pg");
const APIError = require("./service/error/APIError");

class Instrument extends CoreDatamapper {
    tableName = 'instrument';


    }
}

module.exports = new Instrument(client);