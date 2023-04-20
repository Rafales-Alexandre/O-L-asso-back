require("dotenv").config();
const express = require('express');


const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { expressMiddleware } = require('@apollo/server/express4');
<<<<<<< HEAD
=======
const middelwares = require ("./app/services/middlewares")
>>>>>>> 0bce98134cc4a5133c0f8d4eb1bfe463b23bc6c7

const cors = require('cors')

const {app,apolloConfig} = require("./app");
const apolloServer = new ApolloServer(apolloConfig);

const http = require("http");
const serverHTTP = http.createServer(app);
const PORT = process.env.PORT ?? 3000;



 (async ()=>{

    await apolloServer.start();

    app.use("/graphql",cors(),express.json(),expressMiddleware(apolloServer,apolloConfig) );

    serverHTTP.listen(PORT,()=>{
        console.log(`Listening on ${PORT}/graphql`);
    });

})(); 
