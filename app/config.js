/* eslint-disable no-undef */
/**
 * The configuration options for the server, including the secret for JWT and the credentials for the Mailtrap service.
 * @typedef {Object} ServerConfig
 * @property {string} jwtSecret - The secret key used for JSON Web Token (JWT) encryption.
 * @property {Object} mailtrap - The credentials for the Mailtrap email service.
 * @property {string} mailtrap.host - The hostname for the Mailtrap SMTP server.
 * @property {number} mailtrap.port - The port number for the Mailtrap SMTP server.
 * @property {Object} mailtrap.auth - The authentication credentials for the Mailtrap SMTP server.
 * @property {string} mailtrap.auth.user - The username for the Mailtrap SMTP server.
 * @property {string} mailtrap.auth.pass - The password for the Mailtrap SMTP server.
 */

/**
 * The configuration object that exports the server configuration options, including the secret for JWT and the credentials for the Mailtrap service.
 * @type {ServerConfig}
 */

module.exports = {
	jwtSecret: process.env.SECRET,

	mailtrap: {
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "af18e4fb1c092f",
			pass: "227cbcf65351e1"
		}
	}

};
