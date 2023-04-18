const CoreDatamapper = require ("./coreDatamapper");
const client = require ("../db/pg")
const APIError = require("./service/error/APIError");

class UserHasSuit extends CoreDatamapper {
    tableName = 'user_has_suit';


  
    
}

module.exports = new UserHasSuit(client)