const instrumentDatamapper = require("../datamappers/instrument");
const userHasSuitDatamapper = require("../datamappers/userHasSuit");

module.exports = {
    instrument(user){
        return instrumentDatamapper.findByUser(user.id);
    },
    userHasSuit(suit) {
        return userHasSuitDatamapper.findByPk(suit.id);
    }
};
