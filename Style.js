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
            flex: 1,
            alignSelf: "stretch",
            justifyContent: "center",
            alignItems: 'center'
        },
        contentView: {
            flex: 10,
            alignSelf: "stretch"
        },
        actionView: {
            flexDirection: 'row',
            justifyContent: 'center',
            bottom: 0,
            backgroundColor: 'white',
            alignSelf: "stretch"
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
            backgroundColor: 'grey',
            alignSelf: "stretch"
        },
        actionButtonText: {
            color: 'white',
            fontSize: 18,
            paddingVertical: 8,
            textAlign: 'center'
        },
        actionButtonView: {
            borderWidth: 1,
            borderColor: 'white',
            borderBottomWidth: 0,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
        }
    }
};