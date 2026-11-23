import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import './css/Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    ['/#beranda', 'Beranda'],
    ['/#kenapa', 'Kenapa Kami'],
    ['/#menu', 'Menu'],
    ['/#cara-pesan', 'Cara Pesan'],
    ['/#testimoni', 'Testimoni'],
  ]
  // admin hanya perlu Beranda & Menu, sisanya fokus ke menu admin
  const publicLinks = isAdmin
    ? links.filter(([to]) => ['/#beranda', '/#menu'].includes(to))
    : links

  const close = () => setMenuOpen(false)
  const handleLogout = () => {
    logout()
    close()
    navigate('/')
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/#beranda" className="logo">
          <span className="logo-badge">R</span>
          Rispicy Risol<span className="logo-dot">.</span>
        </Link>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {publicLinks.map(([to, label]) => (
            <Link key={to} to={to} onClick={close}>
              {label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin/riwayat" onClick={close}>
              Riwayat Penjualan
            </Link>
          )}
          <Link to="/pesan" className="nav-cta" onClick={close}>
            {isAdmin ? 'Input Penjualan' : 'Pesan Sekarang'}
          </Link>
          {user && (
            <button className="nav-logout" onClick={handleLogout}>Keluar</button>
          )}
        </nav>

        <div className="navbar-actions">
          {user ? (
            <>
              <div className={`user-chip ${isAdmin ? 'admin' : ''}`}>
                <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
                <span className="user-meta">
                  <span className="user-name">{user.name.split(' ')[0]}</span>
                  <small>{user.role}</small>
                </span>
              </div>
              <button className="auth-btn logout-desktop" onClick={handleLogout}>Keluar</button>
            </>
          ) : (
            <Link to="/login" className="auth-btn">Masuk</Link>
          )}
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