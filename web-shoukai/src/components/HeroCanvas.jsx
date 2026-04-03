import { useRef } from 'react'
import useCanvasCursor from './useCanvasCursor'
import './HeroCanvas.css'


function HeroCanvas({ title }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useCanvasCursor(canvasRef, containerRef)

  return (
    <div className="hero" ref={containerRef}>
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />
      <h1 className='cursDef'>{title}</h1>
      <p className="hero-subtitle cursDef">STEM研究部 Web班</p>
    </div>
  )
}

export default HeroCanvas
