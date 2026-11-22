import { WA_NUMBER } from './products'
import './css/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta reveal">
        <h2>Laper? Jangan Ditahan 😋</h2>
        <p>Risol hangat dan renyah cuma sejauh satu chat. Pesan sekarang, 30 menit lagi udah bisa kamu makan.</p>
        <a
          className="btn btn-primary"
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Risolle! Saya mau pesan risol.')}`}
          target="_blank"
          rel="noreferrer"
        >
          Pesan via WhatsApp 💬
        </a>
      </div>

      <div className="footer-inner">
        <div className="footer-col">
          <a href="#beranda" className="logo footer-logo">
            <span className="logo-badge">R</span>
            Risolle<span className="logo-dot">.</span>
          </a>
          <p>Risol premium homemade — renyah di luar, lumer di dalam. Dibuat fresh setiap hari dari dapur kami untuk kamu.</p>
        </div>
        <div className="footer-col">
          <h4>Navigasi</h4>
          <a href="#kenapa">Kenapa Kami</a>
          <a href="#menu">Menu</a>
          <a href="#cara-pesan">Cara Pesan</a>
          <a href="#testimoni">Testimoni</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="footer-col">
          <h4>Jam Buka</h4>
          <p>Senin – Jumat · 08.00 – 20.00</p>
          <p>Sabtu – Minggu · 09.00 – 21.00</p>
          <p>Pre-order acara: H-1</p>
        </div>
        <div className="footer-col">
          <h4>Kontak</h4>
          <p>📍 Jl. Cemara No. 12, Jakarta</p>
          <p>📱 0812-3456-7890</p>
          <p>📸 @risolle.id</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Risolle. Dibuat dengan ❤️ dan banyak tepung panir.
      </div>
    </footer>
  )
}
