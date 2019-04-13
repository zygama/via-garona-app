import React from 'react';
import { MapView } from 'expo';

const viaGaronaCoordinates = require('../../data/viaGaronaCoordinates.json');
const cityCoordinates = require('../../data/villes.json')
const coordinates = []


export default class Polyline extends React.Component {
    state = {
        coordinates: viaGaronaCoordinates,
        color: ''
    }

    componentWillMount() {
        console.log("polyline cwm")
        // console.log(cityCoordinates)
        // this.determineRouteCoordinates("Toulouse", "Muret")
    }

    componentWillReceiveProps(props) {
        if (props.startCity && props.endCity) {
            console.log(props.startCity)
            console.log(props.endCity)
            this.determineRouteCoordinates(props.startCity, props.endCity)

            // let coordinates = determineRouteCoordinates(props.startCity, props.endCity)
            // this.setState({ coordinates, color: "red" })
        }
    }

    determineRouteCoordinates(p_startCity, p_endCity) {
        let indexStartCity = -1
        let indexEndCity = -1
        let newRouteCoordinates = []

        for (let i = 0; i < viaGaronaCoordinates.length; i++) {
            if (this.isObjectEquivalent(viaGaronaCoordinates[i], cityCoordinates[p_startCity]))
                indexStartCity = i
        }

        for (let j = 0; j < viaGaronaCoordinates.length; j++) {
            if (this.isObjectEquivalent(viaGaronaCoordinates[j], cityCoordinates[p_endCity]))
                indexEndCity = j
        }

        console.log("trouvé index start: " + indexStartCity)
        console.log("trouvé index end: " + indexEndCity)

        if (indexStartCity > indexEndCity) {
            newRouteCoordinates = viaGaronaCoordinates.slice(indexEndCity, indexStartCity + 1)
            this.setState({ coordinates: newRouteCoordinates, color: 'green' })
        } else if (indexEndCity > indexStartCity) {
            newRouteCoordinates = viaGaronaCoordinates.slice(indexStartCity, indexEndCity + 1)
            this.setState({ coordinates: newRouteCoordinates, color: 'orange' })
        }
    }

    // Function to check if two objects are equals
    isObjectEquivalent(a, b) {
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);

        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }

        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];

            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        // If we made it this far, objects
        // are considered equivalent
        return true;
    }

    render() {
        return (
            <MapView.Polyline
                coordinates={this.state.coordinates}
                strokeColor={this.state.color ? this.state.color : "#000"} // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={4}
            />
        )
    } 
}