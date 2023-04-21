/**
 * Resolvers of User 
 */

const instrumentDatamapper = require("../datamappers/instrument");
const suitDatamapper = require("../datamappers/suit");


module.exports = {
	instrument(user){
		return instrumentDatamapper.findByUser(user.id);
	},
	suits(user) {
		return suitDatamapper.findByUser(user.id);
	}

};
