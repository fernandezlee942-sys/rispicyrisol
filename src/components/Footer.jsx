import { WA_NUMBER } from './products'
import './css/Footer.css'
import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta reveal">
        <h2>Laper? Jangan Ditahan 😋</h2>
        <p>Risol hangat dan renyah cuma sejauh satu chat. Pesan sekarang, 30 menit lagi udah bisa kamu makan.</p>
        <a
          className="btn btn-primary"
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Rispicy Risol! Saya mau pesan risol.')}`}
          target="_blank"
          rel="noreferrer"
        >
          Pesan via WhatsApp 💬
        </a>
      </div>

      <div className="footer-inner">
        <div className="footer-col">
          <Link to="/#beranda" className="logo footer-logo">
            <span className="logo-badge">R</span>
            Rispicy Risol<span className="logo-dot">.</span>
          </Link>
          <p>Risol premium homemade — renyah di luar, lumer di dalam. Dibuat fresh setiap hari dari dapur kami untuk kamu.</p>
        </div>
        <div className="footer-col">
          <h4>Navigasi</h4>
          <Link to="/#kenapa">Kenapa Kami</Link>
          <Link to="/#menu">Menu</Link>
          <Link to="/#cara-pesan">Cara Pesan</Link>
          <Link to="/#testimoni">Testimoni</Link>
          <Link to="/#faq">FAQ</Link>
        </div>
        <div className="footer-col">
          <h4>Jam Buka</h4>
          <p>Senin – Minggu · 11.00 – 21.00</p>
          <p>Pre-order acara: H-1</p>
        </div>
        <div className="footer-col">
          <h4>Kontak</h4>
          <p>📍 Jl. Dr. Mansyur depan ATM BNI Metro Swalayan USU</p>
          <p>📱 0812-3456-7890</p>
          <p>📸 @rispicyrisol.id</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Rispicy Risol. Dibuat dengan ❤️ dan banyak tepung panir.
      </div>
    </footer>
  )
}
