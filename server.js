/**
 * Batala Main
 * Main requiement to work has a ApolloServer/Express API
 */
require("dotenv").config();
const getTokenForRequest = require("./app/services/getTokenForRequest");
const express = require("express");
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
//const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { json } = require ("body-parser")
const cors = require('cors');
const jwt = require("jsonwebtoken");

/**
 * Non official features yet:
const { ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer')

 */

/**
 * Context of Appollo : 
 */
const {app,apolloConfig} = require("./app");

const http = require("http");
const serverHTTP = http.createServer(app);

const PORT = process.env.PORT ?? 3003;

// apolloConfig.plugins = [ApolloServerPluginDrainHttpServer({ serverHTTP})];

const server = new ApolloServer(apolloConfig);

/**
 * Deployment 
 * 
 */
(async ()=>{
	await server.start();
	app.use("/graphql",cors(),json(),expressMiddleware(server, {
		context : async ({ req, res }) => {
			const token = await getTokenForRequest(req);

			const data = jwt.verify(token, 'olasso');
			if(data.user) {
				return {
					user: data.user
				};
			}

			return {};
		}
	}));

	await new Promise ((resolve) => serverHTTP.listen (PORT, resolve));
	console.log("`🚀 On décolle ici http://localhost:3000/graphql`");
}) ();
