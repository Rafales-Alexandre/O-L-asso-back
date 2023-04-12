/**
 * Initialisation of express and dotenv
 * Why we use them ? Why not !
 */
const express = require("express");
require("dotenv").config();

/**
 * Initialisation of Apollo
 */

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require ("@apollo/server/standalone");
const { expressMiddleware } = require ("@apollo/server/express4");
const { app, apolloConfig } = require("./app");


const apolloServer = new ApolloServer(apolloConfig);

/**
 * Creation of the http server on PORT 3000
 */
const http = require("http");
const serverHTTP = http.createServer(app);
const PORT = process.env.PORT ?? 3000 ; 

/**
 * Lauching of the server
 */
(async ()=> {
	await apolloServer.start();
	app.use("/graphql", express.json, expressMiddleware(apolloServer));

	serverHTTP.listen(PORT, ()=>{
		console.log(`Let's Drum ! on port ${PORT}`);
	});
});