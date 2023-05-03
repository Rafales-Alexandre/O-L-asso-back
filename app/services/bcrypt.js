 /**
   * Creates a new user with the given data, and hashes their password using bcrypt.
   * @param {Object} userData - The data for the new user to create.
   * @param {string} userData.email - The email address of the user to create.
   * @param {string} userData.password - The plaintext password of the user to create.
   * @returns {Object} - The newly created user object.
   * @throws Error - Throws an error if the email address is already in use.
   */

 const bCrypt = {
async createBcrypt(userData) {
    // Check if user exists
    const userExists = await this.findByEmail(userData.email);
    if (userExists) {
        
 throw new GraphQLError("You're not allowed in", {
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
    // hashing
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // create new user with data input
    userData.password = hashedPassword;

    return this.create(userData);
}
 }

 module.exports = bCrypt; 