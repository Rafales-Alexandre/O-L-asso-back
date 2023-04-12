const Coredatamapper = require ("./coreDatamapper");
const client = require ("../db/pg")


class User extends Coredatamapper {
    tableName = 'user';
}

module.exports = new User(client)