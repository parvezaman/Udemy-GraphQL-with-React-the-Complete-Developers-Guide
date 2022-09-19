const express = require("express");
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

const port = 1234;

app.listen(port, () => {
    console.log(`my graphlQL learing is running on ${port} `);
})