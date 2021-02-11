const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArtistSchema = new Schema({
    name: String
})

module.exports = mongoose.model('Artist', ArtistSchema);