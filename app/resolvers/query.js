const instrumentDatamapper = require ("../datamappers/instrument");
const userDatamapper = require ("../datamappers/user");
const suitDatamapper = require ("../datamappers/suit");


const resolverQuery = {
	getAllUsers (){
		return userDatamapper.findAll();
	},
	getUserById(_, args){
		return userDatamapper.findByPk(args.id);
	},
	getAllInstruments(){
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
	}
};

module.exports = resolverQuery;