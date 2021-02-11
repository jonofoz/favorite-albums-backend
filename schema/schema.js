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
    {id: '1', ranking: 1, artistId: '1', yearOfRelease: 2005, name: 'Illinois', genre: ['folk', 'baroque pop', 'indie rock', 'experimental']},
    {id: '2', ranking: 2, artistId: '2', yearOfRelease: 2013, name: 'Virgins', genre: ['electronic', 'drone', 'dark ambient', 'experimental']},
    {id: '3', ranking: 3, artistId: '3', yearOfRelease: 2003, name: 'Systems / Layers', genre: ['neo-classical', 'post-rock']},
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
    })
})