/**
 * throttle (节流)
 *
 * 结合时间戳与定时器的实现
 *
 * @param {Function} func 目标执行函数
 * @param {Number} wait 节流间隔时间
 * @param {Object} option 头尾函数是否执行选项对象
 * @option.leading {Boolean} true -> 第一次就执行
 * @option.trailing {Boolean} true -> 最后一次执行
 * */

function throttle(func, wait, option = {}) {
    let context, args, timeout
    let previous = 0

    const late = function () {
        previous = option.leading === false ? 0 : +new Date()
        timeout = null
        func.apply(context, args)
        if (!timeout) context = args = null
    }


    const throttled = function () {
        context = this
        args = arguments
        const now = +new Date()
        const {leading, trailing} = option
        if (!previous && !leading) previous = now

        const remaining = wait - (now - previous)

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            func.apply(context, args)
            if (!timeout) context = args = null
        } else if (!timeout && trailing) {
            timeout = setTimeout(late, remaining)
        }

    }

    return throttled
}

/**
 * 时间戳实现
 * @param {Function} func 执行的目标函数
 * @param {Number} wait 节流间隔时间
 * 闭包保存上次执行的时间
 * 下一次执行的时候比较此时时间戳和之前的时间戳
 * 大于设定间隔就执行目标函数
 *
 * 事件开始的时候立即执行，结束停止触发没有再次执行事件
 * */
function throttle1(func, wait) {
    let context, args
    let previous = 0
    const throttled = function () {
        context = this
        args = arguments
        let now = +new Date()
        if (now - previous > wait) {
            func.apply(context, args)
            previous = now
        }
    }

    return throttled
}

/**
 * 定时器实现
 * @param {Function} func 执行的目标函数
 * @param {Number} wait 节流间隔时间
 *
 * 在 wait 时间过后才执行第一次
 * 停止触发后会再次执行一次函数
 * */

function throttle2 (func, wait) {
    let context, args
    let timeout

    const throttled = function () {
        if (!timeout) {
            context = this
            args = arguments
            timeout = setTimeout(function () {
                timeout = null
                func.apply(context, args)
            }, wait)
        }
    }

    return throttled
}
