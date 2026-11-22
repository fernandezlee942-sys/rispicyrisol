import { useEffect, useState } from 'react'
import { testimonials } from './products'
import './css/Testimonials.css'

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 4500)
    return () => clearInterval(t)
  }, [])

  const item = testimonials[index]

  return (
    <section id="testimoni" className="section testi-section">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">Testimoni</span>
          <h2>Kata Mereka yang Udah Coba</h2>
        </div>
        <div className="testi-card reveal" key={index}>
          <div className="testi-stars">{'⭐'.repeat(item.stars)}</div>
          <p className="testi-text">“{item.text}”</p>
          <div className="testi-person">
            <span className="testi-avatar">{item.name.trim()[0]}</span>
            <div>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </div>
          </div>
        </div>
        <div className="testi-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testi-dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Testimoni ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
