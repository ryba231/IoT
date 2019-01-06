import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    AsyncStorage
} from 'react-native'


export default class Connection extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Connection</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 350,
        fontSize: 18,
        fontWeight: '500',
        height: 55,
        backgroundColor: '#42A5F5',
        margin: 10,
        color: 'white',
        padding: 8,
        borderRadius: 14
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})