const util = require('./util')
const {swap, getArr} = util

let bubbleSort = (arr) => {
    let len = arr.length
    for(let i = len; i >= 2; i--) {
        for(let k = 0; k < i; k++) {
            if (arr[k] > arr[k+1]) {
                swap(arr, k, k+1)
            }
        }
    }
    return arr
}

module.exports = bubbleSort
