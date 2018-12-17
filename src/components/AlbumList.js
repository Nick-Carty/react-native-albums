import React, { Component } from 'react';
import { View, Text } from 'react-native';

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
      <Text key={album.title}>{album.title}</Text>
    );
  }

  render() {
    return (
      <View>
        {this.renderAlbums()}
      </View>
    );
  }
}

export default AlbumList;
