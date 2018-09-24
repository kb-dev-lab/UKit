import { StatusBar } from 'react-native';

function upperCaseFirstLetter(string) {
    let firstLetter = string[0].toUpperCase();
    return firstLetter + string.substr(1);
}

function setStatusBar(navigation) {
    return;
}

export { upperCaseFirstLetter, setStatusBar };
