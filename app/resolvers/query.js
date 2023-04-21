/**
 * List of Query
 */

const instrumentDatamapper = require ("../datamappers/instrument");
const userDatamapper = require ("../datamappers/user");
const suitDatamapper = require ("../datamappers/suit");
const authService = require("../services/authService");

const resolverQuery = {
	getAllUsers (){
		return userDatamapper.findAll();
	},
	getUserById(_, args){
		return userDatamapper.findByPk(args.id);
	},
	getAllInstruments(_, __, contextValue){
		authService.isRole(["board", "admin"], contextValue);

		return instrumentDatamapper.findAll();
	},
	getInstrumentById(_, args){
		return instrumentDatamapper.findByPk(args.id);
	},
	getAllSuits (){
		return suitDatamapper.findAll();
	},
	getSuitById(_,args){
		return suitDatamapper.findByPk(args.id);
	},
	getSuitsByUser(_,args) {
		return suitDatamapper.findByUser(args.id);
	},
	
};

module.exports = resolverQuery;