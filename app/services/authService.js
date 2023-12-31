/* eslint-disable quotes */
/**
 * @method authService - Carry the whole authetification process
 * @module jwt - token to secure the authentification and autorization
 * @module GraphQLError - Error handling made by ApolloServer to send errorCode to React
 */
const jwt = require("jsonwebtoken");
const userDatamapper = require("../datamappers/user");
const { GraphQLError } = require("graphql");
const bcrypt = require("bcrypt"); // Try on bcrypt


const authService = {
	/**
	 * @function login - Will verify is the user is online, and if the password match the data in database 
	 * @param {*} email - From User
	 * @param {*} password 
	 * @returns 
	 */
	async login(email, password) {
		const user = await userDatamapper.findByEmail(email);

		if (!user) {
			throw new GraphQLError("You're not allowed in", {
				code: "FORBIDDEN",
				http: {
					status: 401,
					headers: new Map([
						['Unauthorize',  'user'],
						['back ', 'home']
					])
				}
			});
			//return false;
		}

		const passwordIsOk = await bcrypt.compare(password, user.password);

		if (!passwordIsOk) {
			throw new GraphQLError("Wrong password ", {
				code: "FORBIDDEN",
				http: {
					status: 403,
					headers: new Map([
						['Wrong', 'Password'], 
						['try', 'again']]),
				},
			});
		}
		/**If the two previous conditions don't throw Error, then we will generate the Authetification/Autorization token 
 */
		const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "7h" });
		console.log("user is connected", user )

		/** After 7h of connection, the token will be deleted and the user will have to reconnect  */
		delete user.password;
		return {
			token,
			user
		};
	},
	/**
	  * @function isLoggedIn - Will verified if the user is logged in to make sure only members can access to the intranet 
	  * @param {*} context - Specifications from ApolloServer, it's linked to the token in the headers
	  * @returns 
	  */
	isLoggedIn(context) {

		const user = context.user;

		if (!user) {
			throw new GraphQLError("You are not logged in.", {
				extensions: {
					code: "FORBIDDEN",
					http: {
						status: 401,
						headers: new Map([
							['Unlogged', 'user'],
							['send back', 'to login page'],
						])
					},
				}
			});
			// return true;
		}
	},

	/**
	 * @function isRole - Thank to the preious functions, we have the hability to collect information about User like the Role. Not All members from Batala can access to all the features. 
	 * @param {*} roles 
	 * @param {*} context 
	 * @returns 
	 */
	isRole(roles, context) {
		this.isLoggedIn(context);

		const user = context.user;

		if (!roles.includes(user.role)) {
			throw new GraphQLError("You are not allowed to access this feature", {
				extensions: {
					code: "FORBIDDEN",
					http: {
						status: 401,
						headers: new Map([
							['Unauthorize', 'user'],
							['send back', 'to home page'],
						])
					},
				},
			});
		}

	//	return redirection code 404;
	},
};


module.exports = authService;
