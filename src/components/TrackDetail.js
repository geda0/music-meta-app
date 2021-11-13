import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { useParams } from 'react-router-dom'

export const GET_TRACK = gql`
  query GetTrack($id: ID!) {
    track(id: $id) {
        id
        title
        artist
        duration
        genre
    }
  }
`;

export default () => {
  const { id } = useParams()
  return (<Query query={GET_TRACK}  variables={ {id: id} }>
    {({ loading, data }) => !loading && (
        <ul>
            <li>{data.track.title}</li>
            <li>{data.track.artist}</li>
            <li>{data.track.duration}</li>
            <li>{data.track.genre}</li>
        </ul>
    )}
  </Query>);
};
