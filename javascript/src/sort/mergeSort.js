const util = require('./util')
const {swap} = util

module.exports = mergeSort = function (arr) {
    sort(arr, 0, arr.length - 1)
    return arr
}

function sort (arr, left, right) {
    if (left >= right) return
    let middle = ~~((right - left) / 2) + left
    sort(arr, left, middle)
    sort(arr, middle + 1, right)
    merge(arr, left, middle, right)
}

function merge (arr, left, middle, right) {
    // 新创建的一个临时数组
    let temp = []
    // 合并的时候，右半边开始的索引
    let r1 = middle + 1
    // 实际变化的 index，控制 temp
    let tIndex = left
    // 只是拿来从temp那里拷贝到arr中去
    let cIndex = left

    while(left <= middle && r1 <= right) {
        if(arr[left] <= arr[r1]) {
            temp[tIndex++] = arr[left++]
        } else {
            temp[tIndex++] = arr[r1++]
        }
    }

    // 一边完全合并结束之后，剩下一边得追加进来

    // 追加左边
    while(left <= middle) {
        temp[tIndex++] = arr[left++]
    }
    
    // 追加右边
    while(r1 <= right) {
        temp[tIndex++] = arr[r1++]
    }

    // 从temp中，重新把数据还给arr
    while(cIndex <= right) {
        arr[cIndex] = temp[cIndex] 
        cIndex++
    }
}