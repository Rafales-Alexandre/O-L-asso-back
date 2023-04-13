const userDatamapper = require("../datamappers/user");
const suitDatamapper = require ("../datamappers/suit");


module.exports = { 
    user:(suit)=>{
        return userDatamapper.findByPk(suit.user_id);
    },
    suit:(user)=>{
        return suitDatamapper.findByPk(user.suit_id)
    }
}
