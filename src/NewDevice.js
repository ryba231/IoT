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
import {goToAuth} from "./navigation";

let db = SQLite.openDatabase({name: 'IoT.db', createFromLocation: '1'});

const {width} = Dimensions.get('window');

export default class NewDevices extends React.Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: 'New Device',

                },
            }
        };
    }
    state = {
        deviceName: '', place: '', command: '', colorBox: ''
    };
    onChangeText = (key, val) => {
        this.setState({[key]: val})
    };
    addDevice = async () => {
        const {deviceName, place, command, colorBox} = this.state;

        try {
            db.transaction((tx) => {
                tx.executeSql(`INSERT INTO Devices (Name,Place,Command,Color) VALUES 
                  ('${this.state.deviceName}','${this.state.place}','${this.state.command}','${this.state.colorBox}');`)
            });
        } catch (e) {
            console.log('Error add to database', e);
        }
        goToAuth();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder='Device name'
                    autoCapitalize="none"
                    placeholderTextColor='#8f8f8f'
                    onChangeText={val => this.onChangeText('deviceName', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Place'
                    autoCapitalize="none"
                    placeholderTextColor='#8f8f8f'
                    onChangeText={val => this.onChangeText('place', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Command'
                    autoCapitalize="none"
                    placeholderTextColor='#8f8f8f'
                    onChangeText={val => this.onChangeText('command', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Color Box'
                    autoCapitalize="none"
                    placeholderTextColor='#8f8f8f'
                    onChangeText={val => this.onChangeText('colorBox', val)}
                />
                <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={styles.devicesButton} onPress={() => goToAuth()}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.devicesButton}>
                        <Text onPress={()=>this.addDevice()}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: width - 20,
        height: 55,
        backgroundColor: '#e2e2e2',
        margin: 10,
        padding: 8,
        color: '#000000',
        borderRadius: 14,
        borderColor: '#000000',
        borderWidth: 1,
        fontSize: 18,
    },
    devicesButton: {
        width: 120,
        height: 50,
        marginTop: 20,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1
    }
})