/**
 * Resolvers of User 
 */

const userDatamapper = require ("../datamappers/user");

module.exports = {
	users(suit){
		return userDatamapper.findBySuit(suit.id);
	},
	total(suit) {
		return userDatamapper.findBySuitTotal(suit.id);
	}
};