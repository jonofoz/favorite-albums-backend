require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow CORS requests
app.use(require('cors')());

mongoose.connect(`mongodb+srv://jonofoz:${process.env.PASSWORD}@cluster0.fovuk.mongodb.net/favorite_albums?retryWrites=true&w=majority`, { useNewUrlParser: true,useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log("Connected to Favorite Albums DB!");
})

app.use('/graphql', graphqlHTTP({
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})
