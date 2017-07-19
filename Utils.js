function upperCaseFirstLetter(string){
    let firstLetter = string[0].toUpperCase();
    return firstLetter + string.substr(1);
}

export {upperCaseFirstLetter};