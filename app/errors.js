/**
 * Undeployed features, still learning about it 
 */

const { ApolloServerErrorCode } = require('@apollo/server/errors');
const { GraphQLError } = require('graphql')


    throw new GraphQLError ('Authentification by token failed', {
        extensions: {
            code: 'JWT_AUTH_FAILED',
            http: {
                status : 406,
                headers : new Map ([
                    ['hey Alexandre','c\'est ça']
                ])
            }
            //
        },
    });

    formatError: (formattedError, error) => {

        // Return a different error message
    
        if (
    
          formattedError.extensions.code ===
    
          ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
    
        ) {
    
          return {
    
            ...formattedError,
    
            message: "Your query doesn't match the schema. Try double-checking it!",
    
          };
    
        }
    
    
        // Otherwise return the formatted error. This error can also
    
        // be manipulated in other ways, as long as it's returned.
    
        return formattedError;

