import StatusBar from 'react-native';

const colors = {
    red: '',
    white: '#FFF',
    green: '#4CAF50',
    gray: '#454545'
};

export default {
    colors,
    stackNavigator: {
        headerStyle: {
            marginTop: 0,
            paddingTop: StatusBar.currentHeight,
            backgroundColor: colors.green,
            height: 80
        },
        headerTitleStyle: {
            color: colors.white,
            marginBottom: 20,
            marginTop: 20
        },
        headerBackTitleStyle: {
            color: colors.white
        },
        headerTintColor: colors.white
    }
};