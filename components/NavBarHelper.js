import style from '../Style';

export default ({ title, headerLeft, headerRight, themeName }) => ({
    title,
    headerLeft,
    headerRight,
    headerStyle: {
        backgroundColor: style.Theme[themeName].primary,
        borderBottomColor: 'transparent',
    },
    headerTintColor: style.Theme[themeName].lightFont,
});
