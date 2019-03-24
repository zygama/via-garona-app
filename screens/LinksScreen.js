import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { MapView, Polyline } from 'expo';
var viaGaronaCoordinates = require('../data/viaGaronaCoordinates.json');

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  state = {
    mapRegion: {
      // Toulouse
      latitude: 43.6044622,
      longitude: 1.4442469,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: 400 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
        >
          <MapView.Polyline
            coordinates={viaGaronaCoordinates}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              '#7F0000',
              '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
              '#B24112',
              '#E5845C',
              '#238C23',
              '#7F0000'
            ]}
            strokeWidth={4}
          />
        </MapView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

// coordinates={[
            //   { latitude: 43.60316264092053, longitude: 1.442041119500028 },
            //   { latitude: 43.603671645494, longitude: 1.442397122517065 },
            //   { latitude: 43.60378913063952, longitude: 1.442625073968629 },
            //   { latitude: 43.60380653673481,  longitude: 1.442901970752816},
            //   { latitude: 43.6037812618994, longitude: 1.443013604356031 },
            //   { latitude: 43.60394942823355, longitude: 1.443027532014538 },
            //   { latitude: 43.605463151935645, longitude: 1.442699828957721 },
            //   { latitude: 43.606648186269624, longitude: 1.442408770925173 },
            //   { latitude: 43.607883768644854, longitude: 1.441894417008673 }
            // ]}
