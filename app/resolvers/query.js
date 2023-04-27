/**
 * List of Query
 */

const instrumentDatamapper = require ("../datamappers/instrument");
const userDatamapper = require ("../datamappers/user");
const suitDatamapper = require ("../datamappers/suit");
const authService = require("../services/authService");
const resetPasswordDatamapper = require("../datamappers/resetPassword")

const resolverQuery = {
	getAllUsers (_,__,contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return userDatamapper.findAll();
	},
	getUserById(_, args, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return userDatamapper.findByPk(args.id);
	},
	getAllInstruments(_, __, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);

		return instrumentDatamapper.findAll();
	},
	getInstrumentById(_, args, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return instrumentDatamapper.findByPk(args.id);
	},
	getAllSuits (_,__, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return suitDatamapper.findAll();
	},
	getSuitById(_,args, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return suitDatamapper.findByPk(args.id);
	},
	getSuitsByUser(_,args, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return suitDatamapper.findByUser(args.id);
	},
	askResetPassword (_,{ email }, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return resetPasswordDatamapper.askResetPassword(_,{ email });
	},
	verifyResetPasswordToken(_,{ token }, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return resetPasswordDatamapper.verifyResetPasswordToken(_,{ token });
	},
	getInstrumentsByUser(_, args, contextValue){
		authService.isRole([ "admin"] , contextValue);
		return instrumentDatamapper.findByUser(args.id);
	}
	
};

module.exports = resolverQuery;