/**
 * Addition of the CoreDatamapper for User 
 */
const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg")
const authService = require("../services/authService");


class User extends CoreDatamapper {
    tableName = 'user';

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

    async login(input){
        const token = authService.login(input);
        userDetails = this.findByEmail(input.email);
        return{
            token,
            userDetails
        }
    }
}



module.exports = new User(client)
