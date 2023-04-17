const userDatamapper = require('../datamappers/user');
const instrumentDatamapper = require('../datamappers/instrument');
const suitDatamapper = require('../datamappers/suit');

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
    }

};