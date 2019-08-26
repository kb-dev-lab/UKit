import style from '../Style';

export default ({ title, headerLeft, themeName }) => ({
    title,
    headerLeft,
    headerStyle: {
        backgroundColor: style.Theme[themeName].primary,
    },
    headerTintColor: '#FFFFFF',
});
