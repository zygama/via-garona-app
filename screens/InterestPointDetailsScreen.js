import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import openMap from 'react-native-open-maps'


export default class InterestPointDetailsScreen extends React.Component {
    constructor(props){
        super(props)
        this.placeDetails = null
    }

    componentWillMount() {
        this.placeDetails = this.props.navigation.getParam('placeDetails', 'default param')
    }

    openMapsToInterestPoint() {
        const { lat, long } = this.placeDetails
        // openMap({ latitude: Number(this.placeDetails.lat), longitude: Number(this.placeDetails.long) });
        openMap({ query: `${lat},${long}` });
        // console.log(this.placeDetails.lat)
        // console.log(this.placeDetails.long)
    }

    render() {
        // const { navigation } = this.props
        // const placeDetails = navigation.getParam('placeDetails', 'default param')

        return (
            <View style={styles.container}>
                <Text>{JSON.stringify(this.placeDetails)}</Text>
                <Text>{this.placeDetails.nom}</Text>
                <Button
                    onPress={() => this.openMapsToInterestPoint()}
                    title="Itinéraire jusqu'à ce point d'intérêt"
                    color="#841584"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});