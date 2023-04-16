const path = require("path");

const express = require("express");
const app = express();

//<app.use(express.static(path.join(__dirname, "../public")));

const typeDefs = require("./schemas");
const resolvers = require("./resolvers");



const apolloConfig = {
    typeDefs,
    resolvers
};

module.exports = {
    app,
    apolloConfig
}