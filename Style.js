import {StatusBar} from 'react-native';

const colors = {
    red: '',
    white: '#FFF',
    green: '#4CAF50',
    gray: '#454545',
    lightblue: '#40C4FF',
    darkblue: '#0D47A1',
    darkred: '#B71C1C'
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
            backgroundColor: colors.lightblue,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.darkblue,
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'space-between'
        }
    },
    schedule: {
        course: {
            row: {
                backgroundColor: colors.lightblue,
                borderWidth: 1,
                borderColor: colors.darkblue,
                paddingHorizontal: 20,
                paddingVertical: 10,
                marginHorizontal: 15,
                marginVertical: 2,
                justifyContent: 'space-between'
            },
            title:{
                textAlign: 'center',
                fontWeight: 'bold'
            },
            header:{},
            content:{
                color: colors.darkred
            },
            line:{
                flexDirection: 'row',
                justifyContent: 'flex-start'
            }
        },
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