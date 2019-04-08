/**
 * bind
 * call
 * apply
 * 均能改变函数执行时的 this 的指向
 * */


/**
 * call
 * @param {Object} context 函数调用时接受的 this
 * @param {...args} 剩余需要传入函数的参数
 * */


const isFunction = obj => typeof obj === 'function'

Function.prototype.myCall = function (context) {

    if (!isFunction(this)) throw new TypeError(`Function.prototype.myCall need type of Function`)

    context = context || window
    context.fn = this

    // 拿到剩余参数
    const args = [...arguments].slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myApply = function (context) {

    if (!isFunction(this)) throw new TypeError(`Function.prototype.myCall need type of Function`)

    context = context || window
    context.fn = this

    let result
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}


/**
 * bind
 * @param {Object} context 绑定的 this
 * @return {Function} fbound 绑定 context 后的函数
 * */
Function.prototype.bind = function (context) {

    if (!isFunction(this)) throw new TypeError(`Function.prototype.myCall need type of Function`)

    const self = this
    const args = Array.prototype.slice.call(arguments, 1)
    /**
     * fNOP 解决 bind 后，使用改函数做为构造函数的问题
     *
     * */
    const fNOP = function () {}

    const fbound = function () {
        /**
         * 这里的参数分为两部分
         * 1. 外层bind的时候，传入 context 的同时，又传入了其他参数
         * 2. 返回 fbound 函数，真正调用时再传入的参数
         * */
        self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)))
    }

    fNOP.prototype = this.prototype

    fbound.prototype = new fNOP()

    return fbound
}




