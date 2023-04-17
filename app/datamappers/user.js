const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg")


class User extends CoreDatamapper {
    tableName = 'user';

    deleteUser(id) {

        return this.delete(id);
    }
}

module.exports = new User(client)
