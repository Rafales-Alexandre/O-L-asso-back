/**
 * Batala Main
 * Main requiement to work has a ApolloServer/Express API
 */
require("dotenv").config();
const express = require("express");
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require ("body-parser")
const cors = require('cors');

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

const server = new ApolloServer(apolloConfig);

/**
 * Deployment 
 * 
 */
(async ()=>{
    await server.start();
        app.use("/graphql",cors(),json(),expressMiddleware(server,apolloConfig,
            // {plugins :[ ApolloServerPluginDrainHttpServer({ serverHTTP}) ]} , 
            { context : async ({ req, res }) => ({ token : await getTokenForRequest(req), }) }
            ),
         );
    
        await new Promise ((resolve) => serverHTTP.listen (PORT, resolve))
        console.log(`🚀 On décolle ici http://localhost:3000/graphql`);

}) ();
