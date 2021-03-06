import {Navigation} from 'react-native-navigation';

export function registerScreens() {
    Navigation.registerComponent('Initializing', (sc) => require('./Initializing').default);
    Navigation.registerComponent('Devices', () => require('./Devices').default);
    Navigation.registerComponent('Connection', () => require('./Connection').default);
    Navigation.registerComponent('NewDevice', () => require('./NewDevice').default);
    Navigation.registerComponent('ModifiDevice', () => require('./ModifiDevice').default);
}