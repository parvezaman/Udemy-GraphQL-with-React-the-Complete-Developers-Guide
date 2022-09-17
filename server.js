const express = require("express");
const expressGraphQL = require('express-graphql').graphqlHTTP;

const app = express();

app.use('/graphql', expressGraphQL({
    graphiql: true 
}));

const port = 5000;

app.listen(port, () => {
    console.log(`my graphlQL learing is running on ${port} `);
})