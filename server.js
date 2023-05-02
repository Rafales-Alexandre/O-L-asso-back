/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/** Batala Intranet Terminal Exploitation*/


/** 
 * Necessary module for the app
 * @module dotenv while import the local files needed to lauch the server 
 * @module express while provide the application framework
 */
require("dotenv").config();
const express = require("express");

/**
 * Necessary module for Apollo server Express Middelware 
 * @module cors is the module of Cross-origin resource sharing, absolutely essential to our project with his database, router, and front part very distant from each other
 * @module jwt is our Token to grant the access or not to certain feature of our app
*/

const cors = require("cors");
const jwt = require("jsonwebtoken");

/** Instead of quering the whole content, we recover what we need 
 *	@module expressMiddleware is the function enabling you to attach Apollo Server to an Express Server 
 *  @module json is necessary to handle http post request of Expressin In Apollo
 * @module ApolloServer is the main library for ApolloServer itself 
*/
const { expressMiddleware } = require("@apollo/server/express4");
const { json } = require("body-parser");
const { ApolloServer } = require("@apollo/server");
const { GraphQLError } = require("graphql");

/** Custom middelware, will generate  the token we need using @module jwt */
const getTokenForRequest = require("./app/services/getTokenForRequest");


/**
 * Context of Appollo and Express Servers, @see module:index.js
 */
const { app, apolloConfig } = require("./app");

/** 
 * @module http is the application-layer protocol for trabnsmiting the different element of our app
 * @function serverHTTP create the Express server
*/
const http = require("http");
const serverHTTP = http.createServer(app);

/**
 * @function PORT is our connection prot, with is value in our .env file, and an amlternate value if the .env file is not founded 
 */
const PORT = process.env.PORT ?? 3003;

/** @function server initiate the ApolloServer */

const server = new ApolloServer(apolloConfig);

/**
 * Deployment 
 * @constructor
 * @param {cors, json, expressMiddleware} - Parameters of the Express Aplication
 * @param {context} - Parameters of the Apollo Server Application 
 * 
 */
(async () => {
	await server.start();
	app.use("/graphql", cors(), json(), expressMiddleware(server, {
		context: async ({ req, res }) => {

			// Exclude introspection queries
			if (req.body.operationName === "IntrospectionQuery") {
				return {};
			}
			const token = await getTokenForRequest(req);

			if (token) {
				try {
					const data = jwt.verify(token, process.env.SECRET);
					if (data.user) {
						return {
							user: data.user,
						};
					}
				} catch (err) {
					console.error("JWT verification failed:", err.message);
					throw new GraphQLError("Authentification by token failed", {
						extensions: {
							code: "JWT_AUTH_FAILED",
						},
					});
				}
				return {};
			}


			return {};
		}
	}));

	/**
 * Final Lauching 
 */

	await new Promise((resolve) => serverHTTP.listen(PORT, resolve));

	/**
 * @object to query the environnment file
 * 
 * Check wich database to connect : modify the .env 
 * USE_LOCAL_DATABASE=true ==> local database (batala), connectionString takes the value LOCAL_DATABASE_URL
 * USE_LOCAL_DATABASE=fals ==> remote database (railway), connectionString takes the value DATABASE_URL
 */
	const useLocalDatabase = process.env.USE_LOCAL_DATABASE === "true";
	// ternary condition to apiAdress
	const localApiAddress = process.env.LOCAL_APIADDRESS.replace("${PORT}", process.env.PORT);
	const apiAdress = useLocalDatabase ? localApiAddress : process.env.REMOTE_APIADDRESS;

	console.log("🚀 On décolle ici ", apiAdress);

})();
