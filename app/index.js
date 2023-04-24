
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
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const config = require("./config");

const transporter = nodemailer.createTransport({
	service: config.email.service,
	auth: {
		user: config.email.user,
		pass: config.email.pass
	}
});
