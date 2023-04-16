const userDatamapper = require("../datamappers/user");

module.exports = { 
    user:(suit)=>{
        return userDatamapper.findbyPk(suit.user_id);
    }
}
