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
        return suitDatamapper.delete(id);
    },
    deleteUser(parent, {id}){
        return userDatamapper.delete(id);
    },
    deleteInstrument(_, {id}){
        return instrumentDatamapper.delete(id);
    },
    updateSuit(_,{id, input}){
        return suitDatamapper.update({id}, input)
    },
    updateUser(_,{id, input}){
        return userDatamapper.update({id}, input )
    },
    updateInstrument(_, {id, input}){
        return instrumentDatamapper.update({id}, input)
    },
    

};
