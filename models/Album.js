const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlbumSchema = new Schema({
    ranking: Number,
    artistId: String,
    yearOfRelease: Number,
    name: String,
    genre: [String],
    commentary: String
})

module.exports = mongoose.model('Album', AlbumSchema);