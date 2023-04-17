const userDatamapper = require("../datamappers/user");
const suitDatamapper = require ("../datamappers/suit");


module.exports = { 
    user:(suit)=>{
        console.log(suit)
        return userDatamapper.findByPk(suit.user_id);
    },
    suit:(user)=>{
        console.log(user)
        return suitDatamapper.findByPk(user.suit_id);
        
    }
};
