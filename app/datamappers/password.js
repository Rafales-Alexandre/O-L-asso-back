const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg");
const userDatamapper = require("./user");
const bcrypt = require("bcrypt");


/**
 * Class representing a password reset controller.
 * @extends CoreDatamapper
 */

class Password extends CoreDatamapper {
    tableName = 'user';

    async updatePassword(id, newPassword) {
        console.log(newPassword)
        const user = await userDatamapper.findByPk(id);
        console.log("user id ", user.id , "id : ", id )
        if (user.id = id){
            console.log ("it's working ")
                const coded = await bcrypt.hash(newPassword, 10);
                console.log("coded", coded )
                const baseQuery = { text :`UPDATE "${this.tableName}" SET password = '${coded}' WHERE id = ${user.id} `};
                const result = await this.client.query(baseQuery);
                const neuePassword = user.password
                return {
                    success: true,
                    password : neuePassword
               };
            }else {
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