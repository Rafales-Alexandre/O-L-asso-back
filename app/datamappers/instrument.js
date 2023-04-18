const CoreDatamapper = require ("./coreDatamapper");
const client = require ("../db/pg");

class Instrument extends CoreDatamapper {
    tableName = 'instrument';

    deleteInstrument(id){
        
        return this.delete(id);
    }
}

module.exports = new Instrument(client);