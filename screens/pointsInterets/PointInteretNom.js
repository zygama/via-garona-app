import React from 'react';
import { StyleSheet, View, Text,  ImageBackground, TouchableHighlight,
 FlatList, TextInput, Button, ScrollView} from 'react-native';

import { CheckBox} from 'react-native-elements'; 
import { Image } from 'react-native-elements';



import PointInteretItem from './PointInteretItem';
// import styles from "./Styles"

const interestPoints = require('../../data/centres_interets.json')

export default class PointInteret extends React.Component {
    static navigationOptions = {
    title: 'app.json',
    };

    constructor(props) {
        super(props)
        this.state = {
            // loading: true,
            
            checkbox: {
                restaurants: true,
                commerces_vie_pratique: true,
                hebergements: true,
                points_interets: true
            },
        }
    }


    RecherchePtsInteret(recherche) {
        let actualState = { ...this.state }
    
        actualState.recherche = recherche
        this.setState({ actualState })
        console.log(this.state)
    }

  // Render the "restaurants" markers
  renderInterestPointMarkers(p_interestPointType) {
    // TODO: mettre if this.state.[] au dessus du bloc de if else
    let placesList = []

    if (this.state.checkbox[p_interestPointType]) {
        if (p_interestPointType === "restaurants" || p_interestPointType === "commerces_vie_pratique") {
            console.log('inside if')

            for (let i = 0; i < interestPoints[p_interestPointType].length; i++) {
                if(interestPoints[p_interestPointType][i].nom == this.state.recherche){
                    console.log("Trouvé : " + interestPoints[p_interestPointType][i].nom);
                    placesList.push(interestPoints[p_interestPointType][i])
                    
                }
            }

            return placesList.map((place, index) => {
                // console.log(place.lat)
                return this.renderInterestPointItem(place, index, p_interestPointType === "restaurants" ? "gold" : "orange")
            })
        } else if (p_interestPointType === "hebergements") {
            console.log('inside if')

            for (let i = 0; i < interestPoints.hotels.length; i++) {
                if(interestPoints.hotels[i].nom == this.state.recherche){
                    console.log("Trouvé : " + interestPoints.hotels[i].nom);
                    placesList.push(interestPoints.hotels[i])
                    
                }
            }
            for (let j = 0; j < interestPoints.campings.length; j++) {
                if(interestPoints.campings[j].nom == this.state.recherche){
                    console.log("Trouvé : " + interestPoints.campings[j].nom);
                    placesList.push(interestPoints.campings[j])
                    
                }
            }

            return placesList.map((place, index) => {
                // console.log(place.lat)
                return this.renderInterestPointItem(place, index, "green")
            })
        } else if (p_interestPointType === "points_interets") {
            console.log('inside if points_interets')

            for (let i = 0; i < interestPoints.loisirs.length; i++) {
                if(interestPoints.loisirs[i].nom == this.state.recherche){
                    console.log("Trouvé : " + interestPoints.loisirs[i].nom);
                    placesList.push(interestPoints.loisirs[i])
                    
                }
            }
            for (let j = 0; j < interestPoints.patrimoine.length; j++) {
                if(interestPoints.patrimoine[j].nom == this.state.recherche){
                    console.log("Trouvé : " + interestPoints.patrimoine[j].nom);
                    placesList.push(interestPoints.patrimoine[j])
                    
                }
            }
            for (let k = 0; k < interestPoints.activites_sportives.length; k++) {
                if(interestPoints.activites_sportives[k].nom == this.state.recherche){
                    console.log("Trouvé : " + interestPoints.activites_sportives[k].nom);
                    placesList.push(interestPoints.activites_sportives[k])
                    
                } 
            }

            return placesList.map((place, index) => {
                return this.renderInterestPointItem(place, index, "violet")
            })
        } else {
            return false
        }
    }
}

renderInterestPointItem(p_place, p_index, p_color) {
    console.log( 'le p_place.poster_path : ' + this);
    var image = "../assets/images/pointsInterets/restaurants/restau6.jpg"
    return(
        <View 
        key={p_index}
        style={styles.main_container}
        >
        {/* <Image
          style={styles.image}
          source={require(p_place.poster_path)}
        //   source={{uri: 'https://static.wamiz.fr/images/news/facebook/article/age-adulte-acc-fb-5915c5fca3f43.jpg'}}
        />  */}

            {/* <Image
                source={{uri : p_place.poster_path}}
                style={{ flex: 1, width: 50, height: 50, resizeMode: 'contain',  marginLeft: 20 }}
            /> */}
            
            <Image
  source={{ uri: image }}
  style={{ width: 200, height: 200 }}
/>
        
        {/* <TouchableHighlight
          style={styles.highlighter}
          underlayColor='grey'
          onPress={() => this.props.navigation.navigate('MainPointsInterets')}> */}
          <View style={styles.content_container}>

            <View style={styles.header_container}>
              <Text style={styles.title_text}>{p_place.nom}</Text>
              <Text style={styles.vote_text}>{p_place.code_postal}</Text>
              <Text style={styles.vote_text}>{p_place.commune}</Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description_text}>{p_place.adresse}</Text>
            </View>
          </View>
        {/* </TouchableHighlight> */}
      </View>
    )
}

renderInterestPointCheckbox(p_interestPointType, p_interestPointStringText) {
    return (
        <View style={styles.checkboxLineContainer}>
            {/* <Text>{p_interestPointStringText}</Text> */}
            <CheckBox
                title= {p_interestPointStringText}

                checked={this.state.checkbox[p_interestPointType]}
                onPress={() => this.updateCheckboxState(p_interestPointType)}
            />
        </View>
    )
}

	render() {
    return (
        <View style={styles.container}>

            <View style={styles.listHeader}>
                <TextInput
                    style={styles.champ}
                    onChangeText={(text) => this.setState({ recherche: text })}
                    value={this.state.recherche}
                    placeholder="Vous avez un lieu en tête ?"
                />
                <Button
                    style={styles.bouton}
                    title="Rechercher"
                    onPress={() => this.RecherchePtsInteret(this.state.recherche)}
                />
            </View>
            <ScrollView>
                {/* {this.renderUserLocationMarker()} */}
                {this.renderInterestPointMarkers("restaurants")}
                {this.renderInterestPointMarkers("commerces_vie_pratique")}
                {this.renderInterestPointMarkers("hebergements")}
                {this.renderInterestPointMarkers("points_interets")}
            </ScrollView>

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
        // resizeMode: 'contain',
    },
    whiteIcon: {
        tintColor: 'white',
    },
    ScrollView: {
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },


    // Item de liste
        main_container: {
          backgroundColor: 'rgba(200,200,200,0.9)',
          marginBottom: 15
        },
        // image: {
        //   height: 180,
        //   marginBottom: 5,
        // },
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
});