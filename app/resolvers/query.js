/**
 * List of Query, based on the one wroted in gql
 */

/**
 * Require the datamappers to have the metjod need for the query
 */
const instrumentDatamapper = require ("../datamappers/instrument");
const userDatamapper = require ("../datamappers/user");
const suitDatamapper = require ("../datamappers/suit");
const authService = require("../services/authService");
const resetPasswordDatamapper = require("../datamappers/resetPassword");

/**
 * @method resolverQuery Is an ensemble of the method + the middelware of authentification
 * ! factorisation pour all access, superior access ? 
 * @function get(...) are the one using the datamappers
 * @function authService use the contextValue (the token is attached to it) and will provide the autorization to access or not to certain feature 
 */

const resolverQuery = {
	getAllInstruments(_, __, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);

		return instrumentDatamapper.findAll();
	},
	getAllUsers (_,__,contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return userDatamapper.findAll();
	},
	getAllSuits (_,__, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return suitDatamapper.findAll();
	},
	getInstrumentById(_, args, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return instrumentDatamapper.findByPk(args.id);
	},
	getUserById(_, args, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return userDatamapper.findByPk(args.id);
	},
	getSuitById(_,args, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return suitDatamapper.findByPk(args.id);
	},
	getSuitsByUser(_,args, contextValue) {
		authService.isRole(["board", "admin"], contextValue);
		return suitDatamapper.findByUser(args.id);
	},
	getInstrumentsByUser(_, args, contextValue){
		authService.isRole([ "admin"] , contextValue);
		return instrumentDatamapper.findByUser(args.id);
	},
	askResetPassword (_,{ email }, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return resetPasswordDatamapper.askResetPassword(_,{ email });
	},
	verifyResetPasswordToken(_,{ token }, contextValue){
		authService.isRole(["board", "admin", "member"], contextValue);
		return resetPasswordDatamapper.verifyResetPasswordToken(_,{ token });
	}
	
};

module.exports = resolverQuery;