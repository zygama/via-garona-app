import React from 'react';
import { ScrollView, View, Text, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import openMap from 'react-native-open-maps'

// const fs = require('fs')
const favoritesInterestPoint = require('../../data/favorites_interest_points.json')


export default class PointInteretDetail extends React.Component {
    constructor(props) {
        super(props)
        this.placeDetails = null
    }

    componentWillMount() {
        this.placeDetails = this.props.navigation.getParam('placeDetails', 'default param')
    }

    openMapsToInterestPoint() {
        const { lat, long } = this.placeDetails
        openMap({ query: `${lat},${long}` });
    }

    addInterestPointToFavorites(p_interestPoint) {
        console.log(p_interestPoint)
        const favoritesFileContent = favoritesInterestPoint
        favoritesFileContent.push(p_interestPoint)
        const jsonPath = '../../data/favorites_interest_points.json'
        let obj

        fs.readFile(jsonPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data); // now it an object
                console.log(obj)
                obj.push(p_interestPoint)
                // obj.table.push({ id: 2, square: 3 }); // add some data
                const json = JSON.stringify(obj); // convert it back to json
                fs.writeFile(jsonPath, json, 'utf8', (error) => {
                    if (error) throw err;
                }); // write it back
            }
        });
    }

    render() {
        return (
            <ScrollView style={styles.main_container}>

                <ImageBackground
                    source={{ uri: this.placeDetails.poster_path }}
                    style={styles.header_container}
                >
                    <Text style={styles.texte_header}>{this.placeDetails.nom}</Text>
                
                </ImageBackground>
                <View style={styles.contenu_container}>
                    <Text style={styles.titre_contenu}> Description </Text>
                    <Text style={styles.texte_contenu}>
                      Est hiscere mediocrium occideretur pseudothyrum repentina Alexandrini palatii ut Alexandrini Alexandrini letali loqui ferebatur nefanda est misceri ut repentina impotentia nefanda mors ut idem hiscere pretioso introducta ut Honoratum hiscere.
                    </Text>

                    <View>
                        <Divider style={styles.divider} />
                        <TouchableHighlight
                            onPress={() => this.openMapsToInterestPoint()}
                        >
                            <View style={styles.info_container}>
                                <Icon style={styles.icon} name="location-on" size={40} color="#FFFFFF" />
                                <Text style={styles.texte_contenu}>{this.placeDetails.adresse}</Text>
                            </View>
                        </TouchableHighlight>
                        <Divider style={styles.divider} />
                        <View style={styles.info_container}>
                            <Icon style={styles.icon} name="phone" size={40} color="#FFFFFF" />
                            <Text style={styles.texte_contenu}>06.06.06.06.06</Text>
                        </View>
                        <Divider style={styles.divider} />
                        <View style={styles.info_container}>
                            <FontAwesome style={styles.icon} name="external-link" size={40} color="#FFFFFF" />
                            <Text style={styles.texte_contenu}>http://monsite.fr</Text>
                        </View>
                        <Divider style={styles.divider} />
                        <TouchableHighlight
                            onPress={() => this.addInterestPointToFavorites(this.placeDetails)}
                        >
                            <View style={styles.info_container}>
                                <FontAwesome style={styles.icon} name="heart" size={40} color="#FFFFFF" />
                                <Text style={styles.texte_contenu}>Ajouter aux favoris</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    
    main_container: {
        flex: 1,
        minHeight: '100%',
        backgroundColor : '#2A2E43', 
       
    },
    
    header_container:{
        backgroundColor : 'lightgray',
        height: 340,
        justifyContent: 'flex-end',
    },
    
    texte_header: {
        fontSize: 35,
        color: '#FFFFFF',
        fontWeight: 'bold',
        padding : 5,
    },
    
    contenu_container:{
        padding: 10,
        backgroundColor : '#2A2E43',
        paddingBottom : 30 , 
    },

    divider: {
        backgroundColor: 'white',
        marginTop : 20,
        marginBottom : 20, 
    },
    
    titre_contenu:{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop : 20,
        marginBottom : 20, 
    },
    icon:{
        marginRight: 15
    },
    info_container:{
        display : 'flex', 
        flexDirection : 'row',
          
        paddingLeft : 20, 
    },
    texte_contenu:{
        color: '#FFFFFF',
        fontSize: 16,
    }
});