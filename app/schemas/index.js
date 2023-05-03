/* eslint-disable no-undef */
/**
 * Index of all GQL files, and the method to read them 
 * @module readFileSync - necessary to "translate" gql files
 * @module path _ resolve any path issues
 */
const { readFileSync } = require("fs");
const path = require("path");

const userSchema = readFileSync(path.join(__dirname, "./User.gql"));
const instrumentSchema = readFileSync(path.join(__dirname, "./Instrument.gql"));
const suitSchema = readFileSync(path.join(__dirname, "./Suit.gql"));
const querySchema = readFileSync(path.join(__dirname, "./Query.gql"));
const customScalars = readFileSync(path.join(__dirname, "./customScalars.gql"));
const mutationSchema = readFileSync(path.join(__dirname, "./Mutation.gql"));
const resetPasswordSchema = readFileSync(path.join(__dirname, "./ResetPassword.gql"));
const loginSchema = readFileSync(path.join(__dirname, "./Login.gql"));
/**
 * @module typeDefs is one of the two necessary parameters to make the ApolloServer
 */
const typeDefs = `#graphql
${customScalars}
${userSchema}
${instrumentSchema}
${suitSchema}
${querySchema}
${mutationSchema}
${resetPasswordSchema}
${loginSchema}`;

module.exports = typeDefs;