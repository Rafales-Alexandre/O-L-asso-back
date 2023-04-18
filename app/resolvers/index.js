const Query = require ("./query");
const User = require ("./user");
const Instrument = require ("./instrument");

const Suit = require ("./suit");
//const customScalars = require("./customScalarsResolvers");
const Mutation = require("./mutation");

module.exports = {
	//customScalars,
	Query,
	User,
	Instrument,
	
	Suit,
	Mutation
};