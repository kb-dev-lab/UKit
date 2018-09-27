import { Constants } from 'expo';

const colors = {
    red: '',
    white: '#FFF',
    green: '#4CAF50',
    gray: '#454545',
    lightblue: '#40C4FF',
    blue: '#006F9F',
    darkblue: '#0D47A1',
    darkred: '#D50000',
    backgroundGrey: '#E9E9EF',
};

const hintColors = {
    green: '#55da59',
    gray: '#9a9a9a',
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
    blueGrey: '#B0BEC5',
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
    blueGrey: '#CFD8DC',
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
    blueGrey: '#ECEFF1',
};

const Theme = {
    primary: '#009ee0',
    secondary: '#0098c5',
    light: {
        primary: '#009ee0',
        secondary: '#0098c5',
        selection: '#ededed',
        accentFont: 'darkred',
        font: '#202020',
        lightFont: '#F0F0F0',
        link: '#1565c0',
        icon: '#757575',
        border: '#CCCCCC',
        background: '#ffffff',
        greyBackground: '#DDDDDD',
        field: '#ffffff',
        sections: [colors50.deepOrange, colors50.pink, colors50.lightBlue, colors50.blueGrey, colors50.green, colors50.purple],
        sectionsHeaders: [colors200.deepOrange, colors200.pink, colors200.lightBlue, colors200.blueGrey, colors200.green, colors200.purple],
        statusBar: '#006F9F',
        calendar: {
            sunday: '#CCCCCC',
            currentDay: '#EEEEEE',
            selection: '#009EE0',
        },
        settings: {
            title: '#282828',
            background: '#e9e9ef',
            section: '#FFF',
            sectionText: '#000',
            disabledOverlay: 'rgba(255,255,255,0.6)',
        },
        courses: {
            '#FFFFA8': {
                // TP
                // Lime
                background: '#e6ee9c',
                border: '#E65100',
                line: '#c0ca33',
            },
            '#A8FFFF': {
                // Cours
                // Cyan
                background: '#4dd0e1',
                border: '#006064',
                line: '#00acc1',
            },
            '#D3A8BE': {
                // Blue grey
                background: '#b0bec5',
                border: '#1A237E',
                line: '#546e7a',
            },
            '#D3A8A8': {
                // Red
                background: '#e57373',
                border: '#B71C1C',
                line: '#e53935',
            },
            '#D3A8FF': {
                // Oraux
                // Orange
                background: '#ffb74d',
                border: '#311B92',
                line: '#fb8c00',
            },
            '#A8FFA8': {
                // TD
                // Green
                background: '#81c784',
                border: '#004D40',
                line: '#43a047',
            },
            '#BEA8D3': {
                // Indigo
                background: '#7986cb',
                border: '#4A148C',
                line: '#3949ab',
            },
            default: {
                // Indigo
                background: '#7986cb',
                border: '#4A148C',
                line: '#3949ab',
            },
        },
    },
    dark: {
        primary: '#000030',
        secondary: '#0098c5',
        selection: '#009EE0',
        accentFont: '#f9fbe7',
        font: '#F0F0F0',
        link: '#4fc3f7',
        lightFont: '#F0F0F0',
        icon: '#009EE0',
        border: '#666666',
        background: '#000030',
        greyBackground: '#000030',
        field: '#000030',
        sections: ['#002f6c', '#003300', '#000051', '#bc5100', '#7f0000', '#00251a'],
        sectionsHeaders: ['#01579b', '#1b5e20', '#1a237e', '#f57f17', '#b71c1c', '#004d40'],
        statusBar: '#000000',
        calendar: {
            sunday: '#444444',
            currentDay: '#555577',
            selection: '#009EE0',
        },
        settings: {
            title: '#FFF',
            background: '#000030',
            section: '#282828',
            sectionText: '#FFF',
            disabledOverlay: 'transparent',
        },
        courses: {
            '#FFFFA8': {
                // TP
                // Lime
                background: '#7c8500',
                border: '#B71C1C',
                line: '#b4a647',
            },
            '#A8FFFF': {
                // Cours
                // Cyan
                background: '#006064',
                border: '#006064',
                line: '#428e92',
            },
            '#D3A8BE': {
                // Blue grey
                background: '#37474f',
                border: '#1A237E',
                line: '#4f5b62',
            },
            '#D3A8A8': {
                // Red
                background: '#b71c1c',
                border: '#004D40',
                line: '#f05545',
            },
            '#D3A8FF': {
                // Oraux
                // Orange
                background: '#e65100',
                border: '#311B92',
                line: '#ff833a',
            },
            '#A8FFA8': {
                // TD
                // Green
                background: '#1b5e20',
                border: '#4A148C',
                line: '#4c8c4a',
            },
            '#BEA8D3': {
                // Indigo
                background: '#283593',
                border: '#E65100',
                line: '#534bae',
            },
            default: {
                // Indigo
                background: '#283593',
                border: '#E65100',
                line: '#534bae',
            },
        },
    },
};

export default {
    fonts: {
        default: {
            fontFamily: 'system',
        },
    },
    colors,
    hintColors,
    backButton: {
        paddingLeft: 16,
        paddingRight: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    about: {
        title: {
            fontWeight: 'bold',
            fontSize: 24,
        },
        view: {
            padding: 10,
        },
        content: {
            marginTop: 5,
            marginBottom: 15,
        },
    },
    demo: {
        titleView: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        title: {
            fontWeight: 'bold',
            fontSize: 32,
            color: Theme.primary,
        },
        labelStyle: {
            color: 'black',
        },
        rootStyle: {
            marginVertical: 10,
            height: 64,
        },
        inputStyle: {
            color: 'black',
        },
        view: {
            padding: 10,
            backgroundColor: colors.backgroundGrey,
            flex: 1,
        },
        content: {
            marginTop: 20,
        },
    },
    stackNavigator: {
        headerStyle: {
            backgroundColor: Theme.primary,
        },
        headerTitleStyle: {
            color: colors.white,
            marginBottom: 20,
            marginTop: 20,
            fontSize: 22,
        },
        headerBackTitleStyle: {
            color: colors.white,
        },
        headerTintColor: colors.white,
    },
    containerView: {
        margin: 20,
        marginTop: 30,
    },
    list: {
        searchInputView: {
            flex: 0,
        },
        searchInput: {
            height: 40,
            paddingLeft: 5,
            color: 'white',
        },
        sectionList: {
            flex: 0,
        },
        sections: [
            { backgroundColor: colors50.deepOrange },
            { backgroundColor: colors50.pink },
            { backgroundColor: colors50.lightBlue },
            { backgroundColor: colors50.blueGrey },
            { backgroundColor: colors50.green },
            { backgroundColor: colors50.purple },
        ],
        sectionHeaders: [
            { backgroundColor: colors200.deepOrange },
            { backgroundColor: colors200.pink },
            { backgroundColor: colors200.lightBlue },
            { backgroundColor: colors200.blueGrey },
            { backgroundColor: colors200.green },
            { backgroundColor: colors200.purple },
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
            borderRadius: 4,
            marginHorizontal: 8,
            marginTop: 8,
            shadowOpacity: 0.3,
            shadowColor: '#666',
            shadowOffset: {
                width: 0,
                height: 3,
            },
        },
        sectionHeaderTitle: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
        },
    },
    weekView: {
        dayTitle: {
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
        },
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
                marginLeft: 2,
                paddingVertical: 6,
                flex: 1,
                flexShrink: 0,
            },
            hoursText: {
                fontWeight: 'bold',
            },
            contentType: {
                alignSelf: 'stretch',
            },
            contentBlock: {
                flex: 6,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flexDirection: 'column',
                marginLeft: 8,
            },
            row: {
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: '#EEEEEE',
                borderWidth: 0,
                padding: 8,
                borderColor: colors.darkblue,
                marginHorizontal: 12,
            },
            noCourse: {
                paddingVertical: 10,
                justifyContent: 'space-between',
            },
            noCourseText: {
                fontStyle: 'italic',
                textAlign: 'center',
                color: '#5d5d5d',
                fontWeight: 'bold',
            },
            title: {
                paddingTop: 0,
                paddingBottom: 5,
                textAlign: 'center',
                fontWeight: 'bold',
            },
            header: {
                flexDirection: 'column',
            },
            container: {
                flexDirection: 'column',
            },
            content: {
                flex: 1,
                flexWrap: 'wrap',
            },
            line: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
            },
            centeredLine: {
                flexDirection: 'row',
                justifyContent: 'center',
            },
        },
        containerView: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        titleView: {
            justifyContent: 'center',
            flexDirection: 'row',
            alignSelf: 'stretch',
            alignItems: 'center',
        },
        contentView: {
            flex: 1,
            alignSelf: 'stretch',
        },
        titleText: {
            fontSize: 24,
            fontWeight: '600',
            textAlign: 'center',
            paddingVertical: 8,
        },
        error: {
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
        },
    },
    statusBar: {
        backgroundColor: Theme.primary,
        height: Constants.statusBarHeight,
    },
    dayView: {},
    calendarList: {
        itemSize: 64,
        header: 38,
    },
    settings: {
        actionsContainer: {
            borderTopColor: '#919191',
            borderTopWidth: 1,
            flexDirection: 'row',
            paddingVertical: 0,
            margin: 0,
            alignItems: 'stretch',
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        dialogContentView: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 4,
        },
        navigationBar: {
            borderBottomColor: '#b5b5b5',
            borderBottomWidth: 0.5,
            backgroundColor: '#ffffff',
        },
        navigationTitle: {
            padding: 10,
        },
        navigationButton: {
            padding: 10,
        },
        navigationLeftButton: {
            paddingLeft: 20,
            paddingRight: 40,
        },
        navigator: {
            flex: 1,
        },
        textInputContainer: {
            flex: 1,
            backgroundColor: '#FFFFFF',
            borderColor: colors.lightblue,
            borderWidth: 1,
            marginVertical: 4,
            marginHorizontal: 8,
            padding: 4,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            width: '100%',
        },
    },
    Theme,
};
