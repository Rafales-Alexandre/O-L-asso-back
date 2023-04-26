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
 * 
 */
(async () => {
	await server.start();
	app.use("/graphql", cors(), json(), expressMiddleware(server, {
		context: async ({ req, res }) => {
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
				}
				return {};
			}


			return {};
		}
	}));

	await new Promise((resolve) => serverHTTP.listen(PORT, resolve));
	console.log(`🚀 On décolle ici http://localhost:${PORT}/graphql`);
})();
