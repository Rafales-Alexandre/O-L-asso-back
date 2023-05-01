/**
 * Index of resolvers features 
 */

const Query = require("./query");
const User = require("./user");
const Instrument = require("./instrument");
const { DateResolver, DateTimeResolver } = require("graphql-scalars");
const Suit = require("./suit");
const Mutation = require("./mutation");

/**
 * ! gros besoin de relecture des methodes 
 */
// const { askResetPassword, verifyResetPasswordToken} = require("./resetPassword")
// const ResetPassword = require ("./resetPassword");
module.exports = {
	Date: DateResolver,
	DateTime: DateTimeResolver,
	Query,
	User,
	Instrument,
	Suit,
	Mutation,
	//askResetPassword,
	//verifyResetPasswordToken
	//ResetPassword
};