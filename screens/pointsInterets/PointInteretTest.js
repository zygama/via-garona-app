import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import pointInteret from '../../data/PtsInteret.json'; 

export default class PointInteretTest extends React.Component {

    constructor(props){
        super(props); 

        this.state = {
            isLoading: true, // check if json data (online) is fetching
            dataSource: [], // store an object of json data
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: false, // already loading
            dataSource: pointInteret.pointInteret
          });
    }

    render() {
        return(

            <View style={{flex: 1, paddingTop:20}}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({item}) => {
                return (
                    <View>
                        <Image
                            source={{ uri: item.poster_path }}
                            style={{ flex: 1, width: 50, height: 50, resizeMode: 'contain', marginLeft: 20 }}
                        />
                        <Text>{item.nom}</Text>
                        <Text>{item.code_postal}</Text>
                        <Text>{item.commune}</Text>
                    </View>
                )
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

        )
    }
    
}