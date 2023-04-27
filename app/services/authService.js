/**
 * @method authService - Carry the whole authetification process
 * @module jwt - token to secure the authentification and autorization
 * @module GraphQLError - Error handling 
 */
const jwt = require("jsonwebtoken");
const userDatamapper = require("../datamappers/user");
const { GraphQLError } = require("graphql");

const authService = {
	async login(email, password) {
		const user = await userDatamapper.findByEmail(email);

		if (!user) {
			return false;
		}

		if (user.password !== password) {
			return false;
		}

		const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "7h" });

		delete user.password;

		return {
			token,
			user
		};
	},

	isLoggedIn(context) {
		//authService.ensureThatUserIsAdmin();
		const user = context.user;

		if (!user) {
			throw new GraphQLError("You are not logged in.", {
				extensions: {
					code: "FORBIDDEN",
				},
			});
		}

		return true;
	},
	isRole(roles, context) {
		this.isLoggedIn(context);

		const user = context.user;

		if (!roles.includes(user.role)) {
			throw new GraphQLError("You are not allowed to access this resource", {
				extensions: {
					code: "FORBIDDEN",
				},
			});
		}

		return true;
	},
};


module.exports = authService;
