import { combineReducers } from 'redux'
const viaGaronnaCoordinates = require('../data/viaGaronaCoordinates.1.json')

const INITIAL_STATE = {
    coordinates: viaGaronnaCoordinates
} 

const routeCoordinatesReducer = (state = INITIAL_STATE, action) => {
    let newState
    switch (action.type) {
        case 'UPDATE_COORDINATES':
            const newCoordinates = action.payload
            return { ...state, coordinates: newCoordinates }
        default: 
            return state
    }
}

export default combineReducers({
    routeCoordinates: routeCoordinatesReducer
})