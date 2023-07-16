const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg");
const userDatamapper = require("./user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const config = require("../config");
const transporter = nodemailer.createTransport(config.mailtrap);

/**
 * Class representing a password reset controller.
 * @extends CoreDatamapper
 */

class ResetPassword extends CoreDatamapper {
    tablename = 'password_reset_requests';

/**
  * Creates a new password reset request for a user and sends a password reset email.
  * @param {*} _ - Unused parameter.
  * @param {Object} args - Arguments for the password reset request.
  * @param {string} args.email - The email address of the user requesting a password reset.
  * @returns {Object} - An object with a message indicating that the password reset email has been sent.
*/
async askResetPassword(_, { email }) {
    // find the user by email
    const user = await userDatamapper.findByEmail(email);

    // if no such user exists, throw an error or return a message
    if (!user) {
        throw new Error("No user found with this email");
    }

    // generate a new jwt token for the user
    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: "1h" });

    // insert the token into the database
    await client.query(
        "INSERT INTO password_reset_requests (user_id, reset_token, expiration) VALUES ($1, $2, NOW() + INTERVAL '1 hour')",
        [user.id, token]
    );

    // email details
    const mailOptions = {
        from: "BataDev",
        to: email,
        subject: "Réinitialisation de votre mot de passe",
        html: `<p>Pour réinitialiser votre mot de passe, veuillez suivre ce lien :</p><a href="http://https://o-l-asso-front.vercel.app/ResetPassword?token=${token}&email=${email}">Réinitialiser mon mot de passe</a>`
    };

    // send the email with the reset link including the token
    await transporter.sendMail(mailOptions);

    // return a success message
    return { message: "Email sent" };
}

    /**
   * Verifies if a given password reset token is valid.
   * @param {*} _ - Unused parameter.
   * @param {Object} args - Arguments for the password reset token verification.
   * @param {string} args.token - The password reset token to be verified.
   * @returns {Object} - An object with a boolean flag indicating if the token is valid or not.
   */
    async verifyResetPasswordToken(_, { token }) {
        try {
            jwt.verify(token, config.jwtSecret);

            const request = await this.client.query("SELECT * FROM password_reset_requests WHERE reset_token = $1 AND expiration > NOW()", [
                token
            ]);

            if (!request) {
                throw new Error("Token not found or expired");
            }

            return { valid: true };
        } catch (error) {
            return { valid: false };
        }
    }

      /**
   * Resets the password of a user with a given password reset token.
   * @param {*} _ - Unused parameter.
   * @param {Object} args - Arguments for the password reset operation.
   * @param {string} args.newPassword - The new password for the user.
   * @returns {Object} - An object indicating if the password reset was successful or not.
   */
    async resetPassword(_, { newPassword }) {
        try {

            /**
           * Hash the new password with bcrypt
           */
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            await this.client.query("UPDATE \"user\" SET password = $1 WHERE id = $2", [hashedPassword, request.user_id]);
            await this.client.query("DELETE FROM password_reset_requests WHERE id = $1", [request.id]);

            return {
                success: true
            };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
};

module.exports = new ResetPassword(client)
