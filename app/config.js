module.exports = {
	jwtSecret: process.env.SECRET,
	email: {
		service: "Gmail",
		user: process.env.EMAIL,
		pass: process.env.EMAILPASSWORD
	}
};