const { readFileSync }= require ("fs");
const path = require ("path");

const userSchema = readFileSync(path.join(__dirname, "./User.gql"));
const instrumentSchema = readFileSync(path.join(__dirname, "./Instrument.gql"));
const suitSchema = readFileSync(path.join(__dirname, "./Suit.gql"));
const querySchema = readFileSync(path.join(__dirname, "./Query.gql"));
const userHasSuit = readFileSync(path.join(__dirname, "./UserHasSuit.gql"));

const typeDefs = `#graphql
${userSchema}
${instrumentSchema}
${suitSchema}
${userHasSuit}
${querySchema}
`;

module.exports = typeDefs;