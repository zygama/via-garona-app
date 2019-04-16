/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Alert,
    ActivityIndicator,
    Picker,
    Button
} from 'react-native';
import {
    MapView,
    Location,
    Permissions,
    IntentLauncherAndroid
} from 'expo';
import { CheckBox, Slider } from 'react-native-elements'
import { widthPercentageToDP as width, heightPercentageToDP as height } from 'react-native-responsive-screen';
// Redux implementation
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCoordinates } from '../../redux/actions/RouteCoordinatesActions'

import Polyline from '../../components/route_screen/Polyline'
import { getDistanceFrom, isObjectEquivalent } from '../../utils/functions'

const interestPoints = require('../../data/centres_interets.json')
const citiesCoordinates = require('../../data/villes.json')
const viaGaronaCoordinates = require('../../data/viaGaronaCoordinates.json')


class RouteByTimeScreen extends React.Component {
    static showAlertLocationMustBeEnabled(p_onPressFunction) {
        return new Promise((resolve) => {
            Alert.alert(
                'La localisation n\'est pas activée',
                'Veuillez s\'il vous plait activer la localisation dans les paramètres'
                + 'afin d\'afficher votre position sur la carte',
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

    static navigationOptions = {
        title: 'RouteByTime', // Don't know if it's usefull
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            valueDistanceSlider: 1,
            mapRegion: {
                // Toulouse
                latitude: 43.6044622,
                longitude: 1.4442469,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            location: {},
            checkbox: {
                restaurants: false,
                commerces_vie_pratique: false,
                hebergements: false,
                points_interets: false
            },
            startCity: '',
            endCity: '',
        }
        this.mapRef = null
        this.fitMapToViaGaronnaCoordinates = this.fitMapToViaGaronnaCoordinates.bind(this)
        this.indexStartCity = null
    }

    componentWillMount() {
        this.getLocationAsync();
    }

    onValueSliderChange() {
        if (this.state.startCity) {
            let indexCoordinatesDistance
            let newRouteCoordinates

            if (!this.indexStartCity) {
                for (let i = 0; i < viaGaronaCoordinates.length; i++) {
                    if (isObjectEquivalent(viaGaronaCoordinates[i], citiesCoordinates[this.state.startCity])) {
                        this.indexStartCity = i
                        break
                    }
                }
            }

            for (let j = viaGaronaCoordinates.length - 1; j >= 0; j--) {
                // console.log(viaGaronaCoordinates[this.indexStartCity].latitude)
                // console.log(viaGaronaCoordinates[this.indexStartCity].longitude)
                // console.log(viaGaronaCoordinates[j].latitude)
                // console.log(viaGaronaCoordinates[j].longitude)
                if (getDistanceFrom(
                    viaGaronaCoordinates[this.indexStartCity].latitude,
                    viaGaronaCoordinates[this.indexStartCity].longitude,
                    viaGaronaCoordinates[j].latitude,
                    viaGaronaCoordinates[j].longitude,
                    'K'
                ) >= this.state.valueDistanceSlider) {
                    indexCoordinatesDistance = j
                    break
                }
            }

            if (this.indexStartCity > indexCoordinatesDistance) {
                newRouteCoordinates = viaGaronaCoordinates.slice(indexCoordinatesDistance, this.indexStartCity + 1)
                this.props.updateCoordinates(newRouteCoordinates)
            } else if (indexCoordinatesDistance > this.indexStartCity) {
                newRouteCoordinates = viaGaronaCoordinates.slice(this.indexStartCity, indexCoordinatesDistance + 1)
                this.props.updateCoordinates(newRouteCoordinates)
            }

            this.fitMapToViaGaronnaCoordinates()

            console.log(`trouvé index start: ${this.indexStartCity}`)
            console.log(`trouvé index distance max: ${indexCoordinatesDistance}`)
        }
    }

    getLocationWithPermissions = async () => {
        const location = await Location.getCurrentPositionAsync({});
        console.log(location);
        this.setState({
            location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            }
        });
    }

    fitMapToViaGaronnaCoordinates = () => {
        console.log('fitMAPPs')
        // setTimeout to let the state being update before animate to coordinates (hack ?)
        setTimeout(() => {
            this.mapRef.fitToCoordinates(this.props.routeCoordinates.coordinates,
                {
                    edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
                    animated: true
                })
        }, 0)
    }

    getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
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
        const providerStatusAsync = await Location.getProviderStatusAsync()
        if (providerStatusAsync.gpsAvailable === false
            || providerStatusAsync.locationServicesEnabled === false) {
            // open
            RouteByTimeScreen.showAlertLocationMustBeEnabled(async () => {
                await IntentLauncherAndroid.startActivityAsync(
                    IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
                );
                console.log('attente gps active')
                await this.getLocationWithPermissions()
                this.setState({ loading: false })
            })
        } else {
            await this.getLocationWithPermissions()
            this.setState({ loading: false })
        }
    };

    updateCheckboxState(p_interestPointType) {
        const actualState = { ...this.state }

        actualState.checkbox[p_interestPointType] = !actualState.checkbox[p_interestPointType]
        this.setState({ actualState })
        this.fitMapToViaGaronnaCoordinates()
        console.log(this.state)
    }

    renderCitiesToPick() {
        // Get the json containing cities (key) and their lat/long (value)
        // const jsonCities = require('../../data/villes.json')
        // Get cities in an array by iterating over keys of the json (which are the cities)
        const cities = Object.keys(citiesCoordinates)
        // Add a label value in the picker
        // unshift() add item to the first place of an array
        cities.unshift('Veuillez choisir une villeeee')

        return cities.map((city, index) => {
            // Index 0 is message 'Veuillez choisir une ville' so his value is set to ''
            if (index === 0) {
                return (
                    <Picker.Item key={index} label={city} value="" />
                )
            }

            return (
                <Picker.Item key={index} label={city} value={city} />
            )
        })
    }

    renderUserLocationMarker() {
        if (this.state.location.latitude && this.state.location.longitude) {
            return (
                <MapView.Marker
                    coordinate={this.state.location}
                    title="Ma position"
                />
            )
        }
        return false
    }

    // Render the "restaurants" markers
    // eslint-disable-next-line consistent-return
    renderInterestPointMarkers(p_interestPointType) {
        // TODO: mettre if this.state.[] au dessus du bloc de if else
        const placesList = []

        if (this.state.checkbox[p_interestPointType]) {
            if (p_interestPointType === 'restaurants' || p_interestPointType === 'commerces_vie_pratique') {
                console.log('inside if')

                for (let i = 0; i < interestPoints[p_interestPointType].length; i++) {
                    placesList.push(interestPoints[p_interestPointType][i])
                }

                return placesList.map((place, index) => {
                    // console.log(place.lat)
                    return this.renderPlaceMarker(place, index,
                        p_interestPointType === 'restaurants' ? 'gold' : 'orange')
                })
            } else if (p_interestPointType === 'hebergements') {
                console.log('inside if')

                for (let i = 0; i < interestPoints.hotels.length; i++) {
                    placesList.push(interestPoints.hotels[i])
                }
                for (let j = 0; j < interestPoints.campings.length; j++) {
                    placesList.push(interestPoints.campings[j])
                }
                return placesList.map((place, index) => this.renderPlaceMarker(place, index, 'green'))
            } else if (p_interestPointType === 'points_interets') {
                console.log('inside if points_interets')

                for (let i = 0; i < interestPoints.loisirs.length; i++) {
                    placesList.push(interestPoints.loisirs[i])
                }
                for (let j = 0; j < interestPoints.patrimoine.length; j++) {
                    placesList.push(interestPoints.patrimoine[j])
                }
                for (let k = 0; k < interestPoints.activites_sportives.length; k++) {
                    placesList.push(interestPoints.activites_sportives[k])
                }

                return placesList.map((place, index) => {
                    return this.renderPlaceMarker(place, index, 'violet')
                })
            } else {
                return false
            }
        }
    }

    renderPlaceMarker(p_place, p_index, p_color) {
        return (
            <MapView.Marker
                key={p_index}
                coordinate={{ latitude: parseFloat(p_place.lat), longitude: parseFloat(p_place.long) }}
                title={p_place.nom}
                onPress={() => console.log(`onpress marker ${p_place.nom}`)}
                pinColor={p_color}
            // tracksViewChanges={false}
            >
                <MapView.Callout
                    onPress={() => this.props.navigation.navigate('InterestPointDetails', {
                        placeDetails: p_place
                    })}
                >
                </MapView.Callout>
            </MapView.Marker>
        )
    }

    renderInterestPointCheckbox(p_interestPointType, p_interestPointStringText) {
        return (
            <View style={styles.checkboxLineContainer}>
                <CheckBox
                    title={p_interestPointStringText}
                    checked={this.state.checkbox[p_interestPointType]}
                    onPress={() => this.updateCheckboxState(p_interestPointType)}
                />
            </View>
        )
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                        size="large"
                        color="#1F5070"
                    />
                    <Text>En attente des données de localisation</Text>
                </View>
            )
        } else {
            return (
                <ScrollView style={styles.container}>
                    <View>
                        <View style={styles.pickerLine}>
                            <Text>Ville de départ: </Text>
                            <Picker
                                selectedValue={this.state.startCity}
                                style={{ height: width(15), width: width(40) }}
                                onValueChange={(itemValue) => {
                                    this.setState({ startCity: itemValue })
                                    this.fitMapToViaGaronnaCoordinates()
                                }}
                            >
                                {this.renderCitiesToPick('start')}
                            </Picker>
                        </View>
                        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
                            <Slider
                                value={this.state.valueDistanceSlider}
                                onValueChange={valueDistanceSlider => this.setState({ valueDistanceSlider })}
                                minimumValue={1}
                                maximumValue={150}
                                step={1}
                            />
                            <Text>Distance: {this.state.valueDistanceSlider}Km</Text>
                            <Button
                                onPress={() => this.onValueSliderChange()}
                                title="Go !"
                                color="#841584"
                            />
                        </View>

                    </View>
                    <MapView
                        ref={ref => this.mapRef = ref}
                        onMapReady={() => this.fitMapToViaGaronnaCoordinates()}
                        style={{ alignSelf: 'stretch', height: height(60) }}
                        region={this.state.mapRegion}
                    >
                        <Polyline
                            startCity={this.state.startCity}
                            endCity={this.state.endCity}
                            onPropsPassed={() => this.fitMapToViaGaronnaCoordinates()}
                        />
                        {this.renderUserLocationMarker()}
                        {this.renderInterestPointMarkers('restaurants')}
                        {this.renderInterestPointMarkers('commerces_vie_pratique')}
                        {this.renderInterestPointMarkers('hebergements')}
                        {this.renderInterestPointMarkers('points_interets')}
                    </MapView>
                    <View style={styles.checkboxsContainer}>
                        {this.renderInterestPointCheckbox('restaurants', 'Restauration')}
                        {this.renderInterestPointCheckbox('commerces_vie_pratique', 'Commerces et vie pratique')}
                        {this.renderInterestPointCheckbox('hebergements', 'Hebergements')}
                        {this.renderInterestPointCheckbox('points_interets', "Points d'intérêt")}
                        {/* {this.renderInterestPointCheckbox('points_interets', "Points d'\intérêt")} */}
                    </View>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pickerLine: {
        flexDirection: 'row',
        alignItems: 'center', // align two elements of the container
        justifyContent: 'space-around'

    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxsContainer: {
        flexDirection: 'column',
        paddingTop: height(2),
        paddingLeft: height(2)
    },
    checkboxLineContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    console.log('mapStateToProps')

    const { routeCoordinates } = state
    return { routeCoordinates }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateCoordinates
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(RouteByTimeScreen)

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