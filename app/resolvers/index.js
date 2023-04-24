/**
 * Index of resolvers features 
 */

const Query = require("./query");
const User = require("./user");
const Instrument = require("./instrument");
const { DateResolver, DateTimeResolver } = require("graphql-scalars");
const Suit = require("./suit");
const Mutation = require("./mutation");

module.exports = {
	Date: DateResolver,
	DateTime: DateTimeResolver,
	Query,
	User,
	Instrument,
	Suit,
	Mutation,
	
};