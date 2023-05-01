/**
 * Addition of the CoreDatamapper for Instrument 
 */

const CoreDatamapper = require ("./coreDatamapper");
const client = require ("../db/pg");


class Instrument extends CoreDatamapper {
    tableName = 'instrument';
    async findByUser(userId) {
        /**
         * Because it's a custom query using a resolver, we need to write the method
         * We don't have a inout value to make it work, because it's directly linked to the user datamapper  
         */
        const baseQuery = {
            text: ` 
            SELECT s.* FROM "${this.tableName}" as s
            LEFT JOIN "user_has_suit" as us ON s.id = us.suit_id 
            WHERE us.user_id = ${userId}
            `
        };
        const result = await this.client.query(baseQuery);

        return result.rows;
    }
    }


module.exports = new Instrument(client);