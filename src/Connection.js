import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    AsyncStorage
} from 'react-native'
import {Header} from "react-native-elements";
import {Navigation} from "react-native-navigation";
import {BleManager} from "react-native-ble-plx";

export default class Connection extends React.Component {
    constructor(props) {
        super(props);
        this.manager = new BleManager();
    }
    componentWillMount(){
        this.checkBluetoothState();
    }


    checkBluetoothState(){
        const subscription = this.manager.onStateChange((state)=>{
            if (state === 'PoweredOn'){
                this.scanAndConnect();
                subscription.remove();
            }
        },true);
    }
    scanAndConnect(){
        this.manager.startDeviceScan(null,null,(error,device)=>{
            if(error){
                console.log('error',error);
                return
            }
            console.log(device);
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