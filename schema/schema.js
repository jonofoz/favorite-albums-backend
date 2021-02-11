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
            type: GraphQLID,
            resolve(parent, args) {
                // TODO: get artist based on album's artistId
                return '1';
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

const RootQuery = GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        album: {
            type: AlbumType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // TODO: get album based on album's id
            }
        },
        artist: {
            type: ArtistType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // TODO: get artist based on artist's id
            }
        },
        albums: {
            type: new GraphQLList(AlbumType),
            resolve(parent, args) {
                // TODO: get all albums
            }
        },
        artists: {
            type: new GraphQLList(ArtistType),
            resolve(parent, args) {
                // TODO: get all artists
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})