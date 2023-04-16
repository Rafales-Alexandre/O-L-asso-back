const CoreDatamapper = require ("./coreDatamapper");
const client = require ("../db/pg")


class UserHasSuit extends CoreDatamapper {
    tableName = 'user_has_suit';

    async finByUser(userId) {
        const preparedQuery = {
            text: ` 
            SELECT * FROM "${this.tableName}"
            JOIN "user_has_suit" ON `
        }
    }
}

module.exports = new UserHasSuit(client)