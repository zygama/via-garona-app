import { combineReducers } from 'redux'
const viaGaronnaCoordinates = require('../data/viaGaronaCoordinates.json')

const INITIAL_STATE = {
    routeCoordinates: viaGaronnaCoordinates
} 

const routeCoordinatesReducer = (state = INITIAL_STATE, action) => {
    let newState
    switch (action.type) {
        case 'UPDATE_COORDINATES':
            const newCoordinates = action.payload
            console.log(newCoordinates)
            newState = { ...state, routeCoordinates: newCoordinates }
            console.log(newState)
            // console.log(state) // } ] }
            return { ...state, routeCoordinates: newCoordinates }
            // return state
        default: 
            return state
    }
}

export default combineReducers({
    routeCoordinates: routeCoordinatesReducer
})