// Import express and GraphQL middleware
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

// Init Express
const app = express();

// Configure GraphQL middleware
app.use(
    '/graphql',
    expressGraphQL({
        schema,
        graphiql: true,
    }),
);

// Run server on PORT: 4000
app.listen(4000, () => {
    console.log('listening on: http://localhost:4000/graphql');
});
