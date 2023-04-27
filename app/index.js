
/**
 * Context for Apollo Server 
 */
const express = require("express");
const app = express();


/**
 * Context value for Apollo server 
 */
const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

/**
 * Configurations for Apollo server 
 */
const apolloConfig = {
	typeDefs,
	resolvers
};


module.exports = {
	app,
	apolloConfig,
};
