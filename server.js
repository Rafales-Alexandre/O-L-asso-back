const express = require("express");
require("dotenv").config();

/**
 * Establishment of ApolloServer
 */

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');

/**
 * Implementation of application feature 
 */
const {app,apolloConfig} = require("./app");
const apolloServer = new ApolloServer(apolloConfig);
const http = require("http");
const serverHTTP = http.createServer(app);
const PORT = process.env.PORT ?? 3000;

/**
 * INtroduction of middelwares
 */
const middlewares = require ("./app/services/middlewares");




/**
 * ! Devons-nous les mettres en place ici, ou dans le async plus bas 
app.use(middlewares.setupSession.);
app.use(middlewares.schema);
app.use(middlewares.security);
app.use(middlewares.rightsMiddleware);
app.use(middlewares.addUserToLocals);
* ! rajouter un middleware b-crypt
 */

 (async ()=>{

    await apolloServer.start();

    app.use("/graphql",cors(),express.json(),expressMiddleware(apolloServer,apolloConfig));
    //!
    app.use(middlewares.setupSession);
    app.use(middlewares.schema);
    app.use(middlewares.security);
    app.use(middlewares.rightsMiddleware);
    app.use(middlewares.addUserToLocals);
    
    serverHTTP.listen(PORT,()=>{
        console.log(`Listening on ${PORT}/graphql`);
    });

})(); 

