import heroImg from '../assets/hero.jpg'
import './css/Hero.css'

export default function Hero() {
  return (
    <section id="beranda" className="hero">
      <div className="hero-blob blob-1" />
      <div className="hero-blob blob-2" />
      <div className="hero-inner">
        <div className="hero-text">
          <span className="hero-badge">🥟 Homemade — digoreng fresh setiap hari</span>
          <h1>
            Renyah di Luar,
            <span className="hero-highlight"> Lumer</span> di Dalam.
          </h1>
          <p>
            Risol premium dengan kulit tipis super renyah dan isian melimpah.
            Dibuat fresh tiap pagi, tanpa pengawet, siap antar ke rumahmu —
            masih hangat!
          </p>
          <div className="hero-cta">
            <a href="#menu" className="btn btn-primary">Lihat Menu 🧺</a>
            <a href="#cara-pesan" className="btn btn-ghost">Cara Pesan</a>
          </div>
          <div className="hero-stats">
            <div><strong>25rb+</strong><span>Pcs terjual</span></div>
            <div className="stat-sep" />
            <div><strong>4.9/5</strong><span>Rating pembeli</span></div>
            <div className="stat-sep" />
            <div><strong>30 mnt</strong><span>Rata-rata antar</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-img-card">
            <img src={heroImg} alt="Tumpukan risol goreng renyah" />
          </div>
          <div className="float-card float-card-1" style={{ '--tilt': '-4deg' }}>
            ⭐ 4.9 <span>dari 2.300+ ulasan</span>
          </div>
          <div className="float-card float-card-2" style={{ '--tilt': '3deg' }}>
            🔥 Fresh <span>baru digoreng!</span>
          </div>
        </div>
      </div>
    </section>
  )
}
