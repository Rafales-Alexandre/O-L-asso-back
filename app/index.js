
const express = require("express");
const app = express();
/* const router = require("./router"); */

const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

//const error = require("./errors")
const { ApolloServerErrorCode } = require('@apollo/server/errors');

const apolloConfig = {
    typeDefs,
    resolvers,
   //error
};




module.exports = {
    app,
    apolloConfig,

}