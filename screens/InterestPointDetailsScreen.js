import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'


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
                    <Text style={styles.titre_contenu}> Description </Text>
                    <Text style={styles.texte_contenu}>
                      Est hiscere mediocrium occideretur pseudothyrum repentina Alexandrini palatii ut Alexandrini Alexandrini letali loqui ferebatur nefanda est misceri ut repentina impotentia nefanda mors ut idem hiscere pretioso introducta ut Honoratum hiscere.
                    </Text>
                    <View style={styles.option}>
                      <Icon style={styles.icon} name="location-on" size={40} color="#1F5070" />
                      <View style={styles.border}>
                        <Text style={styles.titre_contenu}> Adresse :</Text>
                        <Text style={styles.texte_contenu}>{placeDetails.adresse}</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.titre_contenu}> Commune : </Text>
                    <Text style={styles.texte_contenu}>{placeDetails.commune}</Text>
                    
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
        backgroundColor : '#2A2E43', 
      },
    
      titre_contenu:{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop : 15,
      },
    
      texte_contenu:{
        color: '#FFFFFF',
        fontSize: 16,
    
      }
});