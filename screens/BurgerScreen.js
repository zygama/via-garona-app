import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableHighlight,
    Image
} from 'react-native';
// import FontAwesomeIcons, { Icons } from 'react-native-fontawesome';
import FontAwesome, { Icons } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class BurgerScreen extends React.Component {
    static navigationOptions = {
    title: 'app.json',
    };

    render() {
    return (
        <View style={styles.container}>
            <View style={[styles.headerBurger]}>
                <TouchableHighlight
                style={{ flex: 1, justifyContent: 'center' }}
                onPress={() => this.props.navigation.navigate('Home')}>
                    <Image
                        source={require('../assets/images/header/via_garona_logo.png')}
                        style={{ flex: 1, marginRight: 0, marginLeft: 0, resizeMode: 'contain' }}
                    />
                </TouchableHighlight>
            </View>

            <View style={[styles.listFunc, styles.contentBurger]}>
                <View>
                    <TouchableHighlight
                    style={styles.highlighter}
                    underlayColor='grey'
                    onPress={() => this.props.navigation.navigate('Home')}>
                        <View style={[styles.listFuncLink, styles.contentBurgerLink]}>
                            <Image
                                style={[styles.image, styles.whiteIcon, styles.headerImage]}
                                source={{uri: "https://image.flaticon.com/icons/png/512/52/52029.png"}}
                            />
                            <Text style={[styles.listFuncTitle, styles.contentBurgerTitle]}>Accueil</Text>
                            {/* <FontAwesome>{Icons.chevronLeft}</FontAwesome> */}
                        </View>
                    </TouchableHighlight>
                </View>

                <View>
                    <TouchableHighlight
                    style={styles.highlighter}
                    underlayColor='grey'
                    onPress={() => this.props.navigation.navigate('Wiki')}>
                        <View style={[styles.listFuncLink, styles.contentBurgerLink]}>
                            <Image
                                style={[styles.image, styles.whiteIcon, styles.headerImage]}
                                source={{uri: "https://image.flaticon.com/icons/png/512/130/130188.png"}}
                            />
                            <Text style={[styles.listFuncTitle, styles.contentBurgerTitle]}>Nos coups de coeur</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View>
                    <TouchableHighlight
                    style={styles.highlighter}
                    underlayColor='grey'
                    onPress={() => this.props.navigation.navigate('Home')}>
                        <View style={[styles.listFuncLink, styles.contentBurgerLink]}>
                            <Image
                                style={[styles.image, styles.whiteIcon, styles.headerImage]}
                                source={{uri: "https://people.rit.edu/lgs9654/ShootGun/images/info-icon.png"}}
                            />
                            <Text style={[styles.listFuncTitle, styles.contentBurgerTitle]}>À propos</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                <View>
                    <TouchableHighlight
                    style={styles.highlighter}
                    underlayColor='grey'
                    onPress={() => this.props.navigation.navigate('Home')}>
                        <View style={[styles.listFuncLink, styles.contentBurgerLink]}>
                            <Image
                                style={[styles.image, styles.whiteIcon, styles.headerImage]}
                                source={{uri: "https://www.respectocean.com/wp-content/uploads/2018/11/iconmonstr-script-2-240.png"}}
                            />
                            <Text style={[styles.listFuncTitle, styles.contentBurgerTitle]}>La charte d'accueil Via Garona</Text>
                        </View>
                    </TouchableHighlight>
                </View>
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
        backgroundColor: '#2a2e43',
        opacity: 1
    },
    main_container: {
        flex: 6
    },
	/*
	*
	*HEADER*/
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(115, 0, 125, 0.5)',
        paddingTop: 25,
        paddingBottom: 5
    },
    headerImage: {
        width: 50,
        height: 50,
    },
	/*
	*
	*TABBAR*/
    tabBar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        padding: 10
    },
    highlighter: {
        borderRadius: 15
    },
    tabBarLink: {
        flexDirection: 'column',
    },
    tabBarTitle: {
        textAlign: 'center',
        color: 'white',
        marginTop: 10
    },
    tabBarImage: {
        padding: 5
    },
    tabBarImageAndText: {
        justifyContent: 'center',
        alignItems: 'center'
    },
	/*
	*
	*LISTFUNC*/
    listFunc: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 10,
        padding: 10
    },
    listFuncLink: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listTitle: {
        textAlign: 'center',
        fontSize: 25,
        color: 'white',
    },
    listFuncTitle: {
        flex: 3,
        backgroundColor: 'transparent',
        textAlign: 'left',
        color: 'white',
        fontSize: 18,
        paddingLeft: 20
    },
    listFuncImage: {
        flex: 1
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
	/*
	*
	*BURGER*/
    burger: {
        padding: 20,
        paddingLeft: 50,
        backgroundColor: '#666',
        flex: 1
    },
    headerBurger: {
        backgroundColor: '#1f5070',
        flex: 1
    },
    contentBurger: {
        flex: 4
    },
    contentBurgerTitle: {
        flex: 3,
        backgroundColor: 'transparent',
        textAlign: 'left',
        color: 'white',
        fontSize: 18,
        paddingLeft: 20
    },
    contentBurgerImage: {
        width: 15,
        height: 15,
    },
});