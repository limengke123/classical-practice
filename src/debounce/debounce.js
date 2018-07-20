/**
 * debounce (防抖)
 *
 * 疯狂地触发设置在防抖时间内的被防抖的函数,只会触发一次
 *
 * @param {Function} fn 需要被防抖的函数
 * @param {Number} wait 防抖时间
 * @param {Boolean} immediate 是否立即执行
 *
 * 假设点击时执行 debounce 包装的fn
 * immediate为true时,点击立即触发函数,但是最后一次计时器结束时,不执行函数
 * 反之,点击不会立即触发函数,最后一次计时器结束时,会执行一次计时器
 * */

function debounce (fn, wait, immediate) {
    let context, args, timeout, timestamp, result

    function late () {
        /**
         * 由于闭包,拿到 timestamp, 如果是非常频繁触发了函数, 这里的 timestamp 会不断刷新至最近的时间戳
         * */
        const last = new Date.now() - timestamp
        if (last < wait && wait >= 0) {
            /**
             * 计时器里时间间隔为什么设置为 wait - last ?
             * 可以这样想:
             * 假设设置 wait 为200ms, immediate 为 false
             * 假设0ms时候进入, timestamp此时为0ms, 同时开启定时器 -> if (!timeout) timeout = setTimeout(wait, 200)
             * 这时候过了 80ms 的时候, 再次触发函数,修改了 timestamp 为 80ms,并且计时器 timeout 已经存在了,不会新开一个计时器,
             * 按照防抖的要求,由于在 80ms 重新触发了函数了, 真正的函数执行时间应该被刷新到 80ms + 200ms(late) = 280ms 后才执行
             * 200ms到了的时候,执行 late 函数,这时候一比较, 拿到 last = 200ms - 80ms = 120ms
             * 所以重开一个定时器, 设置时间点为 200ms(wait) - 120ms(last) = 80ms
             * 这样就保障了在 当前时间是200ms的时候延迟80ms,也就是 280ms 的时候去执行函数, 保证了频繁触发刷新时间戳( timestamp )的时候,能够在给定的 wait 时间间隔执行
             * */
            timeout = setTimeout(late, wait - last)
        } else {
            /**
             * timeout 设为null, 表明已经完全结束了,一下次的执行就按最初流程执行
             * */
            timeout = null
            if (!immediate) {
                /**
                 * 如果想要既设置了 immediate 为 true, 又能在计时器结束之后再执行一次, 这里可以去掉这个 if 条件, 或者是多接受一个 flag 标志改变这里的判断
                 * */
                result = fn.apply(context, args)
            }
        }
    }

    const debounced = function () {
        context = this
        args = arguments
        /**
         * 这里的 timestamp 由于闭包的原因,在定时器中的函数 late 能够读取到这里的值,频繁触发该函数时,会频繁修改这个值
         * */
        timestamp = new Date.now()
        const callNow = immediate && !timeout
        if (!timeout) timeout = setTimeout(wait, late)
        if (callNow) {
            result = fn.apply(context, args)
            /**
             * 这里设置 context, args 为 null
             * 1. 进入这个分支,说明传入的 immediate 一定为 true
             * 2. 在定时器结束执行的 late 函数中,如果 immediate 为true时, 是一定不会执行 fn 函数的, 所以设置 context, args 为 null 对后续定时器中的代码没有影响
             * 3. context 和 args 由于闭包的原因,如果没有用的参数还是优先设为 null
             * */
            context = args = null
        }
        return result
    }

    return debounced
}
