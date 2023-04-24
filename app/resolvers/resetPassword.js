const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
	service: config.email.service,
	auth: {
		user: config.email.user,
		pass: config.email.pass
	}
});

async function askResetPassword(_, { email }, { db }) {
	const user = await db.query("SELECT * FROM 'user' WHERE email = $1", [email]);
	if (!user) {
		throw new Error("User not found");
	}
  
	const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: "1h" });
  
	await db.query(
		"INSERT INTO password_reset_requests (user_id, reset_token, expiration) VALUES ($1, $2, NOW() + INTERVAL '1 hour')",
		[user.id, token]
	);
  
	const mailOptions = {
		from: config.email.user,
		to: email,
		subject: "Réinitialisation de votre mot de passe",
		html: `<p>Pour réinitialiser votre mot de passe, veuillez suivre ce lien :</p><a href="http://front-lasso/reset-password?token=${token}">Réinitialiser mon mot de passe</a>`
	};
  
	await transporter.sendMail(mailOptions);
  
	return { message: "Email sent" };
}
  
async function verifyResetPasswordToken(_, { token }, { db }) {
	try {
		jwt.verify(token, config.jwtSecret);
  
		const request = await db.query("SELECT * FROM password_reset_requests WHERE reset_token = $1 AND expiration > NOW()", [
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

async function resetPassword(_, { token, newPassword }, { db }) {
	try {
		const decoded = jwt.verify(token, config.jwtSecret);
  
		const request = await db.query("SELECT * FROM password_reset_requests WHERE reset_token = $1 AND expiration > NOW()", [
			token
		]);
  
		if (!request) {
			throw new Error("Token not found or expired");
		}
  
		/**
       * Hash the new password with bcrypt
       */
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
		await db.query("UPDATE \"user\" SET password = $1 WHERE id = $2", [hashedPassword, request.user_id]);
		await db.query("DELETE FROM password_reset_requests WHERE id = $1", [request.id]);
  
		return { success: true
		};
	} catch (error) {
		return { success: false, message: error.message };
	}
}
  
module.exports = {
	askResetPassword,
	verifyResetPasswordToken,
	resetPassword
};