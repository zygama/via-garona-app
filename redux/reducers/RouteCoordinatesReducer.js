import { combineReducers } from 'redux'
const viaGaronnaCoordinates = require('../../data/viaGaronaCoordinates.json')

const INITIAL_STATE = {
    coordinates: viaGaronnaCoordinates
} 

const routeCoordinatesReducer = (state = INITIAL_STATE, action) => {
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