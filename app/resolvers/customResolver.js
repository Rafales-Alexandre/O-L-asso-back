// customScalarsResolvers.js

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

function formatDate(date) {
  const formattedDate = new Date(date);
  return formattedDate.toISOString().slice(0, 10);
}

function formatDateTime(date) {
  const formattedDate = new Date(date);
  return formattedDate.toISOString();
}

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return formatDate(value);
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime custom scalar type',
  serialize(value) {
    return formatDateTime(value);
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

module.exports = {
  Date: DateScalar,
  DateTime: DateTimeScalar,
};