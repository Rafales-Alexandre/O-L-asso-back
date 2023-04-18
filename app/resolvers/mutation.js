const userDatamapper = require('../datamappers/user');
const instrumentDatamapper = require('../datamappers/instrument');
const suitDatamapper = require('../datamappers/suit');
const userHasSuit = require('../datamappers/userHasSuit');

module.exports = {
    addUser(_, args) {
        return userDatamapper.create(args.input);
    },
    addInstrument(_, args) {
        return instrumentDatamapper.create(args.input);
    },
    addSuit(_, args) {
        return suitDatamapper.create(args.input);
    },
    deleteSuit(parent, {id}) {
        return suitDatamapper.deleteSuit(id);
    },
    deleteUser(parent, {id}){
        return userDatamapper.deleteUser(id);
    },
    deleteInstrument(_, {id}){
        return instrumentDatamapper.deleteInstrument(id);
    },
    deleteUserHasSuit(_,{id}){
        return userHasSuit.deleteUserHasSuit(id);
    }

};
