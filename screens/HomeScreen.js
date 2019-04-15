import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableHighlight,
    Image
} from 'react-native';

import Start_Image from '../assets/images/start/Start_Image.png'
import Icon from 'react-native-vector-icons/MaterialIcons'

// import styles from "../assets/Styles";

//import MenuButton from '../components/MenuButton'

export default class HomeScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>

                <ImageBackground
                    source={Start_Image}
                    style={styles.imagebackground}
                >
                    <View style={styles.carrecentre}>

                        <Text style={styles.titre}> Pour utiliser cette application </Text>

                        <View style={styles.options}>
                            <TouchableHighlight
                                style={styles.highlighter}
                                underlayColor='grey'
                                onPress={() => this.props.navigation.navigate('MainItineraire')}>
                                <View style={styles.option}>
                                    <Icon style={styles.icon} name="location-on" size={40} color="#1F5070" />
                                    <View style={styles.border}><Text style={styles.sousTitre}> Activer la géolocatisation </Text></View>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.highlighter}
                                underlayColor='grey'
                                onPress={() => this.props.navigation.navigate('MainItineraire')}>
                                <View style={styles.option}>
                                    <Icon style={styles.icon} name="edit-location" size={40} color="#1F5070" />
                                    <View style={styles.border}><Text style={styles.sousTitre}> Choisir un points de départ </Text></View>
                                </View>
                            </TouchableHighlight>
                        </View>

                    </View>

                </ImageBackground>

            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    
    // CONTAINER
   container: {
   flex: 1,
   backgroundColor: '#000000',
   opacity: 1,
   },

   //HIGHLIGHTER
    highlighter: {
        borderRadius: 15
    },
    
    imagebackground:{
        width: '100%',
        height: '100%',
        display : 'flex',
        alignItems : 'center',
      },
    // LE CARRE DU CENTRE
      carrecentre: {
        width : '90%',
        minHeight : '50%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding : 20,
        marginTop : 100, 
        display: 'flex',       
      },
    
      titre:{
        textAlign	: 'center',
        fontSize : 25,
        fontWeight : 'bold',
        color : '#221919',
        flex: 1
      },

       // LES OPTIONS 
       options:{
        width: '80%',
        display: 'flex', 
        justifyContent : 'center',
        alignSelf: 'center',
        //alignItems: 'center', 
        flex: 2,
        //backgroundColor: 'blue',
       },

       option: {
        display: 'flex',
        flexDirection: 'row',
        // justifyContent : 'center',
        alignItems: 'center',
        // height: '50%',
        //backgroundColor: 'pink',
       },

       border:{
        borderLeftColor: 'black',
        borderLeftWidth : 3, 
        // borderLeftStyle : 'solid',
        height: '100%', 
        justifyContent: 'center',
        //backgroundColor: 'green',
       },

       sousTitre: {
        fontSize: 20,
        textAlign: 'center',
        //backgroundColor: 'blue', 
       }
	
});

