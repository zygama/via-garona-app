import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



export default class InterestPointDetailsScreen extends React.Component {
    state = {
    };

    componentWillMount() {
        
    }

    render() {
        const { navigation } = this.props
        const placeDetails = navigation.getParam('placeDetails', 'default param')

        return (
            <View style={styles.container}>
                <Text>{JSON.stringify(placeDetails)}</Text>
                <Text>{placeDetails.nom}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});