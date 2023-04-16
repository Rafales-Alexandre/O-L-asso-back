const CoreDatamapper = require ("./coreDatamapper");
const client = require ("../db/pg");

class Instrument extends CoreDatamapper {
    tableName = 'instrument';

    async findByUser(userId) {
        const preparedQuery = {
            text: `
            SELECT * FROM "${this.tableName}"
            WHERE "user_id" = $1`,
            values: [userId],
        };
        const result = await this.client.query(preparedQuery);
        return result.rows;
    }
}

module.exports = new Instrument(client);