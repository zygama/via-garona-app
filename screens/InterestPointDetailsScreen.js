import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



export default class InterestPointDetailsScreen extends React.Component {
    state = {
    };

    componentWillMount() {
        
    }

    render() {
        const { navigation } = this.props
        const placeDetails = navigation.getParam('placeDetails', 'default param')

        return (
            <View style={styles.main_container}>
                <View style={styles.header_container}>
                    <Text style={styles.texte_header}>{placeDetails.nom}</Text>
                </View>
                <View style={styles.contenu_container}>
                    <Text style={styles.titre_contenu}> Commune : </Text>
                    <Text style={styles.texte_contenu}>{placeDetails.commune}</Text>
                    <Text style={styles.titre_contenu}> Adresse :</Text>
                    <Text style={styles.texte_contenu}>{placeDetails.adresse}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main_container: {
        flex: 1,
      },
    
      loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
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
      },
    
      contenu_container:{
        padding: 10,
      },
    
      titre_contenu:{
        fontSize: 16,
        fontWeight: 'bold',
        marginTop : 15,
      },
    
      texte_contenu:{
        fontSize: 16,
    
      }
});