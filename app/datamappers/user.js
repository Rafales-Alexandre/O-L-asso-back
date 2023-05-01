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
     * @param {*} suitId is what we get, it's a sttring and we send it to the database , called by the ${this.tableName}, tableName being define in the beggening of the function
     * @returns result.rows as an object
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
     * @param {*} email is what we get, it's a sttring and we send it to the database , called by the ${this.tableName}, tableName being define in the beggening of the function
     * @returns result.rows as an object
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
     * @param {*} suitId is what we get, it's a sttring and we send it to the database , called by the ${this.tableName}, tableName being define in the beggening of the function
     * @returns the total of the suits called, as an 
     * ! ça retourne en objet ??? en string ? 
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
     * @param {*} instrumentId is what we get, it's a sttring and we send it to the database , called by the ${this.tableName}, tableName being define in the beggening of the function
     * @returns an object containing all the instrument for an user 
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
 * ! a documenter
 * @param {*} userData - use the token ? 
 * @returns 
 */
    async createBcrypt(userData) {
        // Check if user exists
        const userExists = await this.findByEmail(userData.email);
        if (userExists) {
            /**
             * ! probleme de sécurité à utilisé cette méthode , peut etre lisible. L'usage d'une graphQlError est préférable. 
             * throw new GraphQLError("You're not allowed in", {
				code: "FORBIDDEN",
				http: {
					status: 403,
					headers: new Map([
						["Unauthorize user"]
					])
				}
             */
            throw new Error('Cet email est déjà utilisé.');
        }
/**
 * ! la @method b-crypt ne devrait-elle pas être dans un fichier séparer, comme son type gql ? pas pour le fonctionnement, mais pour le respct sémantique. 
 */
        // hashing
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // create new user with data input
        userData.password = hashedPassword;

        return this.create(userData);
    }
}



module.exports = new User(client)
