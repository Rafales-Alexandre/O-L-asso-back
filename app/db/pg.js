/**
 * Create connexion {Pool} to the database
 */


const debug = require("debug")("SQL:log"); 

const { Pool } = require("pg");



const useLocalDatabase = process.env.USE_LOCAL_DATABASE === "true";

const connectionString = useLocalDatabase
	? process.env.LOCAL_DATABASE_URL
	: process.env.DATABASE_URL;

const pool = new Pool({
	connectionString,
});

// Fonction pour vérifier et afficher la base de données connectée
async function checkConnectedDatabase() {
	try {
	  const client = await pool.connect();
	  const result = await client.query("SELECT current_database()");
	  console.log("Connected to database:", result.rows[0].current_database);
	} catch (error) {
	  console.error("Error checking connected database:", error);
	}
}
  
// Appeler la fonction pour vérifier la base de données connectée
checkConnectedDatabase();

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