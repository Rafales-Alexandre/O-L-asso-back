/**
 * Addition of the CoreDatamapper for User 
 */
const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg");
const bcrypt = require("bcrypt"); // Try on bcrypt

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
    async findByInstrument(instrumentId){
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

    async createBcrypt({
        url_img,
        lastname,
        firstname,
        nickname,
        email,
        password,
        birthdate,
        phone,
        address,
        address_2,
        zip_code,
        city,
        gender,
        top_size,
        bottom_size,
        subscription,
        deposit,
        role,
    }) {
        // Check if user exists
        const userExists = await this.findByEmail({ email });
        if (userExists) {
          throw new Error('Cet email est déjà utilisé.');
        }
      
        // hashing
        const hashedPassword = await bcrypt.hash(password, 10);
      
        // create new user with data input
        const newUser = new User({
          url_img,
          lastname,
          firstname,
          nickname,
          email,
          password: hashedPassword,
          birthdate,
          phone,
          address,
          address_2,
          zip_code,
          city,
          gender,
          top_size,
          bottom_size,
          subscription,
          deposit,
          role,
        });
      
        // Enregistre l'utilisateur dans la base de données
        const savedUser = await newUser.save();
      
        // Retourne l'utilisateur nouvellement créé
        return savedUser;
      }
}



module.exports = new User(client)
