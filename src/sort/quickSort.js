const swap = (arr, a, b) => {
    [arr[a], arr[b]] = [arr[b], arr[a]]
}

const compare = (a, b) => a === b
    ? 0
    : a < b
        ? -1
        : 1

const partition = (arr, left, right) => {
    const pivot = arr[Math.floor((right + left) / 2)]
    let i = left
    let j = right
    while (i <= j) {
        while (compare(arr[i], pivot) === -1) {
            i++
        }
        while (compare(arr[j], pivot) === 1) {
            j--
        }
        if (i <= j) {
            swap(arr, i, j)
            i++
            j--
        }
    }
    return i
}

/**
 * 分治策略
 * */
const quick = (arr, left, right) => {
    let index
    /**
     * 递归中止条件
     * */
    if (arr.length > 1) {
        index = partition(arr, left, right)
        if (left < index - 1) {
            quick(arr, left, index - 1)
        }
        if (index < right) {
            quick(arr, index, right)
        }
    }
    return arr
}

/**
 * quickSort 快排
 * @param {Array} arr 排序数组
 * */
const quickSort = (arr)=> {
    return quick(arr, 0, arr.length - 1)
}


