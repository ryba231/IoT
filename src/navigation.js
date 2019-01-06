import { Navigation } from 'react-native-navigation'

export const goToAuth = () => Navigation.setRoot({
    root: {
        bottomTabs: {
            id: 'BottomTabsId',
            children: [
                {
                    component: {
                        name: 'Devices',
                        options: {
                            bottomTab: {
                                fontSize: 12,
                                text: 'Devices',
                                icon: require('./devices.png')
                            }
                        }
                    },
                },
                {
                    component: {
                        name: 'Connection',
                        options: {
                            bottomTab: {
                                text: 'Connection',
                                fontSize: 12,
                                icon: require('./connection.png')
                            }
                        }
                    },
                },
            ],
        }
    }
});
