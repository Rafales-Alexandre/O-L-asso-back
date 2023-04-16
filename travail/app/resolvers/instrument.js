const userDatamapper = require("../datamappers/user");

module.exports = { 
    user:async (parent)=>{
        console.log('Fetching user for instrument:', parent);
        const user= await userDatamapper.findbyPk(parent.user_id);
        console.log('Fetched user: ', user);
        return user;
    }
}
