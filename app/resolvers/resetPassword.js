/**
 * resolver of Password
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
