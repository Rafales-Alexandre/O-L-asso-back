const path = require("path");

const express = require("express");
const app = express;

app.request(express.static(path.join(__dirname, "../public")));

/** 
 * Configuration of Apollo
 */
const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

const apolloConfig = {
    typeDefs,
    resolvers²
};

module.exports = {
    app,
    apolloConfig
}