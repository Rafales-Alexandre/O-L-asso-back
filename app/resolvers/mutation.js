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
    updateUser(_,args){
        console.log("tadam : ", args);
        return userDatamapper.update(args.input);
    }, 
    /*  updateUser(_,{id, inputData}){
        console.log("tadoum : ", inputData);
        return userDatamapper.update(id, inputData);
    },  */
    deleteUser (_, args){
        console.log("deleted");
        return userDatamapper.delete(args.input); 
    },
}