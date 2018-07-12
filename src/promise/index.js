const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

global.Promise = null

class Promise {
    constructor (excutor) {
        this.status = PENDING
        this.value = void 0
        this.reason = void 0
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []
        const resolve = value => {
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }

            setTimeout(() => {
                if (this.status === PENDING) {
                    this.status = FULFILLED
                    this.value = value
                    this.onFulfilledCallbacks.forEach(cb => cb(this.value))
                }
            })
        }
        const reject = reason => {
            setTimeout(() => {
                if (this.status === PENDING) {
                    this.status = REJECTED
                    this.reason = reason
                    this.onRejectedCallbacks.forEach(cb => cb(this.reason))
                }
            })
        }

        try {
            excutor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then (onFulfilled, onRejected) {
        onFulfilled =
            typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected =
            typeof onRejected === 'function' ? onRejected : reason => {throw reason}

        let newPromise

        if (this.status === FULFILLED) {
            return newPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(newPromise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }
        if (this.status === REJECTED) {
            return newPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(newPromise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }
        if (this.status === PENDING) {
            return newPromise = new Promise((resolve, reject) => {
                this.onFulfilledCallbacks.push(value => {
                    try {
                        let x = onFulfilled(value)
                        resolvePromise(newPromise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRejectedCallbacks.push(reason => {
                    try {
                        let x = onRejected(reason)
                        resolvePromise(newPromise, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            })
        }
    }

    catch (onRejected) {
        return this.then(null, onRejected)
    }

    resolve (value) {
        return new Promise(resolve => resolve(value))
    }

    reject (reason) {
        return new Promise((_, reject) => {
            reject(reason)
        })
    }

    static all (promises) {
        return new Promise((resolve, reject) => {
            let done = gen(promises.length, resolve)
            promises.forEach((promise, index) => {
                promise.then(value => {
                    done(index, value)
                }, reject)
            })
        })
    }
    static race (promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(resolve, reject)
            })
        })
    }
}

function gen(length, resolve) {
    let count = 0
    let values = []
    return function (i, value) {
        values[i] = value
        if (++count === length) {
            console.log(values)
            resolve(values)
        }
    }
}

function resolvePromise (promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError("循环引用"))
    }
    let called = false
    if (x instanceof Promise) {
        if (x.status === PENDING) {
            x.then(y => {
                resolvePromise(promise2, y, resolve, reject)
            }, reason => {
                reject(reason)
            })
        } else {
            x.then(resolve, reject)
        }
    } else if (x !== null && ((typeof x === 'object') || (typeof x === 'function'))) {
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, reason => {
                    if (called) return
                    called = true
                    reject(reason)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

export default Promise
