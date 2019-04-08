const util = require('./util')
const {swap} = util

module.exports = insertSort = function (arr) {
    for(let i = 1; i < arr.length; i++) {
        const temp = arr[i]
        while(i >= 1 && arr[i - 1] > temp) {
            arr[i] = arr[i - 1]
            i --
        }
        arr[i] = temp

    }
    return arr
}