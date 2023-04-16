const instrumentDatamapper = require("../datamappers/instrument");


module.exports = {
    instrument(user){
        return instrumentDatamapper.findByUser(user.id);
    }
};