import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableHighlight,
    Image,
    ScrollView,
    TextInput,
    Button,
    FlatList
} from 'react-native';

import wiki from '../../data/wikiData';
import WikiItem from './WikiItem';

export default class Wiki extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };
  
  constructor(props) {
    super(props);
  };

    render() {
    return (
        <View style={styles.container}>
            <View style={styles.listHeader}>
                <TouchableHighlight
                style={{ flex: 1, justifyContent: 'center' }}
                onPress={() => this.props.navigation.navigate('Home')}>
                    <View>
                        <Image
                            style={[styles.image, styles.whiteIcon, styles.listFuncImage]}
                            source={require("../../assets/images/home/tabBar/arrow.png")}
                        />
                        <Text style={styles.listTitle}>Bien préparer{"\n"}sa randonnée</Text>
                    </View>
                </TouchableHighlight>
            </View>

            <View style={styles.main_container}>
                <FlatList
                    data={wiki}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <WikiItem wiki={item}/>}
                />
            </View>
        </View>
    )}
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
        backgroundColor: 'red',
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