/**
 * This file aim to seed datas into the database for dev. time.
 * this script uses fakerjs to seed the table "user"
 * this script is called in package.json script "resetDB" : npm run resetDB ?
 */
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const debug = require('debug')('seeding');
const db = require('../app/db/pg');

faker.locale = 'fr';

const NB_USERS = 70;


function pgQuoteEscape(row) {
    const newRow = {};
    Object.entries(row).forEach(([prop, value]) => {
        if (typeof value !== 'string') {
            newRow[prop] = value;
            return;
        }
        newRow[prop] = value.replaceAll("'", "''");
    });
    return newRow;
}

async function generateUsers(nbUsers) {
    const users = [];
    for (let i = 0; i < nbUsers; i+= 1){
        const user = {
            url_img: faker.image.avatar(),
            lastname: faker.name.lastName(),
            firstname: faker.name.firstName(),
            nickname: faker.name.firstName().slice(0,3),
            email:faker.internet.email(),
            password: faker.internet.password(),
            birthdate: faker.date.between('1960-01-01', '2000-12-31').toISOString().slice(0, 10),
            phone: faker.phone.number('0#-##-##-##-##'),
            address: faker.address.streetAddress(),
            address_2: faker.address.secondaryAddress(),
            zip_code: faker.address.zipCode('#####'),
            //city: "la rochelle",
            city: faker.address.city(), 
            gender: faker.helpers.arrayElement(["F", "M"]),
            top_size: faker.helpers.arrayElement(["S","M","L","XL","XXL","XXXL"]),
            bottom_size: faker.helpers.arrayElement(["S","M","L","XL","XXL","XXXL"]),
            subscription: faker.datatype.boolean(),
            deposit: faker.datatype.boolean(),
            role: faker.helpers.arrayElement(['adherent', 'bureau', 'admin'])
        };
        users.push(user);
        console.log(user)
        
    }
   
    return users;
}
async function insertUsers(users) {
    await db.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');
    const usersValues = users.map((user) => {
        const newUser = pgQuoteEscape(user);  
        return `(
            '${newUser.url_img}',
            '${newUser.lastname}',
            '${newUser.firstname}',
            '${newUser.nickname}',
            '${newUser.email}',
            '${newUser.password}',
            '${newUser.birthdate}',
            '${newUser.phone}',
            '${newUser.address}',
            '${newUser.address_2}',
            '${newUser.zip_code}',
            '${newUser.city}',
            '${newUser.gender}',
            '${newUser.top_size}',
            '${newUser.bottom_size}',
            '${newUser.subscription}',
            '${newUser.deposit}',
            '${newUser.role}'
        )`;
    });
    const queryStr = `
    INSERT INTO "user"
    (
        "url_img",
        "lastname",
        "firstname",
        "nickname",
        "email",
        "password",
        "birthdate",
        "phone",
        "address",
        "address_2",
        "zip_code",
        "city",
        "gender",
        "top_size",
        "bottom_size",
        "subscription",
        "deposit",
        "role"
    )
    VALUES
        ${usersValues}
        RETURNING id
    `;
    const result = await db.query(queryStr);
    console.log("données insérées")
    return result.rows;
}

(async () => {
    /**
     * Generating users
     */
    const users = await generateUsers(NB_USERS);
    const insertedUsers = await insertUsers(users);
    debug(`${insertedUsers.length} users inserted`);
    const userIds = insertedUsers.map((user) => user.id);
    //db.originalClient.end();
    console.log("bonjour ?")
})();