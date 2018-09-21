import { StatusBar } from 'react-native';

function upperCaseFirstLetter(string) {
    let firstLetter = string[0].toUpperCase();
    return firstLetter + string.substr(1);
}

function setStatusBar(navigation) {
    navigation.addListener('willFocus', () => {
        StatusBar.setBarStyle('light-content');
    });
    navigation.addListener('didFocus', () => {
        StatusBar.setBarStyle('light-content');
    });
    navigation.addListener('willBlur', () => {
        StatusBar.setBarStyle('light-content');
    });
    navigation.addListener('didBlur', () => {
        StatusBar.setBarStyle('light-content');
    });
}

export { upperCaseFirstLetter, setStatusBar };
