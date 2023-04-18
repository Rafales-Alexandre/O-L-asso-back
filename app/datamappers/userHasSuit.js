const CoreDatamapper = require ("./coreDatamapper");
const client = require ("../db/pg")


class UserHasSuit extends CoreDatamapper {
    tableName = 'user_has_suit';


    deleteUserHasSuit(id){
        
        return this.delete(id);
    }
    
}

module.exports = new UserHasSuit(client)