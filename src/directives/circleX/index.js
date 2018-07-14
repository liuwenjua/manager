import {
    throttle
} from '@/services/utils'

class Circle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.r = Math.random() * 15
        this._mx = Math.random()
        this._my = Math.random()
    }

    drawCircle(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 360)
        ctx.closePath()
        ctx.fillStyle = 'rgba(204, 204, 204, 0.3)'
        ctx.fill()
    }

    drawLine(ctx, _circle) {
        let dx = this.x - _circle.x
        let dy = this.y - _circle.y
        let d = Math.sqrt(dx * dx + dy * dy)
        if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(_circle.x, _circle.y)
            ctx.closePath()
            ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)'
            ctx.stroke()
        }
    }

    move(w, h) {
        this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx)
        this._my = (this.y < h && this.y > 0) ? this._my : (-this._my)
        this.x += this._mx / 2
        this.y += this._my / 2
    }
}

class CurrentCirle extends Circle {
    drawCircle(ctx) {
        ctx.beginPath()
        this.r = 12
        ctx.arc(this.x, this.y, this.r, 0, 360)
        ctx.closePath()
        ctx.fillStyle = 'rgba(32, 160, 255, 1)'
        ctx.fill()
    }
}

const __WINDOW_EVENTS = {}
const addWindowEvents = function(eventName, callback) {
    __WINDOW_EVENTS[eventName] = callback
    window.addEventListener(eventName, callback, false)
}

export default {
    inserted: function(el, binding, vnode) {
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
        window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
        let canvas = el
        let ctx = canvas.getContext('2d')
        let w = canvas.width = canvas.offsetWidth
        let h = canvas.height = canvas.offsetHeight
        let circles = []
        let cc = new CurrentCirle(0, 0)
        let stop

        const draw = function() {
            ctx.clearRect(0, 0, w, h)
            for (let i = 0, len = circles.length; i < len; i++) {
                circles[i].move(w, h)
                circles[i].drawCircle(ctx)
                for (let j = i + 1, lenj = circles.length; j < lenj; j++) {
                    circles[i].drawLine(ctx, circles[j])
                }
            }
            if (cc.x) {
                cc.drawCircle(ctx)
                for (let k = 1; k < circles.length; k++) {
                    cc.drawLine(ctx, circles[k])
                }
            }
            stop = requestAnimationFrame(draw)
        }

        const init = function(num) {
            for (let i = 0; i < num; i++) {
                circles.push(new Circle(Math.random() * w, Math.random() * h))
            }
            draw()
        }
        addWindowEvents('mousemove', function(e) {
            e = e || window.event
            cc.x = e.clientX
            cc.y = e.clientY
        })
        addWindowEvents('mouseout', function(e) {
            cc.x = null
            cc.y = null
        })
        addWindowEvents('resize', throttle(function(e) {
            cancelAnimationFrame(stop)
            ctx.clearRect(0, 0, w, h)
            w = canvas.width = canvas.offsetWidth
            h = canvas.height = canvas.offsetHeight
            draw()
        }, 500))
        init(binding.value)
    },
    unbind: function(el) {
        const evts = Object.keys(__WINDOW_EVENTS)
        for (let k of evts) {
            window.removeEventListener(k, __WINDOW_EVENTS[k], false)
        }
    }
}
