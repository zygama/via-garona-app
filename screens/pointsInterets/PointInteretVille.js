import React from 'react';
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

import { toLowerCaseWithoutAccents } from '../../utils/functions'



export default class PointInteretVille extends React.Component {

    constructor(props) {
        super(props);
        this.searchedText = ""
        this.dataSource = [] // store an object of json data

        this.state = {
            searchedText: '',
            pointsInteretsFound: []
        };
    }

    componentDidMount() {
        this.dataSource = pointInteret.pointInteret
    }

    _loadPtsInteret() {
        let pointsInteretsFound = []
        for (let i = 0; i < this.dataSource.length; i++) {
            let inputString = toLowerCaseWithoutAccents(this.state.searchedText)
            let actualPointInteret = toLowerCaseWithoutAccents(this.dataSource[i].commune)

            if (inputString === actualPointInteret) {
                pointsInteretsFound.push(this.dataSource[i])
            }
        }
        this.setState({ pointsInteretsFound })

    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.listHeader}>
                    <TextInput
                        style={styles.champ}
                        value={this.state.searchedText}
                        onChangeText={ searchedText => this.setState({ searchedText })}
                        // onChangeText={(text) => this._searchTextInputChanged(text)}
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
                    data={this.state.pointsInteretsFound}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.main_container}>
                                <Image
                                    source={{ uri: item.poster_path }}
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