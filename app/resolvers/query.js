const instrumentDatamapper = require ("../datamappers/instrument");
const userDatamapper = require ("../datamappers/user");

const resolverQuery = {
    getAllUser (){
        return userDatamapper.findAll();
    },
    getUserById(id){
        return userDatamapper.findByPk(id);
    },
    getAllInstrument(){
        return instrumentDatamapper.findAll();
    }
};

module.exports = resolverQuery;