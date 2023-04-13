const instrumentDatamapper = require ("../datamappers/instrument");
const userDatamapper = require ("../datamappers/user");
const suitDatamapper = require ("../datamappers/suit");

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
    }
};

module.exports = resolverQuery;