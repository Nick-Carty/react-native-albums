import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    };
  }

  componentDidMount() {
    fetch('https://rallycoding.herokuapp.com/api/music_albums')
    .then(this.parseResponse)
    .then(response => response.json())
    .then(albums => this.setState({ albums }))
    .catch(this.logError);
  }

  parseResponse(response) {
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    return response;
  }

  logError(error) {
    console.error(`Error in fetch: ${error.message}`);
  }

  renderAlbums() {
    return this.state.albums.map(album =>
      <AlbumDetail key={album.title} album={album} />
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

export default AlbumList;
