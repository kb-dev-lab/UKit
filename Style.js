import {StatusBar, Platform} from 'react-native';

const colors = {
    red: '',
    white: '#FFF',
    green: '#4CAF50',
    gray: '#454545',
    lightblue: '#40C4FF',
    darkblue: '#0D47A1',
    darkred: '#D50000',
    backgroundGrey: '#E9E9EF'
};

const hintColors = {
    green: '#55da59',
    gray: '#9a9a9a'
};

const colors200 = {
    red: '#EF9A9A',
    pink: '#F48FB1',
    purple: '#CE93D8',
    deepPurple: '#B39DDB',
    indigo: '#9FA8DA',
    blue: '#90CAF9',
    lightBlue: '#81D4FA',
    cyan: '#80DEEA',
    teal: '#80CBC4',
    green: '#A5D6A7',
    lightGreen: '#C5E1A5',
    lime: '#E6EE9C',
    yellow: '#FFF59D',
    amber: '#FFE082',
    orange: '#FFCC80',
    deepOrange: '#FFAB91',
    brown: '#BCAAA4',
    grey: '#EEEEEE',
    blueGrey: '#B0BEC5'
};

const colors100 = {
    red: '#FFCDD2',
    pink: '#F8BBD0',
    purple: '#E1BEE7',
    deepPurple: '#D1C4E9',
    indigo: '#C5CAE9',
    blue: '#BBDEFB',
    lightBlue: '#B3E5FC',
    cyan: '#B2EBF2',
    teal: '#B2DFDB',
    green: '#C8E6C9',
    lightGreen: '#DCEDC8',
    lime: '#F0F4C3',
    yellow: '#FFF9C4',
    amber: '#FFECB3',
    orange: '#FFE0B2',
    deepOrange: '#FFCCBC',
    brown: '#D7CCC8',
    grey: '#F5F5F5',
    blueGrey: '#CFD8DC'
};

const colors50 = {
    red: '#FFEBEE',
    pink: '#FCE4EC',
    purple: '#F3E5F5',
    deepPurple: '#EDE7F6',
    indigo: '#E8EAF6',
    blue: '#E3F2FD',
    lightBlue: '#E1F5FE',
    cyan: '#E0F7FA',
    teal: '#E0F2F1',
    green: '#E8F5E9',
    lightGreen: '#F1F8E9',
    lime: '#F9FBE7',
    yellow: '#FFFDE7',
    amber: '#FFF8E1',
    orange: '#FFF3E0',
    deepOrange: '#FBE9E7',
    brown: '#EFEBE9',
    grey: '#FAFAFA',
    blueGrey: '#ECEFF1'
};

export default {
    colors,
    hintColors,
    about: {
        title: {
            fontWeight: 'bold',
            fontSize: 24
        },
        view: {
            padding: 10
        },
        content: {
            marginTop: 5
        }
    },
    demo: {
        title: {
            fontWeight: 'bold',
            fontSize: 24,
            color: colors.lightblue
        },
        labelStyle:{
            color:'black'
        },
        rootStyle:{
            marginVertical: 5,
            height: 64,
        },
        inputStyle:{
            color: 'black',
        },
        view: {
            padding: 10,
            backgroundColor: colors.backgroundGrey,
            flex: 1
        },
        content: {
            marginTop: 20
        }
    },
    stackNavigator: {
        headerStyle: {
            // marginTop: 0,
            paddingTop: (Platform.OS === "android") ? StatusBar.currentHeight : 0,
            backgroundColor: colors.green,
            // height: 80
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
        searchInputView: {
            flex: 0
        },
        searchInput: {
            height: 40,
            paddingLeft: 5,
            color: 'white'
        },
        sectionList: {
            flex: 0
        },
        sections: [
            {backgroundColor: colors50.deepOrange},
            {backgroundColor: colors50.pink},
            {backgroundColor: colors50.lightBlue},
            {backgroundColor: colors50.blueGrey},
            {backgroundColor: colors50.green},
            {backgroundColor: colors50.purple}
        ],
        sectionHeaders: [
            {backgroundColor: colors200.deepOrange},
            {backgroundColor: colors200.pink},
            {backgroundColor: colors200.lightBlue},
            {backgroundColor: colors200.blueGrey},
            {backgroundColor: colors200.green},
            {backgroundColor: colors200.purple}
        ],
        homeView: {
            flex: 1,
            backgroundColor: 'transparent',
        },
        view: {
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderBottomColor: colors.gray,
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'space-between',
        },
        sectionHeaderView: {
            backgroundColor: 'white',
            height: 40,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignContent: 'center',
            borderBottomColor: colors.gray,
            shadowOpacity: 0.5,
            shadowColor: '#666',
            shadowOffset: {
                width: 0,
                height: 3
            },
        },
        sectionHeaderTitle: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white'
        }
    },
    weekView: {
        dayTitle: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold'
        }
    },
    schedule: {
        course: {
            hours: {
                borderRightWidth: 5,
                borderColor: colors.lightblue,
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                paddingLeft: 2,
                paddingRight: 4,
                marginLeft: 1,
                paddingVertical: 5
            },
            hoursText: {
                fontWeight: 'bold'
            },
            contentBlock: {
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'column',
                marginLeft: 5,
                paddingVertical: 5
            },
            row: {
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: '#EEEEEE',
                borderWidth: 0,
                borderColor: colors.darkblue,
                paddingVertical: 5,
                marginHorizontal: 15,
                marginVertical: 2
            },
            noCourse: {
                paddingVertical: 10,
                marginVertical: 2,
                justifyContent: 'space-between'
            },
            noCourseText: {
                fontStyle: 'italic',
                textAlign: 'center',
                color: '#5d5d5d',
                fontWeight: 'bold'
            },
            title: {
                paddingTop: 0,
                paddingBottom: 5,
                textAlign: 'center',
                fontWeight: 'bold'
            },
            header: {
                flexDirection: 'column'
            },
            container: {
                flex: 1,
                flexDirection: 'column'
            },
            content: {
                color: colors.darkred,
                flex: 1,
                flexWrap: 'wrap'
            },
            line: {
                flexDirection: 'row',
                justifyContent: 'flex-start'
            },
            centeredLine: {
                flexDirection: 'row',
                justifyContent: 'center'
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
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: "stretch",
            alignItems: 'center'
        },
        contentView: {
            flex: 10,
            alignSelf: "stretch"
        },
        titleTextView: {
            flex: 5,
            alignSelf: "stretch",
            justifyContent: 'center'
        },
        titleText: {
            fontSize: 25,
            textAlign: 'center',
            paddingVertical: 10
        },
        error: {
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold'
        }
    }
};