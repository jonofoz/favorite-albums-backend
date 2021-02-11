require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow CORS requests
app.use(require('cors')());

app.use('/graphql', graphqlHTTP({
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})
