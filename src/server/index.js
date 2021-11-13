const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');
const fs = require('fs');

const dataDir = 'data';
const rawfiles = fs.readdirSync(dataDir);
let Albums = [];
rawfiles.forEach(file => {
    Albums.push(...JSON.parse(fs.readFileSync(`${dataDir}/${file}`)))
});

const schema = buildASTSchema(gql`
  type Query {
    albums: [Album]
    album(id: ID!): Album
    track(id: ID!): Track
  }

  type Album {
    id: ID
    artist: String
    title: String
    year: String
    tracks: [Track]
  }

  type Track {
    id: ID
    artist: String
    title: String
    genre: String
    duration: String
  }
`);

let Tracks = [];

const mapTracks = track => {
    if (!track) return;
    Tracks.push({id: Tracks.length, ...track})
    return Tracks[Tracks.length - 1]
};

const mapAlbums = (item, id) => {
    if (!item) return;
    item['tracks'] = item['tracks'].map(mapTracks)
    return { id, ...item };
}

const root = {
  albums: () => Albums.map(mapAlbums),
  album: ({ id }) => mapAlbums(Albums[id], id),
  track: ({ id }) => Tracks[id]
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);