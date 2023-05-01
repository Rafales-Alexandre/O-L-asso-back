/**
 * Resolvers for resetPassword, will  make the missing link between table to make the perfect query  
 */
const resetPasswordDatamapper = require("../datamappers/resetPassword");
const userDatamapper = require ("../datamappers/user");

module.exports= {
	user(){
		return userDatamapper.findByPk();
	},
	resetPassword(email){
		return  resetPasswordDatamapper.resetPassword(email);
	}
};
