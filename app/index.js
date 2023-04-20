
const express = require("express");
const app = express();
/* const router = require("./router"); */

const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

const apolloConfig = {
    typeDefs,
    resolvers,
   //error
};




module.exports = {
    app,
    apolloConfig,

}