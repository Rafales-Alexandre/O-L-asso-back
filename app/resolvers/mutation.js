const userDatamapper = require('../datamappers/user');
const instrumentDatamapper = require('../datamappers/instrument');
const suitDatamapper = require('../datamappers/suit');

module.exports = {
    addUser(_,args){
        return userDatamapper.create(args.input);
    },
    addInstrument(_,args){
        return instrumentDatamapper.create(args.input);
    },
    addSuit(_,args){
        return suitDatamapper.create(args.input);
    },
    updateUser(id, args){
        console.log("id", id , "args : ", args)
        return userDatamapper.update(args.input);
    },
}