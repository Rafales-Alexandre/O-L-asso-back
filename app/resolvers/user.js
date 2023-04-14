const instrumentDatamapper = require ("../datamappers/instrument");
const userHasSuitDatamapper = require ("../datamappers/userHasSuit");

const resolvers = {
instrument (parent){
    return instrumentDatamapper.findByPk(parent.user_id);
},

userHasSuit(parent){
    return userHasSuitDatamapper.findByPk(parent.suit_id)
}

}

module.exports = resolvers ;
