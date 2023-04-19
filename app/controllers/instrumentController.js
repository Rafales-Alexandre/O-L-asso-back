const { getInstrumentById } = require("../resolvers/query");
const resolvers = require ("../resolvers/query");


const instrumentController= {
    getAllInstruments: ()=>{
        return this.getAllInstruments;
    },
    getOneInstrument: ()=> {
        return this.getInstrumentById;
    },

}

module.exports = instrumentController;

