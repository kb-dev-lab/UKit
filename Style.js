import {StatusBar} from 'react-native';

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
            marginTop: 20,
            fontSize: 22
        },
        headerBackTitleStyle: {
            color: colors.white
        },
        headerTintColor: colors.white
    },
    containerView: {
        margin: 20,
        marginTop: 30
    },
    list: {
        view: {
            backgroundColor: '#40C4FF',
            borderWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#0D47A1',
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'space-between'
        }
    }
};