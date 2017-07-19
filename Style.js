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
    },
    schedule: {
        containerView: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
        },
        titleView: {
            flex: 1
        },
        contentView: {
            flex: 1
        },
        actionView: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            bottom: 0
        },
        titleText: {
            fontSize: 25,
            textAlign: 'center',
            paddingVertical: 10
        },
        noCourse: {
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        },
        actionButton: {
            flex: 2,
            borderRadius: 0,
            border: 'none'
        }
    }
};