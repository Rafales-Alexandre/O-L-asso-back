/**
 * Index of all GQL files, and the method to read them 
 */
const { readFileSync }= require ("fs");
const path = require ("path");

const userSchema = readFileSync(path.join(__dirname, "./User.gql"));
const instrumentSchema = readFileSync(path.join(__dirname, "./Instrument.gql"));
const suitSchema = readFileSync(path.join(__dirname, "./Suit.gql"));
const querySchema = readFileSync(path.join(__dirname, "./Query.gql"));
const customScalars = readFileSync(path.join(__dirname, "./customScalars.gql"));
const mutationSchema = readFileSync(path.join(__dirname,"./Mutation.gql"));


const typeDefs = `#graphql
 ${customScalars}
${userSchema}
${instrumentSchema}
${suitSchema}
${querySchema}
${mutationSchema}`;

module.exports = typeDefs;