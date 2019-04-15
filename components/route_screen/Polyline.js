import React from 'react';
import { MapView } from 'expo';

// Redux implementation
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCoordinates } from '../../Actions/RouteCoordinatesActions'

const viaGaronaCoordinates = require('../../data/viaGaronaCoordinates.json');
const cityCoordinates = require('../../data/villes.json')
const coordinates = []


class Polyline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // coordinates: this.props.coordinates,
            coordinates: viaGaronaCoordinates,
            color: ''
        }
        this.test = false
    }

    componentWillMount() {
        console.log("polyline cwm")
        console.log(typeof this.props.routeCoordinates)
        console.log(this.props.routeCoordinates)
        // console.log(this.props.routeCoordinates)
        // this.setState({ coordinates: this.props.routeCoordinates })
        // console.log(cityCoordinates)
        // this.determineRouteCoordinates("Toulouse", "Muret")
    }

    componentWillReceiveProps(props) {
        if (props.startCity && props.endCity && this.test === false) {
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
            this.props.updateCoordinates(newRouteCoordinates)
            // this.setState({ coordinates: newRouteCoordinates, color: 'green' })
        } else if (indexEndCity > indexStartCity) {
            newRouteCoordinates = viaGaronaCoordinates.slice(indexStartCity, indexEndCity + 1)
            this.props.updateCoordinates(newRouteCoordinates)
            // this.setState({ coordinates: newRouteCoordinates, color: 'orange' })
        }
        this.test = true
        // console.log(newRouteCoordinates[0])
        // console.log(newRouteCoordinates.length) 
        this.props.onPropsPassed(newRouteCoordinates)

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
                coordinates={this.props.routeCoordinates}
                // coordinates={this.state.coordinates}
                strokeColor={this.state.color ? this.state.color : "#000"} // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={4}
            />
        )
    } 
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps')
    // console.log(state)
    const { routeCoordinates } = state
    return routeCoordinates

    // return { routeCoordinates: state.routeCoordinates }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateCoordinates
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Polyline)