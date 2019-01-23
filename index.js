import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        layout: {
            orientation: ['portrait']
        },
    });
    Navigation.setRoot({
        root: {
            component: {
                name: 'Initializing'
            }
        },
    });
});