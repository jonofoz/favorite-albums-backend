const Album = require('../models/Album');
const Artist = require('../models/Artist');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql')

const favorite_albums = [
    {id: '1', ranking: 1, artistId: '1', yearOfRelease: 2005, name: 'Illinois', genre: ['folk', 'baroque pop', 'indie rock', 'experimental'], commentary: 'i love it'},
    {id: '2', ranking: 2, artistId: '2', yearOfRelease: 2013, name: 'Virgins', genre: ['electronic', 'drone', 'dark ambient', 'experimental'], commentary: 'it\'s like wow'},
    {id: '3', ranking: 3, artistId: '3', yearOfRelease: 2003, name: 'Systems / Layers', genre: ['neo-classical', 'post-rock'], commentary: 'too many pretty'},
]

const artists = [
    {id: '1', name: 'Sufjan Stevens'},
    {id: '2', name: 'Tim Hecker'},
    {id: '3', name: 'Rachel\'s'}
]

const AlbumType = new GraphQLObjectType({
    name: 'Album',
    fields: () => ({
        id: {type: GraphQLID},
        ranking: {type: GraphQLInt},
        artist: {
            type: ArtistType,
            resolve(parent, args) {
                return Artist.findById(parent.artistId);
            }
        },
        yearOfRelease: {type: GraphQLInt},
        name: {type: GraphQLString},
        genre: {type: GraphQLList(GraphQLString)},
        commentary: {type: GraphQLString},
    })
})

const ArtistType = new GraphQLObjectType({
    name: 'Artist',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        album: {
            type: AlbumType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Album.findById(args.id);
            }
        },
        artist: {
            type: ArtistType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Artist.findById(args.id);
            }
        },
        albums: {
            type: new GraphQLList(AlbumType),
            resolve(parent, args) {
                return Album.find({});
            }
        },
        artists: {
            type: new GraphQLList(ArtistType),
            resolve(parent, args) {
                return Artist.find({});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})