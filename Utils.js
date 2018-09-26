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

/**
 *
 * @param a {array}
 * @param b {array}
 * @return boolean
 */
function isArraysEquals(a, b) {
    if (a.length !== b.length) {
        return false;
    } else {
        const iMax = a.length;
        let i = 0;
        for (; i < iMax; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
}

export { upperCaseFirstLetter, setStatusBar, isArraysEquals };
