const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg");
const userDatamapper = require("./user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const config = require("../config");


/**
 * Class representing a password reset controller.
 * @extends CoreDatamapper
 */

class Password extends CoreDatamapper {
    tableName = 'user';

    async updatePassword(_, { user, newPassword }) {

        console.log({user})
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
            const coded = newpass

              /**
           * Hash the new password with bcrypt
           */
              const saltRounds = 10;
              const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
  
              
              const baseQuery = { text :`UPDATE "${this.tableName}" SET password, ${newPassword}, WHERE id = $${user.id} RETURNING *`,
              // value 
            }
            const result = await this.client.query(baseQuery)
            
            return {
                success: true
            };
        } catch (error) {
            return { success: false, message: error.message };
        }

          
    }
};

module.exports = new Password(client)