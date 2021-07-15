const locations = require('../assets/locations.json');

function upperCaseFirstLetter(string) {
    let firstLetter = string[0].toUpperCase();
    return firstLetter + string.substr(1);
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

function getLocation(house) {
    if (locations[house]) {
        return { title: house, ...locations[house] };
    }
    return null;
}

function getLocations(str) {
    let lines = str.split(' | ');

    let locations = [];

    lines.forEach((line) => {
        let house = line.split('/')[0];
        let cleanHouseName = house.replace(' ', '');
        let location = getLocation(cleanHouseName);
        if (location) {
            locations.push(location);
        }
    });

    return locations;
}

function getLocationsInText(str) {
    let regexBuilding = RegExp('([A-Z][0-9]+)', 'im');
    let match = regexBuilding.exec(str);

    let location = null;
    if (match && match.length === 2) {
        location = getLocation(match[1]);
    }
    if (location === null) {
        return [];
    }
    return [location];
}

export { upperCaseFirstLetter, isArraysEquals, getLocations, getLocationsInText };
