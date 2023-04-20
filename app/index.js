
const express = require("express");
const app = express();
//const { ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer')


const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

const apolloConfig = {
    typeDefs,
    resolvers,
   // 
   //error
};




module.exports = {
    app,
    apolloConfig,

}