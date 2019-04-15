import React from 'react';
import { ScrollView, View, Text, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';


export default class PointInteretDetail extends React.Component {
    state = {
    };

    componentWillMount() {
        
    }

    render() {
        const { navigation } = this.props
        const placeDetails = navigation.getParam('placeDetails', 'default param')

        function getImage(img_name) {
            switch(img_name) {
              case "sport1.jpg": return require("../../assets/images/pointsInterets/activites_sportives/sport1.jpg");
              case "camping1.jpg": return require("../../assets/images/pointsInterets/campings/camping1.jpg");
              case "commerce3.jpg": return require("../../assets/images/pointsInterets/commerces_vie_pratique/commerce3.jpg");
              case "hotel1.jpg": return require("../../assets/images/pointsInterets/hotels/hotel1.jpg");
              case "loisir1.jpg": return require("../../assets/images/pointsInterets/loisirs/loisir1.jpg");
              case "patrimoine1.jpg": return require("../../assets/images/pointsInterets/patrimoine/patrimoine1.jpg");
              case "restau1.jpg": return require("../../assets/images/pointsInterets/restaurants/restau1.jpg");
              case "marche.jpg": return require("../../assets/images/pointsInterets/commerces_vie_pratique/marche.jpg");
              case "picnic.jpeg": return require("../../assets/images/pointsInterets/commerces_vie_pratique/picnic.jpeg");
            }
          }
        

        return (
            <ScrollView style={styles.main_container}>

                <ImageBackground
                    source={getImage(placeDetails.poster_path)}
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
                      <View style={styles.info_container}>
                        <Icon style={styles.icon} name="location-on" size={40} color="#FFFFFF" />
                        <Text style={styles.texte_contenu}>{placeDetails.adresse}</Text>
                      </View>
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