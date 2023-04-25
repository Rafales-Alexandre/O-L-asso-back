const jwt = require("jsonwebtoken");
const userDatamapper = require("../datamappers/user");
const { GraphQLError } = require("graphql");

const authService = {
	async login({ email, password }) {
		const user = await userDatamapper.findByEmail(email);

		if (user.password !== password) {
			return false;
		}

		const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "7h" });

		const {
			id, url_img, lastname, firstname, nickname, birthdate, phone,
			address, address_2, zip_code, city, gender, top_size, bottom_size,
			subscription, deposit, role } = user;

		const userReturns = {
			id, url_img, lastname, firstname, nickname, email, birthdate, phone,
			address, address_2, zip_code, city, gender, top_size, bottom_size,
			subscription, deposit, role
    };

		//console.log("userReturns : ", userReturns);

		return token;

		/* return {
			token: JSON.stringify({ token: token }),
			user: userReturns

		}; */
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
