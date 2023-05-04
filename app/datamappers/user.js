/**
 * Addition to the  CoreDatamapper for User 
 * bcrypt is necessary here to function properly 
 */
const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg");
const bcrypt = require("bcrypt"); 

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
  /**
   * Creates a new user with the given data, and hashes their password using bcrypt.
   * @param {Object} userData - The data for the new user to create.
   * @param {string} userData.email - The email address of the user to create.
   * @param {string} userData.password - The plaintext password of the user to create.
   * @returns {Object} - The newly created user object.
   * @throws Error - Throws an error if the email address is already in use.
   */
    async createBcrypt(userData) {
        // Check if user exists
        const userExists = await this.findByEmail(userData.email);
        if (userExists) {
            
     throw new GraphQLError("You're not allowed in", {
				code: "FORBIDDEN",
				http: {
					status: 403,
					headers: new Map([
                            ['Unauthorize', 'uzer'],
                            ['send ', 'coffee to fight in the great battle '],
					])
				}
            })
        }

        // hashing
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // create new user with data input
        userData.password = hashedPassword;

        return this.create(userData);
    }
    async updateImage(dataInput){
        const userData = await this.findByPk(dataInput.id);
        if (userData) {
            
            throw new GraphQLError("You're not allowed in", {
                       code: "FORBIDDEN",
                       http: {
                           status: 403,
                           headers: new Map([
                                   ['Unauthorize', 'uzer'],
                                   ['send ', 'coffee to fight in the great battle '],
                           ])
                       }
                   })
               }
        userData.url_img = image.url;
        return this.update({id}, userData);
    }
}



module.exports = new User(client)
