/**
 * Initialisation of express and dotenv
 * Why we use them ? Why not !
 */
const express = require("express");
require("dotenv").config();
/* const debug = require("debug")('Server:init') */
/**
 * Initialisation of Apollo
*/

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require ("@apollo/server/standalone");
const { expressMiddleware } = require ("@apollo/server/express4");
const { app, apolloConfig } = require("./app/index");


const apolloServer = new ApolloServer(apolloConfig);
const cors = require('cors')
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
	app.use("/graphql", cors(), express.json(), expressMiddleware(apolloServer, apolloConfig));
	
	serverHTTP.listen(PORT, ()=>{
		console.log(`Let's Drum ! on port ${PORT}`);
	});
})();