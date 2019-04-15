import React from 'react';
// Redux implementation
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import RouteCoordinateReducer from './Reducers/RouteCoordinatesReducer'

// Navigation implementation
import AppNavigator from './navigation/AppNavigator'

// Create redux store to give it to the Provider
const store = createStore(RouteCoordinateReducer)

export default class App extends React.Component {
  render() {
    return (
        <Provider store={ store }>
            <AppNavigator />
        </Provider>
    );
  }
}
