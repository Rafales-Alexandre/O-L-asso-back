const userDatamapper = require("../datamappers/user");

module.exports = { 
    user:(parent)=>{
        return userDatamapper.findbyPk(parent.user_id);
    }
}
