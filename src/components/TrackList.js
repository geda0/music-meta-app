import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';
import { useParams } from 'react-router-dom'
import {Link} from "react-router-dom";

export const GET_ALBUM = gql`
  query GetAlbum($id: ID!) {
    album(id: $id) {
      id
      artist
      title
      tracks {
        id
        title
        artist
        duration
      }
    }
  }
`;

export default () => {
  const { id } = useParams()
  return (<Query query={GET_ALBUM}  variables={ {id: id} }>
    {({ loading, data }) => !loading && (
      <Table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.album.tracks.map(track => (
            <tr key={track.id}>
              <td>{track.artist}</td>
              <td>{track.title}</td>
              <td><Link to={`/track/${track.id}`}>View Track Detail</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </Query>);
};
