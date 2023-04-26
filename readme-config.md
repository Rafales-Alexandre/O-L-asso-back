# API BATALA

This application is separate in two part : the api that use a databe, route and method to handle a musical band called *'batucada'*.
It uses tables *instruments*, *suits*, *users*. It's also an application to provide dashboards for members of the board, and the lending of items to players of the association Batala .

## Dependencies
express
cors
jwt
ApolloServer : ExpressMiddelware, GraphQlError

### Developpement :
- path : Node module, to resolve path and make files accesibles to other files in project ` npm install -- save-dev path ` 
  
- faker : to seed the user table : ` npm install --save-dev @faker-js/faker `


### Api :

- postgresql :  where it begins, our database , ` npm i pg `
- dotenv : to provide environment values fo all , ` npm i dotenv `
- ApolloServer : where the magic happen `npm install @apollo/server graphql express cors body-parser `
