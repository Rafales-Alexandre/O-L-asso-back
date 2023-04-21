/**
 * Create connexion {Pool} to the database
 */


const debug = require("debug")("SQL:log"); 

const { Pool } = require("pg");

const pool = new Pool();

let queryCount = 0;

module.exports = {
   
	originalClient: pool,

	async query(...params) {
		debug(...params);
		queryCount += 1;
		debug(`Req n°${queryCount}`);

		return this.originalClient.query(...params);
	},
};