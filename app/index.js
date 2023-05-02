
/**
 * The Express application object used for creating the context for Apollo Server. 
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
 * @property {Object} apolloConfig.typeDefs - The GraphQL type definitions for Apollo Server.
 * @property {Object} apolloConfig.resolvers - The GraphQL resolvers for Apollo Server.
 */
const apolloConfig = {
	typeDefs,
	resolvers
};


module.exports = {
	app,
	apolloConfig,
};
