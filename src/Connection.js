import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    AsyncStorage,
    TouchableOpacity,
} from 'react-native'
import {Header} from "react-native-elements";
import {Navigation} from "react-native-navigation";
import {BleManager} from "react-native-ble-plx";

const devices = {id: 'A8:1B:6A:75:96:65', serviceUUID: 'FFE0', characteristicUUID: 'FFE1'};

export default class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.manager = new BleManager();
        this.state = {
            bleDevice: [],
        }
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

    scanAndConnect() {
        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log('error', error);
                return
            }
            console.log(device);
            this.setState({bleDevice: device})

            if (device.name === 'MLT-BT05') {
                this.manager.stopDeviceScan();

                return device.connect()
                    .then((device) => {
                        return device.discoverAllServicesAndCharacteristics();
                    }).then((characteristic) => {
                        this.manager.writeCharacteristicWithoutResponseForDevice(
                            device.id, 'FFE0', 'FFE1', btoa('green')
                        ).then(response => {
                            console.log(response);
                        })

                    }).catch((error) => {
                        console.log('Error', error);
                    });

            }
            return AsyncStorage.setItem('device', JSON.stringify(devices)).then(() => {
                Navigation.mergeOptions('DEV', {
                    bottomTab: {
                        badge: '+',
                    },
                    bottomTabs: {
                        currentTabId: 'DEV'
                    }
                });
            })
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
})