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
        subscription = false,
        deposit = false,
        role = "member",
    }) {
        // Check if user exists
        const userExists = await this.findByEmail(email);
        if (userExists) {
            throw new Error('Cet email est déjà utilisé.');
        }

        // hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user with data input
        const newUser = {
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
        };

        // Conditionally add properties if provided
        if (url_img) {
            newUser.url_img = url_img;
        }
        if (firstname) {
            newUser.firstname = firstname;
        }
        if (nickname) {
            newUser.nickname = nickname;
        }
        if (birthdate) {
            newUser.birthdate = birthdate;
        }
        if (phone) {
            newUser.phone = phone;
        }
        if (address) {
            newUser.address = address;
        }
        if (address_2) {
            newUser.address_2 = address_2;
        }
        if (zip_code) {
            newUser.zip_code = zip_code;
        }
        if (city) {
            newUser.city = city;
        }
        if (gender) {
            newUser.gender = gender;
        }
        if (top_size) {
            newUser.top_size = top_size;
        }
        if (bottom_size) {
            newUser.bottom_size = bottom_size;
        }

        return this.create(newUser);

       /*  // Build the query
        const columns = Object.keys(newUser);
        const values = Object.values(newUser);
        const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

        // Save user to database
        const baseQuery =
        {
            text: `
                INSERT INTO "user" (${columns.join(', ')})
                VALUES (${placeholders})
                RETURNING *
            `,
            values: values,
        }; */



       /*  const result = await this.client.query(baseQuery);
        console.log("✴.·´¯ Données \"user\" insérées dans la table Users ¯´·.✴");
        return result.rows[0]; */
    }
}



module.exports = new User(client)
