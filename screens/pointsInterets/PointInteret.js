import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableHighlight,
 FlatList, TextInput, Button } from 'react-native';

import point from '../../data/pointsInteretsData';
import PointInteretItem from './PointInteretItem';
// import styles from "./Styles"

export default class PointInteret extends React.Component {
    static navigationOptions = {
    title: 'app.json',
    };

  constructor(props) {
    super(props);
    this.state = {
      recherche: ''
    };
  };

  _userSignup() {
    const recherche = this.state.recherche;
    console.log("Recherche : " + recherche);
    console.log("Recherche : " + this.state.recherche);

  };

	render() {
    return (
        <View style={styles.container}>
            <ImageBackground source={{uri: "https://patrimoine.lesechos.fr/medias/2018/10/25/2216682_defiscalisation-lappel-de-la-foret-web-tete-06016836317.jpg"}}
            style={{width: '100%', height: '100%'}}>
                <View style={styles.listHeader}>
                    <TextInput
                        style={styles.champ}
                        onChangeText={(text) => this.setState({recherche:text})}
                        value={this.state.recherche}
                        placeholder = "Vous avez un lieu en tête ?"
                    />
                    <Button
                        style={styles.bouton}
                        title="Rechercher"
                        onPress={() => this.researchFromText() }
                    />
                </View>

                <View style={styles.main_container}>
                    <FlatList
                        data={point}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <PointInteretItem point={item}/>}
                    />
                </View>
            </ImageBackground>
        </View>
    )
	}
}
const styles = StyleSheet.create({  
	/*
	*
	*CONTAINER*/
    container: {
        flex: 1,
        backgroundColor: '#000000',
        opacity: 1
    },
    highlighter: {
        borderRadius: 15
    },
	/*
	*
    *LISTFUNC*/
    listHeader: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#1F5070',
        marginTop: 10,
        height: 50,
        padding: 10,
    },
    listFunc: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 10,
        height: 100,
        padding: 10,
    },
    listTitle: {
        flex: 3,
        fontSize: 25,
        color: 'white',
    },
    listFuncTitle: {
        flex: 3,
        backgroundColor: 'transparent',
        textAlign: 'left',
        color: 'white',
        fontSize: 18,
        paddingLeft: 20,
    },
    listFuncImage: {
        flex: 1,
        height: 50,
        width: 50,
    },
	/*
	*
	*IMAGES*/
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    whiteIcon: {
        tintColor: 'white',
    },
    ScrollView: {
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});