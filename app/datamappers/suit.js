/**
 * Addition of the CoreDatamapper for Suit 
 */
const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg")


class Suit extends CoreDatamapper {
    tableName = 'suit';

    /**
     * Because it's a custom query using a resolver, we need to write the method
     * @param {*} userId is a string we get, send it to the database via the @function baseQuery through the name of table define by ${this.tablename}, being define in the beginning 
     * @returns an object 
     */
    async findByUser(userId) {
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

module.exports = new Suit(client)
