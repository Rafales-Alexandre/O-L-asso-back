/**
 * Context of Apollo Server 
 */
const express = require("express");
const app = express();



const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

const apolloConfig = {
	typeDefs,
	resolvers,
};




module.exports = {
	app,
	apolloConfig,

};