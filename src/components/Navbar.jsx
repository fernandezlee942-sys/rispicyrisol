import { useEffect, useState } from 'react'
import './css/Navbar.css'

export default function Navbar({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['#beranda', 'Beranda'],
    ['#kenapa', 'Kenapa Kami'],
    ['#menu', 'Menu'],
    ['#cara-pesan', 'Cara Pesan'],
    ['#testimoni', 'Testimoni'],
  ]

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#beranda" className="logo">
          <span className="logo-badge">R</span>
          Risolle<span className="logo-dot">.</span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a href="#menu" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Pesan Sekarang
          </a>
        </nav>

        <div className="navbar-actions">
          <button className="cart-btn" onClick={onCartClick} aria-label="Buka keranjang">
            🧺
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <button
            className="burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Buka menu navigasi"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
