require('dotenv').config();
const axios = require('axios');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
// Allow CORS requests
app.use(require('cors')());

mongoose.connect(`mongodb+srv://jonofoz:${process.env.PASSWORD}@cluster0.tqlwt.mongodb.net/favorite_albums?retryWrites=true&w=majority`, { useNewUrlParser: true,useUnifiedTopology: true })
mongoose.connection.once('open', () => {
    console.log("Connected to Favorite Albums DB!");
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.get('/album-art/:artist/:release', async (req, res) => {
    // First, get the MBID of the album.
    const { artist, release } = req.params;
    var result = await axios.get(`http://www.musicbrainz.org/ws/2/release/?query=artist:${artist}+release:${release}`, {
        // A meaningful 'User-Agent' header is required to reduce throttling in the MusicBrainz API.
        // See: https://musicbrainz.org/doc/MusicBrainz_API/Rate_Limiting#Provide_meaningful_User-Agent_strings
        headers: {
            'User-Agent': 'FavoriteAlbums/1.0.0 ( jon@jonofoz.com )',
            'Accept': 'application/json',
            'Host': 'musicbrainz.org'
        }
    })
    /*
        When getting album art, we filter out
        * Bootlegs and Promotionals
        * Cassettes
    */
   const validResults = result.data.releases.filter(r => (
        (!r.status    || (r.status    && r.status    === 'Official')) &&
        (!r.packaging || (r.packaging && r.packaging !== 'Cassette Case')))
   )
        var resultsToTry = validResults;
        const maximumResultsAllowed = 10;
        if (resultsToTry.length > maximumResultsAllowed) {
            resultsToTry = resultsToTry.slice(0, maximumResultsAllowed);
        }

    // Now get the image of the album, using the MBID
    for await (r of resultsToTry) {
        try {
            result = await axios.get(`https://www.coverartarchive.org/release/${r.id}`, {
                headers: {
                    'Content-Type': 'plain/text',
                    'User-Agent': 'FavoriteAlbums/1.0.0 ( jon@jonofoz.com )',
                    'Accept': 'application/json',
                    'Host': 'coverartarchive.org'
                }
            })
            const validImages = result.data.images.filter(i => i.front === true && i.back === false && i.approved === true)
            const thumbnails = validImages[0].thumbnails;
            /*
                Check for the smallest thumbnail possible.
                    If the 'small' key exists, we use it.
                    Otherwise, we assume the keys are ordered like ['250', '500', ...].
            */
            const smallestThumbnail = Object.keys(thumbnails).includes('small') ? thumbnails.small : thumbnails[Object.keys(thumbnails)[0]]
            console.log(`Tried '${r.id}' and found cover art for (${artist}, ${release})!`);
            res.json(smallestThumbnail);
            break;
        }
        catch {
            console.log(`Tried '${r.id}' but didn't find cover art for (${artist}, ${release}).`);
        }
    };


})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})
