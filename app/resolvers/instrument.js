const userDatamapper = require('../datamappers/user');

module.exports ={
    user(parent){
        return userDatamapper.findByPk(parent.user_id);
    }
};