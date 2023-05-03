/**
 * Addition to the  CoreDatamapper for User 
 * bcrypt is necessary here to function properly 
 */
const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg");
 

class User extends CoreDatamapper {
    tableName = 'user';
    /**
     * Because it's a custom query using a resolver, we need to write the method
     * @param {String} suitId is what we get, it's a string and we send it to the database , called by the ${this.tableName}, tableName being define in the beggening of the function
     * @returns {Array.<Object>} result.rows as an object
     */

    async findBySuit(suitId) {
        const baseQuery = {
            text: ` 
            SELECT u.* FROM "${this.tableName}" as u
            LEFT JOIN "user_has_suit" as us ON u.id = us.user_id 
            WHERE us.suit_id = ${suitId}
            `
        };
        const result = await this.client.query(baseQuery);

        return result.rows;
    }

    /**
     * @param {String} email is what we get, it's a sttring and we send it to the database , called by the ${this.tableName}, tableName being define in the beggening of the function
     * @returns {Object} result.rows as an object
     */

    async findByEmail(email) {
        const baseQuery = {
            text: ` 
            SELECT u.* FROM "${this.tableName}" as u
            WHERE u.email = $1
            `,
            values: [email]
        };
        const result = await this.client.query(baseQuery);

        return result.rows[0];
    }
     /**
   * Finds the total number of users associated with a given suit ID.
   * @param {string} suitId - The ID of the suit to find the total number of users for.
   * @returns {number} - The total number of users associated with the suit.
   */
    async findBySuitTotal(suitId) {

        const baseQuery = {
            text: ` 
            SELECT COUNT(u.*) FROM "${this.tableName}" as u
            LEFT JOIN "user_has_suit" as us ON u.id = us.user_id 
            WHERE us.suit_id = ${suitId}
            `
        };
        const result = await this.client.query(baseQuery);
        return result.rows[0].count;
    }
    /**
   * Finds all users associated with a given instrument ID.
   * @param {string} instrumentId - The ID of the instrument to find users for.
   * @returns {Array.<Object>} - An array of user objects associated with the instrument.
   */
    async findByInstrument(instrumentId) {
        const baseQuery = {
            text: ` 
            SELECT u.* FROM "${this.tableName}" as u
            LEFT JOIN "user_has_suit" as us ON u.id = us.user_id 
            WHERE us.suit_id = ${instrumentId}
            `
        };
        const result = await this.client.query(baseQuery);

        return result.rows;
    }
   
}



module.exports = new User(client)
