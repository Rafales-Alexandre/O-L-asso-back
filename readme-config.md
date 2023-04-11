# API BATALA

This application is an api that uses a database, routes and methods to handle a musical band called *'batucada'*. 
It uses tables *instruments*, *suits*, *users* and provide dashboards for members of the board, and the lending of items to players.

## Dependencies

### Developpement :
- faker : to seed the user table : ` npm install --save-dev @faker-js/faker `


### Api :
- postgresql : ` npm i pg `
- dotenv : ` npm i dotenv `

### Sqitch :
- ` sqitch init batala --engine pg --top-dir migrations ` 
- 