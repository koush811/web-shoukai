import { useEffect } from 'react'

const DEFAULT_SETTINGS = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
}

const useCanvasCursor = (canvasRef, containerRef) => {
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current

    if (!canvas || !container) {
      return undefined
    }

    const context = canvas.getContext('2d')

    if (!context) {
      return undefined
    }

    let animationId = null
    let isRunning = true
    let colorValue = 0

    const pos = { x: 0, y: 0 }
    let lines = []

    function Oscillator(options) {
      this.init(options || {})
    }

    Oscillator.prototype = {
      init(options) {
        this.phase = options.phase || 0
        this.offset = options.offset || 0
        this.frequency = options.frequency || 0.001
        this.amplitude = options.amplitude || 1
      },
      update() {
        this.phase += this.frequency
        colorValue = this.offset + Math.sin(this.phase) * this.amplitude
        return colorValue
      },
      value() {
        return colorValue
      },
    }

    function Node() {
      this.x = 0
      this.y = 0
      this.vy = 0
      this.vx = 0
    }

    function Line(options) {
      this.init(options || {})
    }

    Line.prototype = {
      init(options) {
        this.spring = options.spring + 0.1 * Math.random() - 0.02
        this.friction = DEFAULT_SETTINGS.friction + 0.01 * Math.random() - 0.002
        this.nodes = []

        for (let index = 0; index < DEFAULT_SETTINGS.size; index += 1) {
          const node = new Node()
          node.x = pos.x
          node.y = pos.y
          this.nodes.push(node)
        }
      },
      update() {
        let spring = this.spring
        let node = this.nodes[0]

        node.vx += (pos.x - node.x) * spring
        node.vy += (pos.y - node.y) * spring

        for (let index = 0; index < this.nodes.length; index += 1) {
          node = this.nodes[index]

          if (index > 0) {
            const previous = this.nodes[index - 1]
            node.vx += (previous.x - node.x) * spring
            node.vy += (previous.y - node.y) * spring
            node.vx += previous.vx * DEFAULT_SETTINGS.dampening
            node.vy += previous.vy * DEFAULT_SETTINGS.dampening
          }

          node.vx *= this.friction
          node.vy *= this.friction
          node.x += node.vx
          node.y += node.vy
          spring *= DEFAULT_SETTINGS.tension
        }
      },
      draw() {
        let current = this.nodes[0]
        let next = this.nodes[1]
        let x = this.nodes[0].x
        let y = this.nodes[0].y

        context.beginPath()
        context.moveTo(x, y)

        for (let index = 1; index < this.nodes.length - 2; index += 1) {
          current = this.nodes[index]
          next = this.nodes[index + 1]
          x = 0.5 * (current.x + next.x)
          y = 0.5 * (current.y + next.y)
          context.quadraticCurveTo(current.x, current.y, x, y)
        }

        current = this.nodes[this.nodes.length - 2]
        next = this.nodes[this.nodes.length - 1]
        context.quadraticCurveTo(current.x, current.y, next.x, next.y)
        context.stroke()
        context.closePath()
      },
    }

    const hue = new Oscillator({
      phase: Math.random() * Math.PI * 2,
      amplitude: 45,
      frequency: 0.0015,
      offset: 200,
    })

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    const setPosition = (event) => {
      const rect = container.getBoundingClientRect()

      if (event.touches && event.touches[0]) {
        pos.x = event.touches[0].clientX - rect.left
        pos.y = event.touches[0].clientY - rect.top
        return
      }

      pos.x = event.clientX - rect.left
      pos.y = event.clientY - rect.top
    }

    const resetLines = () => {
      lines = []

      for (let index = 0; index < DEFAULT_SETTINGS.trails; index += 1) {
        lines.push(new Line({ spring: 0.4 + (index / DEFAULT_SETTINGS.trails) * 0.025 }))
      }
    }

    const render = () => {
      if (!isRunning) {
        return
      }

      context.globalCompositeOperation = 'source-over'
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.globalCompositeOperation = 'lighter'
      context.strokeStyle = `hsla(${Math.round(hue.update())}, 70%, 62%, 0.22)`
      context.lineWidth = 1

      lines.forEach((line) => {
        line.update()
        line.draw()
      })

      animationId = window.requestAnimationFrame(render)
    }

    const handleMouseMove = (event) => {
      setPosition(event)
    }

    const handleTouchMove = (event) => {
      setPosition(event)
      event.preventDefault()
    }

    const handlePointerEnter = (event) => {
      setPosition(event)
      resetLines()
    }

    const handleWindowFocus = () => {
      if (!isRunning) {
        isRunning = true
        render()
      }
    }

    const handleWindowBlur = () => {
      isRunning = false
    }

    resizeCanvas()
    pos.x = canvas.width / 2
    pos.y = canvas.height / 2
    resetLines()
    render()

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handlePointerEnter)
    container.addEventListener('touchstart', handlePointerEnter, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('focus', handleWindowFocus)
    window.addEventListener('blur', handleWindowBlur)

    return () => {
      isRunning = false

      if (animationId) {
        window.cancelAnimationFrame(animationId)
      }

      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handlePointerEnter)
      container.removeEventListener('touchstart', handlePointerEnter)
      container.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('focus', handleWindowFocus)
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [canvasRef, containerRef])
}

export default useCanvasCursor
