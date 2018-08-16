const getArr = (length = 100) => {
    return new Array(length).fill(0).map(_ => ~~(Math.random() * 100))
}

const swap = (arr, i, j) => {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

module.exports = {
    getArr,
    swap,
}