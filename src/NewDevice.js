import React from 'react'
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import {Header} from "react-native-elements";
import SQLite from "react-native-sqlite-storage";


let db = SQLite.openDatabase({name: 'IoT.db', createFromLocation: '1'});

const {width} = Dimensions.get('window');

export default class NewDevices extends React.Component {
    render() {
        return (
            <View>
                <Header
                    centerComponent={{
                        text: 'New device',
                        style: {color: '#000000', fontSize: 30, fontFamily: 'IndieFlower'}
                    }}
                    backgroundColor='transparent'/>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    devicesButton:{
        width:width/2-10,
        height: width/2-10,
        marginTop: 20,
        marginHorizontal:5,
        borderWidth: 0.5,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    }
})