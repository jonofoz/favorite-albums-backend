const graphql = require('graphql');

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