/**
 * Resolvers for Suit, will  make the missing link between table to make the perfect query  
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