import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableHighlight,
    Image
} from 'react-native';

// import styles from "../assets/Styles";

//import MenuButton from '../components/MenuButton'

export default class mainNavigation extends React.Component {
    
    render() {
        return (
                // <View style={styles.container}>
                //   <MenuButton navigation={this.props.navigation} />
                //   <Text style={styles.text}>Homee</Text>
                // </View>
            <View style={styles.container}>
                <ImageBackground
                    source={require("../../assets/images/home/background_home.jpg")}
                    style={{ flex: 1 }}>

                    <View style={{ flex: 1, backgroundColor: 'rgba(100,100,100,0.6)' }}>
                        <View style={styles.tabBar}>
                            <TouchableHighlight
                                style={styles.highlighter}
                                underlayColor='grey'
                                onPress={() => this.props.navigation.navigate('MainItineraire')}>
                                <View style={styles.tabBarImageAndText}>
                                    <Image
                                        style={[styles.image, styles.whiteIcon, styles.tabBarImage]}
                                        source={require("../../assets/images/home/tabBar/map.png")}
                                    />
                                    <Text style={styles.tabBarTitle}>Itinéraire</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.highlighter}
                                underlayColor='grey'
                                onPress={() => this.props.navigation.navigate('MainPointsInterets')}>
                                <View style={styles.tabBarImageAndText}>
                                    <Image
                                        style={[styles.image, styles.whiteIcon, styles.tabBarImage]}
                                        source={require("../../assets/images/home/tabBar/icon-map-marker.png")}
                                    />
                                    <Text style={styles.tabBarTitle}>Points d'intérêts</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.highlighter}
                                underlayColor='grey'
                                onPress={() => this.props.navigation.navigate('MainNavigation')}>
                                <View style={styles.tabBarImageAndText}>
                                    <Image
                                        style={[styles.image, styles.blueIcon, styles.tabBarImage]}
                                        source={require("../../assets/images/home/tabBar/arrow.png")}
                                    />
                                    <Text style={styles.tabBarTitle}>Navigation</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 3,
                            marginTop: 10,
                            marginLeft: 30,
                            marginRight: 30
                        }}
                        />

                        <View style={styles.listFunc}>
                            <Text style={styles.listTitle}>Navigation</Text>

                            <View style={styles.listFuncLink}>
                                <Image
                                    style={[styles.image, styles.whiteIcon, styles.listFuncImage]}
                                    source={{ uri: "https://image.flaticon.com/icons/png/512/130/130188.png" }}
                                />
                                <Text style={styles.listFuncTitle}>Vos Randonnées</Text>
                            </View>

                            <View style={styles.listFuncLink}>
                                <Image
                                    style={[styles.image, styles.whiteIcon, styles.listFuncImage]}
                                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Cog_font_awesome.svg/512px-Cog_font_awesome.svg.png" }}
                                />
                                <Text style={styles.listFuncTitle}>Réglages</Text>
                            </View>

                            <TouchableHighlight
                                style={styles.highlighter}
                                underlayColor='grey'
                                onPress={() => this.props.navigation.navigate('Wiki')}>
                                <View style={styles.listFuncLink}>
                                    <Image
                                        style={[styles.image, styles.whiteIcon, styles.listFuncImage]}
                                        source={{ uri: "https://static.thenounproject.com/png/370619-200.png" }}
                                    />
                                    <Text style={styles.listFuncTitle}>Wiki</Text>
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
                                 /*
                                  *
                                  *CONTAINER*/
                                 container: {
                                 flex: 1,
                                 backgroundColor: '#000000',
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
                                 // backgroundColor: '#DE7947',
                                 // backgroundColor: 'rgba(222, 121, 71, 0.5)',
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
                                 blueIcon: {
                                    tintColor: '#3B8AAC'
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
                                 // paddingTop: 80,
                                 backgroundColor: '#666',
                                 flex: 1
                                 },
                                 headerBurger: {
                                 backgroundColor: '#527AFD',
                                 flex: 1
                                 },
                                 contentBurger: {
                                 backgroundColor: '#201E51',
                                 flex: 4
                                 },
                                 contentBurgerImage: {
                                 width: 15,
                                 height: 15,
                                 },
                                 });

