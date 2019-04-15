export const updateCoordinates = (newCoordinates) => {
    console.log('actions coor')
    return {
        type: 'UPDATE_COORDINATES',
        payload: newCoordinates
    }
}