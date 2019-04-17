import { Navigation } from 'react-native-navigation'

export const goToAuth = () => Navigation.setRoot({
    root: {
        bottomTabs: {
            id: 'BottomTabsId',
            children: [
                {
                    component: {
                        id:'DEV',
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
                        id:'CON',
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
export const goNewDevice = () => Navigation.setRoot({
    root: {
        stack: {
            id: 'App',
            children: [
                {
                    component: {
                        name: 'NewDevice',
                    }
                }
            ],
        }
    }
});
export const goModifiDevice = (oldName,oldPlace) => Navigation.setRoot({
    root: {
        stack: {
            id: 'App',
            children: [
                {
                    component: {
                        name: 'ModifiDevice',
                        passProps: {
                            oldNameDevice:oldName,
                            oldPlaceDevice:oldPlace
                        },
                    }
                }
            ],
        }
    }
});
