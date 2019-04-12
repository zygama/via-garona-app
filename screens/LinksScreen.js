import React from 'react';
import { View, ScrollView, StyleSheet, Alert, CheckBox } from 'react-native';
import { MapView, Location, Permissions, IntentLauncherAndroid } from 'expo';
import { widthPercentageToDP as width, heightPercentageToDP as height } from 'react-native-responsive-screen';


const viaGaronaCoordinates = require('../data/viaGaronaCoordinates.json');
const interestPoints = require('../data/centres_interets.json')


export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Links',
    };

    state = {
        mapRegion: {
            // Toulouse
            latitude: 43.6044622,
            longitude: 1.4442469,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        location: {},
        checkbox: {
            restauration: false,
            commercesViePratique: false,
            hebergement: false,
            pointInterets: false
        }
    };

    componentWillMount() {
        this.getLocationAsync();
    }

    getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        console.log(status)

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        // Correct the bug on Android where we can't get the location because
        // one of gpsAvailable or locationServicesEnabled is false
        // We so need to assure that both are true with Expo.IntentLauncherAndroid
        // by opening the location setting and enable it
        let providerStatusAsync = await Location.getProviderStatusAsync()
        if (providerStatusAsync.gpsAvailable === false
            || providerStatusAsync.locationServicesEnabled === false) {
            // open 
            this.showAlertLocationMustBeEnabled(async () => {
                await IntentLauncherAndroid.startActivityAsync(
                    IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
                );
                console.log('attente gps active')
                await this.getLocationWithPermissions()
            })
        } else {
            await this.getLocationWithPermissions()
        }
    };

    getLocationWithPermissions = async () => {
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        this.setState({
            location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        });
    }

    showAlertLocationMustBeEnabled(p_onPressFunction) {
        return new Promise((resolve) => {
            Alert.alert(
                'La localisation n\'est pas activée',
                'Veuillez s\'il vous plait activer la localisation dans les paramètres afin d\'afficher votre position sur la carte',
                [
                    {
                        text: 'OK', onPress: () => {
                            p_onPressFunction()
                            console.log('futur resolve')
                            resolve()
                        }
                    },
                ],
                { cancelable: false }
            )
        })
    }

    updateCheckboxState(p_interestPointType) {
        let actualState = { ...this.state }

        actualState.checkbox[p_interestPointType] = !actualState.checkbox[p_interestPointType]
        this.setState({ actualState })
        console.log(this.state)
    }

    renderUserLocationMarker() {
        if (this.state.location.latitude && this.state.location.longitude) {
            return (
                <MapView.Marker
                    coordinate={this.state.location}
                    title="My Marker"
                    description="Some description"
                />
            )
        }
    }

    // Render the "restauration" markers
    renderRestaurationMarkers() {
        const placesList = [{
            "lat": "43.1793566",
            "code_postal": "31360",
            "commune": "BOUSSENS",
            "nom": "HOTEL DU LAC",
            "adresse": "7 Promenade du Lac\r\r\n31360 BOUSSENS",
            "long": "0.97472471"
        }]

        for (let i = 0; i < interestPoints.hotels.length; i++) {
            placesList.push(interestPoints.hotels[i])
        }
        // for (let i = 0; i < interestPoints.restaurants.length; i++) {
        //     placesList.push(interestPoints.restaurants[i])
        // }
        // for (let j = 0; j < interestPoints.restaurants.length; j++) {
        //     placesList.push(interestPoints.commerces_vie_pratique[j])
        // }

        // console.log(placesList)

        // return (
        //     <MapView.Marker
        //         coordinate={{ latitude: parseFloat(placesList[0].lat), longitude: parseFloat(placesList[0].long) }}
        //         title={placesList[0].nom}
        //         description={placesList[0].nom}
        //         onPress={() => console.log('onpress' + placesList[0].nom)}
        //     />
        // )
        return placesList.map((place, index) => {
            // console.log(place.lat)
            return (
                <MapView.Marker
                    key={index}
                    coordinate={{ latitude: parseFloat(place.lat), longitude: parseFloat(place.long) }}
                    title={place.nom}
                    description={place.nom}
                    onPress={() => console.log('onpress' + place.nom)}
                    pinColor="gold"
                />
            )
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <MapView
                    style={{ alignSelf: 'stretch', height: height(70) }}
                    region={this.state.mapRegion}
                    onRegionChange={this._handleMapRegionChange}
                >
                    <MapView.Polyline
                        coordinates={viaGaronaCoordinates}
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={4}
                    />
                    {this.renderUserLocationMarker()}
                    {this.renderRestaurationMarkers()}
                    {/* {this.renderHebergementMarker()} */}
                    {/* {this.renderCentresInteretsMarker()} */}
                </MapView>
                <View>
                    <CheckBox
                        value={this.state.checkbox.restauration}
                        onValueChange={() => this.updateCheckboxState("restauration")}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        backgroundColor: '#fff',
    },
});

// coordinates={[
            //   { latitude: 43.60316264092053, longitude: 1.442041119500028 },
            //   { latitude: 43.603671645494, longitude: 1.442397122517065 },
            //   { latitude: 43.60378913063952, longitude: 1.442625073968629 },
            //   { latitude: 43.60380653673481,  longitude: 1.442901970752816},
            //   { latitude: 43.6037812618994, longitude: 1.443013604356031 },
            //   { latitude: 43.60394942823355, longitude: 1.443027532014538 },
            //   { latitude: 43.605463151935645, longitude: 1.442699828957721 },
            //   { latitude: 43.606648186269624, longitude: 1.442408770925173 },
            //   { latitude: 43.607883768644854, longitude: 1.441894417008673 }
            // ]}

// available default marker color:
// red(default )
// tomato
// orange
// yellow
// gold
// wheat
// tan
// linen
// green
// blue / navy
// aqua / teal / turquoise
// violet / purple / plum
// indigo