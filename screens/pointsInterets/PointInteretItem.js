import React from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';

export default class PointInteretItem extends React.Component {
	render() {
		// console.log(this.props);
		const point = this.props.point
    return (
      <View style={styles.main_container}>
        <Image
          style={styles.image}
          source={{uri: point.poster_path}}
        />
        <TouchableHighlight
          style={styles.highlighter}
          underlayColor='grey'
          onPress={() => this.props.navigation.navigate('MainPointsInterets')}>
          <View style={styles.content_container}>

            <View style={styles.header_container}>
              <Text style={styles.title_text}>{point.title}</Text>
              <Text style={styles.vote_text}>{point.vote_average} avis</Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text} numberOfLines={3}>{point.overview}</Text>
            </View>
            <View style={styles.date_container}>
              <Text style={styles.date_text}>{point.distance} km</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: 'rgba(200,200,200,0.9)',
    marginBottom: 15
  },
  image: {
    height: 180,
    marginBottom: 5,
  },
  content_container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})