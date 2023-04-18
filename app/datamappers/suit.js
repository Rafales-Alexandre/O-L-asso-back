const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg")


class User extends CoreDatamapper {
    tableName = 'user';

    
}

module.exports = new User(client)