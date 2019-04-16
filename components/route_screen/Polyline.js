/* eslint-disable curly */
import React from 'react';
import { MapView } from 'expo';

// Redux implementation
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCoordinates } from '../../redux/actions/RouteCoordinatesActions'

import { isObjectEquivalent } from '../../utils/functions'

const cityCoordinates = require('../../data/villes.json')
const viaGaronaCoordinates = require('../../data/viaGaronaCoordinates.json')


class Polyline extends React.Component {
    constructor(props) {
        super(props)
        this.hackInfiniteLoop = false // Will be usefull as a hack to not rerender in infinite loop
    }

    componentWillMount() {
        console.log('polyline cwm')
        console.log(typeof this.props.routeCoordinates)
    }

    componentWillReceiveProps(props) {
        if (props.startCity && props.endCity && this.hackInfiniteLoop === false) {
            if (props.startCity !== props.endCity) { // Execute only if the two cities aren't the same
                console.log(props.startCity)
                console.log(props.endCity)
                this.determineRouteCoordinates(props.startCity, props.endCity)
            }
        }
    }

    determineRouteCoordinates(p_startCity, p_endCity) {
        let indexStartCity = -1
        let indexEndCity = -1
        let newRouteCoordinates = []

        for (let i = 0; i < viaGaronaCoordinates.length; i++) {
            if (isObjectEquivalent(viaGaronaCoordinates[i], cityCoordinates[p_startCity]))
                indexStartCity = i
                // break
        }

        for (let j = 0; j < viaGaronaCoordinates.length; j++) {
            if (isObjectEquivalent(viaGaronaCoordinates[j], cityCoordinates[p_endCity]))
                indexEndCity = j
                // break
        }

        console.log(`trouvé index start: ${indexStartCity}`)
        console.log(`trouvé index end: ${indexEndCity}`)

        if (indexStartCity > indexEndCity) {
            newRouteCoordinates = viaGaronaCoordinates.slice(indexEndCity, indexStartCity + 1)
            this.props.updateCoordinates(newRouteCoordinates)
        } else if (indexEndCity > indexStartCity) {
            newRouteCoordinates = viaGaronaCoordinates.slice(indexStartCity, indexEndCity + 1)
            this.props.updateCoordinates(newRouteCoordinates)
        }
        this.hackInfiniteLoop = true
        this.props.onPropsPassed()

        // Wait 500ms before set the var to hackInfiniteLoop to false
        // If not this function will be called only one time
        setTimeout(() => {
            this.hackInfiniteLoop = false
        }, 500)
    }

    render() {
        return (
            <MapView.Polyline
                coordinates={this.props.routeCoordinates.coordinates}
                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={4}
            />
        )
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Polyline)