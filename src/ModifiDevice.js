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

export default class ModifiDevice extends React.Component {
    static get options() {
        return {
            topBar: {
                title: {
                    text: 'Modification Device',

                },
            }
        };
    }
    state = {
        oldName: '', oldPlace: '',newName: '', newPlace: '', command: '', colorBox: ''
    };
    onChangeText = (key, val) => {
        this.setState({[key]: val})
    };
    modifiDevice = async () => {
        const {oldDeviceName,oldPlace,newDeviceName,newPlace, newCommand, newColorBox} = this.state;

        try {
            db.transaction((tx) => {
                tx.executeSql(`UPDATE Devices SET Name = ?,Place = ?,Command=?,Color=? WHERE Name = ? AND Place = ?`,
                    [newDeviceName,newPlace,newCommand,newColorBox,oldDeviceName,oldPlace],(tx,results)=>{
                    console.log('Modyfikacja OK');
                })
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
                    placeholder='Old device name'
                    autoCapitalize="none"
                    placeholderTextColor='#8f8f8f'
                    onChangeText={val => this.onChangeText('oldDeviceName', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Old place'
                    autoCapitalize="none"
                    placeholderTextColor='#8f8f8f'
                    onChangeText={val => this.onChangeText('oldPlace', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='New device name'
                    autoCapitalize="none"
                    placeholderTextColor='#8f8f8f'
                    onChangeText={val => this.onChangeText('newDeviceName', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='New place'
                    autoCapitalize="none"
                    placeholderTextColor='#8f8f8f'
                    onChangeText={val => this.onChangeText('newPlace', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder=' New command'
                    autoCapitalize="none"
                    placeholderTextColor='#8f8f8f'
                    onChangeText={val => this.onChangeText('newCommand', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='New color Box'
                    autoCapitalize="none"
                    placeholderTextColor='#8f8f8f'
                    onChangeText={val => this.onChangeText('newColorBox', val)}
                />
                <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={styles.devicesButton} onPress={() => goToAuth()}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.devicesButton}>
                        <Text onPress={()=>this.modifiDevice()}>Save</Text>
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