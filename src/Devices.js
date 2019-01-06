import React from 'react'
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet
} from 'react-native'

export default class Devices extends React.Component {
    render() {
        return (
            <View style={styles.container}>
               <Text>Devices</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55,
        backgroundColor: '#42A5F5',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})