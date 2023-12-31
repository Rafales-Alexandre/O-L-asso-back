/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/**
 * @ - This file aim to seed datas into the database for dev. time.
 * @module dotenv - Make accessible the requirement of enviromnt value of the .env file 
 * @module faker -  Create a range of fake data 
 * @module db - Client Pool connections to the database 
 * @module instruments - Model data provide to feed faker 
 * @module suits - Model data provide to feed faker
 * @module userHasSuit - Model data provide to feed faker
 */

require('dotenv').config();
const { faker } = require('@faker-js/faker');
const debug = require('debug')('seeding');
const db = require('../app/db/pg');
const instruments = require('./instruments');
const suits = require('./suits');
const userHasSuits = require('./user_has_suits');
const bcrypt = require("bcrypt");

/** Call of the enviromnt file  */
faker.locale = 'fr';

/** @params {NB_USERS} - Numbers of values created by faker */
const NB_USERS = 70;

/**
 * @function pgQuoteEscape - Formating the entries for the database 
 * @param {*} row 
 * @returns 
 */
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
/**
 * @functionn generateUsers - create the fake user data, with a models
 * @param {*} nbUsers - @see NB_USERS 
 * @returns {user ={...values}}
 */
async function generateUsers(nbUsers) {
	const users = [];
	/**
     * explication requise
     */
	const password = bcrypt.hashSync("chuckpass", 10);
	for (let i = 0; i < nbUsers; i += 1) {
		const user = {
			url_img: faker.image.avatar(),
			lastname: faker.name.lastName(),
			firstname: faker.name.firstName(),
			nickname: faker.name.firstName().slice(0, 3),
			email: faker.internet.email(),
			password: password,
			birthdate: faker.date.between('1960-01-01', '2000-12-31').toISOString().slice(0, 10),
			phone: faker.phone.number('0#-##-##-##-##'),
			address: faker.address.streetAddress(),
			address_2: faker.address.secondaryAddress(),
			zip_code: faker.address.zipCode('#####'),
			city: faker.address.city(),
			gender: faker.helpers.arrayElement(["F", "M", "Mixte"]),
			top_size: faker.helpers.arrayElement(["S", "M", "L", "XL", "XXL", "XXXL"]),
			bottom_size: faker.helpers.arrayElement(["S", "M", "L", "XL", "XXL", "XXXL"]),
			subscription: faker.datatype.boolean(),
			deposit: faker.datatype.boolean(),
			role: faker.helpers.arrayElement(['member', 'board', 'admin'])
		};
		users.push(user);
	}

	return users;
}
/**
 * @function insertUsers - Insert User in Database
 * @param {*} users - Created by precedent function 
 * @returns 
 */
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
    (
        '',
        'Norris',
        'Chuck',
        '',
        'cn@email.com',
        '$2b$10$kX/3sXvKjQd9qiwaTQlvs.HfkLXBLf4E0C6.yxSY46ZWHMDT5MQFe',
        '1970-01-01',
        '',
        '',
        '',
        '17000',
        '',
        'M',
        'L',
        'L',
        'true',
        'true',
        'admin'
    ), --superpass
        ${usersValues}
        RETURNING id
    `;
	const result = await db.query(queryStr);
	console.log("✴.·´¯ Données \"user\" insérées dans la table Users ¯´·.✴");
	return result.rows;
}

/**
 * @function insertInstuments - generate Instrument and assignation to user 
 * @param {*} usersIds - @see user 
 * @returns 
 */

async function insertInstuments(usersIds = []) {

	if (!usersIds.length) {
		throw new Error('Pas d\'utilisateurs passés en paramètres ou tableau vide');
	}

	const intrumentToInsert = instruments.map(instrument => {
		const data = {
			"code": instrument[0],
			"pupitre": instrument[1],
			"observation": instrument[2],
			"depth": instrument[3],
			"rods": instrument[4],
			"weight": instrument[5],
			"sticker": instrument[6],
			"user_id": instrument[7]
		};

		return data;
	});

	const instrumentValues = intrumentToInsert.map(instrument => {
		const newInstrument = pgQuoteEscape(instrument);
		return `(
            '${newInstrument.code}',
            '${newInstrument.pupitre}',
            '${newInstrument.observation}',
            ${newInstrument.depth},
            ${newInstrument.rods},
            ${newInstrument.weight},
            '${newInstrument.sticker}',
            ${newInstrument.user_id || 'NULL'}
        )`;

	});
	const queryStr = `
    INSERT INTO "instrument" (
        "code",
        "pupitre",
        "observation",
        "depth",
        "rods",
        "weight",
        "sticker",
        "user_id"
    )
    VALUES
        ${instrumentValues}
    `;
	const result = await db.query(queryStr);
	console.log("✴.·´¯ Données \"instruments\" insérées dans la table Instruments ¯´·.✴ ");
	return result.rows;
}

/**
 * @function insertSuits - create the suit data and assign them to user 
 * @returns data insertable in Database 
 */
async function insertSuits() {
	const suitsToInsert = suits.map((suit) => {
		const data = {
			"label": suit[0],
			"gender": suit[1],
			"observation": suit[2],
			"quantity_s": suit[3],
			"quantity_m": suit[4],
			"quantity_l": suit[5],
			"quantity_xl": suit[6],
			"quantity_xxl": suit[7],
			"quantity_xxxl": suit[8]
		};
		return data;
	});

	await db.query('TRUNCATE TABLE "suit" RESTART IDENTITY CASCADE');

	const suitsValues = suitsToInsert.map((suit) => {
		const newSuit = pgQuoteEscape(suit);
		return `(
            '${newSuit.label}',
            '${newSuit.gender}',
            '${newSuit.observation}',
            '${newSuit.quantity_s}',
            '${newSuit.quantity_m}',
            '${newSuit.quantity_l}',
            '${newSuit.quantity_xl}',
            '${newSuit.quantity_xxl}',
            '${newSuit.quantity_xxxl}' 
        )`;
	});
	const queryStr = `
    INSERT INTO "suit"
        (
            "label",
            "gender",
            "observation",
            "quantity_s",
            "quantity_m",
            "quantity_l",
            "quantity_xl",
            "quantity_xxl",
            "quantity_xxxl"
        )
        VALUES
            ${suitsValues}
            RETURNING id
    `;
	const result = await db.query(queryStr);
	console.log("✴.·´¯ Données \"costumes\" insérées dans la table Suits¯´·.✴");
	return result.rows;
}

/**
 * @function insertedUsersHasSuits - this table is a bit different, since it shall use and link specific values between them, and not randomize them 
 * @param {*} usersIds 
 * @param {*} suitsIds 
 * @returns 
 */
async function insertUserHasSuit(usersIds = [], suitsIds = []) {

	if (!usersIds.length || !suitsIds.length) {
		throw new Error('Pas d\'utilisateurs ou de costumes passés en paramètres ou tableau vide');
	}
	const userHasSuitsToInsert = userHasSuits.map(userHasSuit => {
		const data = {
			"user_id": userHasSuit[0],
			"suit_id": userHasSuit[1], 
		};
		return data;
	});

	await db.query('TRUNCATE TABLE "user_has_suit" RESTART IDENTITY CASCADE');

	const userHasSuitsValues = userHasSuitsToInsert.map((userHasSuit) => {
		const newUserHasSuit = pgQuoteEscape(userHasSuit);
		return `(
            '${newUserHasSuit.user_id}',
            '${newUserHasSuit.suit_id}'
        )`;
	});
	const queryStr = `
    INSERT INTO "user_has_suit"
    (
        "user_id",
        "suit_id"
    )
    VALUES
        ${userHasSuitsValues}
        RETURNING id
`;
	const result = await db.query(queryStr);
	console.log("✴.·´¯ Données \"utilisateurs a un costumes \" insérées dans la table User_has_suit¯´·.✴");
	return result.rows;
}

/**
 * @function
 * Will run every function of the script 
 * ! need explanationabout the process.exit()
 */
(async () => {
	
	const users = await generateUsers(NB_USERS);
	const insertedUsers = await insertUsers(users);
	debug(`${insertedUsers.length} users inserted`);
	const userIds = insertedUsers.map((user) => user.id);
	const insertedInstruments = await insertInstuments(userIds);
	const insertedSuits = await insertSuits();
	const suitIds = insertedSuits.map((suit) => suit.id);
	const insertedUsersHasSuits = await insertUserHasSuit(userIds, suitIds);
	process.exit();
})();
