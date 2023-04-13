const suitDatamapper = require("../datamappers/suit");
const instrumentDatamapper = require ("../datamappers/instrument");
const userHasSuitDatamapper = require ("../datamappers/userHasSuit");

const resolvers = {
instrument (parent){
    return instrumentDatamapper.findByPk(parent.instrument_id)
},

suit (parent){
    return suitDatamapper.findByPk(parent.suit_id)
},

userHasSuit(parent){
    return userHasSuitDatamapper.findByPk(parent.userHasSuit_id)
}

}

module.exports = resolvers ; 