
/**
 * Context of Apollo Server 
 */
const express = require("express");
const app = express();


//const context = require ("./context");
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

/**
 * Nodemailer - to send email
 */

