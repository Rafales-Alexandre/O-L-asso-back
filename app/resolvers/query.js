const instrumentDatamapper = require ("../datamappers/instrument");
const userDatamapper = require ("../datamappers/user");
const suitDatamapper = require ("../datamappers/suit");
const userHasSuitDatamapper = require ("../datamappers/userHasSuit");

const resolverQuery = {
	getAllUser (){
		return userDatamapper.findAll();
	},
	getUserById(id){
		return userDatamapper.findByPk(id);
	},
	getAllInstrument(){
		return instrumentDatamapper.findAll();
	},
	getInstrumentById(id){
		return instrumentDatamapper.findByPk(id);
	},
	getAllSuit (){
		return suitDatamapper.findAll();
	},
	getSuitById(id){
		return suitDatamapper.findByPk(id);
	},
    getAllUserWithSuit(){
        return userHasSuitDatamapper.findAll();
    },
    getThisUserHasThisSuit(id){
        return userHasSuitDatamapper.findByPk(id);
    }
};

module.exports = resolverQuery;