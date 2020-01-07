import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Alert, Dimensions, AsyncStorage, ScrollView,
} from 'react-native'
import {Header} from "react-native-elements";
import {BleManager} from "react-native-ble-plx";
import {goModifiDevice, goNewDevice} from "./navigation";
import SQLite from "react-native-sqlite-storage";

let db = SQLite.openDatabase({name: 'IoT.db', createFromLocation: '1'});
const {width} = Dimensions.get('window');


const devices = {id: '00:15:86:13:DA:54', serviceUUID: 'FFE0', characteristicUUID: 'FFE1'};

export default class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.manager = new BleManager();
        this.state = {
            bleDevice: [],
            serviceUUID: 'FFE0',
            characteristicUUID: 'FFE1',
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

    /* componentWillMount(){
         this.checkBluetoothState();
     }*/


    checkBluetoothState() {
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                this.scanAndConnect();
                subscription.remove();
            }
        }, true);
    }

    changeDevice(command) {
        if (devices) {
            this.manager.writeCharacteristicWithoutResponseForDevice(
                devices.id, devices.serviceUUID, devices.characteristicUUID, btoa(command)
            ).then(response => {
                console.log('response', response);
            }).catch((error) => {
                console.log('Error', error);
            });

            this.manager.readCharacteristicForDevice(devices.id, devices.serviceUUID, devices.characteristicUUID)
                .then(response => {
                    console.log('response', response);
                })
                .catch((error) => {
                    console.log('Error', error);
                });

        }
    }

    scanAndConnect() {
        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log('error', error);
                return
            }
            console.log(device);
            this.setState({bleDevice: device})

            if (device.name === 'BT05') {
                this.manager.stopDeviceScan();

                return device.connect()
                    .then((device) => {
                        return device.discoverAllServicesAndCharacteristics();
                    }).then((characteristic) => {
                        this.manager.writeCharacteristicWithoutResponseForDevice(
                            // device.id, 'FFE0', 'FFE1', btoa('on')
                        ).then(response => {
                            console.log(response);
                        })

                    }).catch((error) => {
                        console.log('Error', error);
                    });


            }

        });

    }

    render() {
        return (
            <View>
                <Header
                    centerComponent={{
                        text: 'Connection',
                        style: {color: '#000000', fontSize: 30, fontFamily: 'IndieFlower'}
                    }}
                    backgroundColor='transparent'/>
                <Text>Connection</Text>

                <Text>{this.state.bleDevice.id}</Text>
                <Text>{this.state.bleDevice.localName}</Text>
                <Text>{this.state.bleDevice.rssi}</Text>
                <Text>{this.state.bleDevice.mtu}</Text>

                <TouchableOpacity style={styles.searchButton}
                                  onPress={() => this.checkBluetoothState()}><Text>Szukaj</Text></TouchableOpacity>

                <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>

                    <TouchableOpacity onPress={() => this.changeDevice('on')}
                                      style={[styles.devicesButton, {backgroundColor: 'green'}]}>
                        <Text style={{fontSize: 25}}>On</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.devicesButton} onPress={() => this.changeDevice('off')}>
                        <Text style={{fontSize: 80, color: '#000000'}}>OFF</Text>
                    </TouchableOpacity>

                </View>

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
    },
    searchButton: {
        width: 120,
        height: 50,
        marginTop: 20,
        marginHorizontal: 5,
        borderWidth: 0.5,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center'
    },
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
