import React from 'react';
import { ScrollView, View, Text, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import openMap from 'react-native-open-maps'



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

    render() {
        const { navigation } = this.props
        const placeDetails = navigation.getParam('placeDetails', 'default param')

        return (
            <ScrollView style={styles.main_container}>

                <ImageBackground
                    source={{ uri: placeDetails.poster_path }}
                    style={styles.header_container}
                >
                    <Text style={styles.texte_header}>{placeDetails.nom}</Text>
                
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
                                <Text style={styles.texte_contenu}>{placeDetails.adresse}</Text>
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