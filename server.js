require("dotenv").config();
const express = require('express');


const { ApolloServer } = require('@apollo/server');

const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require ("body-parser")
const cors = require('cors');

const {app,apolloConfig} = require("./app");

const http = require("http");
const serverHTTP = http.createServer(app);

const PORT = process.env.PORT ?? 3003;

const server = new ApolloServer(apolloConfig);

(async ()=>{
    await server.start();
        app.use("/graphql",cors(),json(),expressMiddleware(server,apolloConfig, {
            context : async ({ req }) => ({ token: req.headers.token }),
        }),
         );
    
        await new Promise ((resolve) => serverHTTP.listen (PORT, resolve))
        console.log(`🚀 On décolle ici http://localhost:3000/graphql`);

}) ();
