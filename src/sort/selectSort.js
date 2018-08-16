const util = require('./util')
const {swap} = util

module.exports = selectSort = function (arr) {
    for(let i = 0; i < arr.length - 1; i++) {
        for(let k = i; k < arr.length; k++) {
            if(arr[k] < arr[i]) {
                swap(arr, k, i)
            }
        }
    }
    return arr
}