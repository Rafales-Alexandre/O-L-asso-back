/**
   * Creates a new user with the given data, and hashes their password using bcrypt.
   * @param {Object} userData - The data for the new user to create.
   * @param {string} userData.email - The email address of the user to create.
   * @param {string} userData.password - The plaintext password of the user to create.
   * @returns {Object} - The newly created user object.
   * @throws Error - Throws an error if the email address is already in use.
   */


const bcrypt = require ("bcrypt");

const bCrypt = {
	async createBcryptUser(userData) {

		const hashedPassword = await bcrypt.hash(userData, 10);

		/* const newUser = {
            userData.password : hashedPassword,
        } 
		 */

		return hashedPassword;
	}
};

module.exports = bCrypt; 