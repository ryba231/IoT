/** @format */

import {AppRegistry} from 'react-native';
import {Dimensions} from 'react-native'
import App from './App';
import {name as appName} from './app.json';
import {Navigation} from "react-native-navigation";

Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => App);

const {width} = Dimensions.get('window');
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        layout: {
            orientation: ['portrait']
        },
        topBar: {
            elevation: 0,
            visible: false,
            drawBehind: true,
            animate: false,
            buttonColor: 'white',
            title: {
                color: 'white',
                alignment: 'center'
            },
            background: {
                color: 'transparent'
            }
        }
    });
    Navigation.setRoot({
        root: {
            sideMenu: {
                left: {
                    component: {
                        id: 'menuDrawer',
                        name: 'navigation.playground.WelcomeScreen',
                        fixedWidth: width
                    }
                },
                center: {
                    stack: {
                        id: 'MAIN_STACK',
                        children: [
                            {
                                component: {
                                    name: 'navigation.playground.WelcomeScreen',
                                }
                            },
                        ]
                    }
                },
            },
        }
    });
});