/**
 * Undeployed features, still learning about it 
 */
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
	},
});
