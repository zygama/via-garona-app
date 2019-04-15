import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight,
  TextInput, 
  Button,
} from 'react-native';
import pointInteret from '../../data/PtsInteret.json'; 

const pointInteretItem = []

export default class PointInteretVille extends React.Component {

    constructor(props){
        super(props); 
        this.searchedText = ""
        this.state = {
            isLoading: true, // check if json data (online) is fetching
            dataSource: [], // store an object of json data
            // PtsInteretItem: []
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: false, // already loading
            dataSource: pointInteret.pointInteret
          });
    }

    _loadPtsInteret() {
      
      
      for (let i = 0; i < this.state.dataSource.length; i++) {

        // console.log("state ville : " + this.state.dataSource[i].commune );
        // console.log("recherche : " + this.searchedText);
        
        
        if(this.searchedText == this.state.dataSource[i].commune){
            // console.log("Trouvé : " + this.state.dataSource[i].commune);
            let PtsInteretTest = this.state.dataSource[i]
            console.log("les bon pts interet : " + PtsInteretTest );
            
            // this.setState({ PtsInteretItem: PtsInteretTest })
            pointInteretItem.push(PtsInteretTest)
            this.forceUpdate()
            
        }        
    }
    
    }

    _searchTextInputChanged(text) {
      this.searchedText = text // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
      console.log(this.searchedText);
      // console.log("source : " + this.state.dataSource)
      
    }


    render() {
        console.log("point interet " + pointInteret.pointInteret[1].poster_path)

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
        
        return(

          <View style={styles.container}>

            <View style={styles.listHeader}>
              <TextInput
                style={styles.champ}
                onChangeText={(text) => this._searchTextInputChanged(text)}
                onSubmitEditing={() => this._loadPtsInteret()}
                placeholder="Vous avez un lieu en tête ?"
              />
              <Button
                style={styles.bouton}
                title="Rechercher"
                onPress={() => this._loadPtsInteret()}
              />
            </View>

            <FlatList
              data={pointInteretItem}
              renderItem={({ item }) => {
                // console.log("poster path : " + item.poster_path) 
                // let posterPath = require("../" + item.poster_path)

                return (
                  <View style={styles.main_container}>
                    <Image
                      source={getImage(item.poster_path)}
                      style={styles.image}
                    />
                    <TouchableHighlight
                      style={styles.highlighter}
                      underlayColor='grey'
                      onPress={() => this.props.navigation.navigate('PointInteretDetail', {
                        placeDetails: item
                      })}
                    >
                      <View style={styles.content_container}>
                        <View style={styles.header_container}>
                          <Text style={styles.title_text}>{item.nom}</Text>
                          <View style={styles.commune_container}>
                            <Text style={styles.commune_text}>{item.code_postal}</Text>
                            <Text style={styles.commune_text}>{item.commune}</Text>
                          </View>
                        </View>
                        <View style={styles.description_container}>
                          <Text style={styles.description_text}>{item.adresse}</Text>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                )
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>

        )
    }  
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#000000',
    opacity: 1
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F5070',
    marginTop: 10,
    height: 50,
    padding: 10,
  },
  main_container: {
    backgroundColor: 'rgba(200,200,200,0.9)',
    marginBottom: 15
  },
  image: {
    height: 180,
    width: '100%',
    marginBottom: 5,
  },
  content_container: {
    flex: 1,
    padding: 10, 
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 2,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  commune_container: {
    flex: 1, 
  },
  commune_text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#666666',
    textAlign: 'right'
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