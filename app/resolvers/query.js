const instrumentDatamapper = require ("../datamappers/instrument");
const userDatamapper = require ("../datamappers/user");
const suitDatamapper = require ("../datamappers/suit");
const { GraphQLError } = require("graphql");



const resolverQuery = {
	getAllUsers (){
		return userDatamapper.findAll();
	},
	getUserById(_, args){
		/* if (!args){
			throw new GraphQLError('Invalid_Input', {
				extensions : {
					code : 'BAD_USER_INPUT',
				}
			})
		} */
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
	},
	getSuitsByUser(_,args) {
		return suitDatamapper.findByUser(args.id);
	},
	
};

module.exports = resolverQuery;