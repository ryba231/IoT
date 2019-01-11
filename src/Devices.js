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
    Alert
} from 'react-native'
import {Header} from "react-native-elements";
import SQLite from "react-native-sqlite-storage";
import {Navigation} from "react-native-navigation";

import {goNewDevice,goModifiDevice} from "./navigation";


let db = SQLite.openDatabase({name: 'IoT.db', createFromLocation: '1'});

const {width} = Dimensions.get('window');

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
    deleteDevice=(name,place)=>{
        db.transaction((tx)=>{
            tx.executeSql(`DELETE FROM Devices WHERE Name = ? AND Place = ?`,[name,place],(tx,results)=>{
                console.log('Usuwanie OK');
            })
        })
    };

    render() {
        return (
            <View>
                <Header
                    centerComponent={{
                        text: 'Devices',
                        style: {color: '#000000', fontSize: 30, fontFamily: 'IndieFlower'}
                    }}
                    backgroundColor='transparent'/>
                <View style={{flex:1,flexWrap: 'wrap',flexDirection:'row'}}>
                    {
                        this.state.test.map((item, k) => (
                            <TouchableOpacity onLongPress={()=>Alert.alert('','',[
                                    {text: 'Modyfikuj', onPress: () => goModifiDevice()},
                                    {text: 'Usuń', onPress: () => this.deleteDevice(item.Name,item.Place)},
                                    {text: 'Cancel', onPress: () => console.log(''), style: 'cancel'},
                                ],
                                { cancelable: false })} key={k} style={[styles.devicesButton,{backgroundColor: item.Color}]}>
                                <Text style={{fontSize:25}}>{item.Name}</Text>
                                <Text style={{fontSize:15}}>{item.Place}</Text>
                            </TouchableOpacity>
                        ))
                    }
                    <TouchableOpacity style={styles.devicesButton} onPress={()=>goNewDevice()}>
                        <Text style={{fontSize:80,color:'#000000'}}>+</Text>
                    </TouchableOpacity>
                </View>
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