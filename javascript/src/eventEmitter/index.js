class EventEmitter {
    constructor() {
        this.listeners = {}
        this.addEventListener = this.on
        this.removeEventListener = this.off
    }
    on (event, callback) {
        if(!this.listeners[event]) {
            this.listeners[event] = [callback]
        } else {
            this.listeners[event].push(callback)
        }
    }
    emit (...args) {
        const [event, ...extraArgs] = args
        if(!event) return
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback.call(this, ...extraArgs))
        }
    }
    off (event, callback) {
        if(!event) return 
        if(this.listeners[event]) {
            const index = this.listeners[event].indexOf(callback)
            if(index > -1) {
                this.listeners[event].splice(index, 1)
            }
        }
    }
    once (event, callback) {
        const temp = (...args) => {
            callback.call(this, ...args)
            this.off(event, temp)
        }
        this.on(event, temp)
    }
}