//const path = require('path');

export const getURILocation = (history: Array<string>): string => {
    return encodeURI(history.join('/').replace('//', '/'));
    //return encodeURI(path.join(...history))
}