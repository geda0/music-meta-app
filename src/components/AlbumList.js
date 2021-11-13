import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';
import {Link} from "react-router-dom";

export const GET_ALBUMS = gql`
  query GetAlbums {
    albums {
      id
      artist
      title
    }
  }
`;

export default () => (
  <Query query={GET_ALBUMS}>
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
          {data.albums.map(album => (
            <tr key={album.id}>
              <td>{album.artist}</td>
              <td>{album.title}</td>
              <td><Link to={`/album/${album.id}`}>View Album</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </Query>
);