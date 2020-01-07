import React from 'react'
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,
    AsyncStorage
} from 'react-native'
import {Header} from "react-native-elements";
import SQLite from "react-native-sqlite-storage";
import {Navigation} from "react-native-navigation";

import {goNewDevice, goModifiDevice} from "./navigation";


let db = SQLite.openDatabase({name: 'IoT.db', createFromLocation: '1'});

const {width} = Dimensions.get('window');
const devices = {id: '00:15:86:13:DA:54', serviceUUID: 'FFE0', characteristicUUID: 'FFE1'};

export default class Devices extends React.Component {
    constructor() {
        super();
        this.state = {
            test: [],
        };
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM Devices', [], (tx, results) => {
                console.log("Query completed");
                var tab = [];
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    tab[i] = results.rows.item(i);
                }
                this.setState({test: tab});

            })
        })
    }

    deleteDevice = (name, place) => {
        db.transaction((tx) => {
            tx.executeSql(`DELETE
                           FROM Devices
                           WHERE Name = ?
                             AND Place = ?`, [name, place], (tx, results) => {
                console.log('Usuwanie OK');
            })
        })
    };

    sendCommand(devName, command) {
        if (this.state.deviceId == null) {
            this.setState({btState: 'Brak połączenia z urządzeniem...'});
        } else {
            this.manager.writeCharacteristicWithResponseForDevice(this.state.deviceId, this.state.serviceUUID, this.state.characteristicUUID, btoa(command)
            ).then(response => {
                console.log('## Response: ');
                console.log(response);
                if (devName != null) {
                    this.setState({btState: 'Wysłano komendę do \'' + devName + '\''});
                } else {
                    this.setState({btState: 'Wysłano komendę OFF'});
                }
            }).catch((err) => {
                console.log('### devID: ' + this.state.deviceId + ', servUUID: ' + this.state.serviceUUID + ', charUUID: ' + this.state.characteristicUUID);
                console.log('## Error: ');
                console.log(err);
                this.setState({btState: '            Brak połączenia... \nNie można wykonać komendy.'});
            });
        }
    }

    changeDevice(command) {
        AsyncStorage.getItem('device').then(devices => {
            devices = JSON.parse(devices);
            if (devices) {
                this.manager.writeCharacteristicWithoutResponseForDevice(
                    devices.id, devices.serviceUUID, devices.characteristicUUID, btoa(command)
                ).then(response => {
                    console.log('response', response);
                }).catch((error) => {
                    console.log('Error', error);
                });
            }
        });
    }

    render() {
        return (
            <ScrollView>
                <Header
                    centerComponent={{
                        text: 'Devices',
                        style: {color: '#000000', fontSize: 30, fontFamily: 'IndieFlower'}
                    }}
                    backgroundColor='transparent'/>
                <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>

                    <TouchableOpacity onPress={() => this.changeDevice('on')}
                                      style={[styles.devicesButton, {backgroundColor: 'green'}]}>
                        <Text style={{fontSize: 25}}>On</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.devicesButton} onPress={() => this.changeDevice('off')}>
                        <Text style={{fontSize: 80, color: '#000000'}}>OFF</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    devicesButton: {
        width: width / 2 - 10,
        height: width / 2 - 10,
        marginTop: 20,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
