const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg");
const userDatamapper = require("./user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");


/**
 * Class representing a password reset controller.
 * @extends CoreDatamapper
 */

class Password extends CoreDatamapper {
    tableName = 'user';

    async updatePassword(id, newPassword) {
        console.log (id)
        const user = await userDatamapper.findByPk({id});
        console.log(user)
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            if (!user.password === decoded){
                throw new GraphQLError("What the heck are you doing ", {
                    code: "FORBIDDEN",
                    http: {
                        status: 403,
                        headers: new Map([
                            ['Unvalid', 'token'],
                            ['send ', 'help'],
                        ])
                    }
                }) 
            }
            const saltRounds = 10;
            const coded = await bcrypt.hash(newPassword, saltRounds);
              
              const baseQuery = { text :`UPDATE "${this.tableName}" SET password, ${coded}, WHERE id = $${user.id} RETURNING *`,
            };
            const result = await this.client.query(baseQuery)
            
            return {
                success: true
            };
        } catch (error) {
            throw new GraphQLError("What the heck are you doing ", {
                code: "INTERNAL_SERVER_ERROR",
                http: {
                    status: 500,
                    headers: new Map([
                        ['I', 'did'],
                        ['something', 'bad'],
                    ])
                }
            }) 
        }

          
    }
};

module.exports = new Password(client)