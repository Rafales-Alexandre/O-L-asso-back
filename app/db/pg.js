/**
 * Create connexion {Pool} to the database
 */

const debug = require("debug")("SQL:log");

const { Pool } = require("pg");

/**
 * @constant {Object}
 * @default
 * Check wich database to connect : modify the .env 
 * USE_LOCAL_DATABASE=true ==> local database (batala), connectionString takes the value LOCAL_DATABASE_URL
 * USE_LOCAL_DATABASE=fals ==> remote database (railway), connectionString takes the value DATABASE_URL
 */
const useLocalDatabase = process.env.USE_LOCAL_DATABASE === "true";

// ternary condition to define connectionString
const connectionString = useLocalDatabase
	? process.env.LOCAL_DATABASE_URL
	: process.env.DATABASE_URL;

// connecting
const pool = new Pool({
	connectionString,
});

/**
 * Checks if the connection to the database was successful and logs the result.
 * @async
 * @function checkConnectedDatabase
 * @returns {Promise<void>} - A Promise that resolves with undefined when the database connection has been checked.
 * @throws {Error} - Throws an error if the connection to the database fails.
 */
async function checkConnectedDatabase() {
	try {
		const client = await pool.connect();
		const result = await client.query("SELECT current_database()");
		console.log("Connected to database:", result.rows[0].current_database);
	} catch (error) {
		console.error("Error checking connected database:", error);
	}
}

checkConnectedDatabase();

let queryCount = 0;

module.exports = {

	/**
   * The original client object from the connection pool.
   * @property {Pool}
   */
	originalClient: pool,

	/**
   * Executes a query on the database and logs it before executing.
   * @async
   * @function query
   * @param {...*} params - The parameters to pass to the `query` method of the connection pool.
   * @returns {Promise<Object>} - A Promise that resolves with the result of the query.
   * @throws {Error} - Throws an error if the query fails.
   */
	async query(...params) {
		debug(...params);
		queryCount += 1;
		debug(`Req n°${queryCount}`);

		return this.originalClient.query(...params);
	},
};