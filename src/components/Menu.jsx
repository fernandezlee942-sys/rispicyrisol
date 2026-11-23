import { useState } from 'react'
import { products, formatIDR } from './products'
import ProductCard from './ProductCard'
import './css/Menu.css'

const filters = [
  ['semua', 'Semua'],
  ['gurih', 'Gurih'],
  ['pedas', 'Pedas'],
  ['manis', 'Manis'],
]

export default function Menu() {
  const [filter, setFilter] = useState('semua')

  const match = (p) => filter === 'semua' || p.category === filter
  const featured = products.filter((p) => p.img && match(p))
  const others = products.filter((p) => !p.img && match(p))

  return (
    <section id="menu" className="section menu-section">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">Menu Kami</span>
          <h2>Pilih Risol Favoritmu</h2>
          <p>cocok buat camilan kantor, arisan, atau acara besar.</p>
        </div>

        <div className="menu-filters reveal">
          {filters.map(([key, label]) => (
            <button
              key={key}
              className={`filter-btn ${filter === key ? 'active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {featured.length > 0 && (
          <div className="menu-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {others.length > 0 && (
          <div className="variant-list reveal">
            <h3 className="variant-title">Varian Lainnya</h3>
            {others.map((p) => (
              <div key={p.id} className="variant-row">
                <div className="variant-info">
                  <strong>{p.name}</strong>
                  <span className="variant-badge">{p.tag}</span>
                  <p>{p.desc}</p>
                </div>
                <div className="variant-side">
                  <span className="variant-price">{formatIDR(p.price)}<small>/pcs</small></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {featured.length === 0 && others.length === 0 && (
          <p className="menu-empty">Belum ada menu di kategori ini 🙏</p>
        )}
      </div>
    </section>
  )
}