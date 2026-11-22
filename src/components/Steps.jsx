import './css/Steps.css'

const steps = [
  { num: '01', icon: '🧺', title: 'Pilih & Masukkan Keranjang', text: 'Jelajahi menu, pilih varian favoritmu, atur jumlahnya langsung dari kartu produk.' },
  { num: '02', icon: '💬', title: 'Checkout via WhatsApp', text: 'Klik checkout — pesananmu otomatis terkirim ke WhatsApp kami lengkap dengan total harga.' },
  { num: '03', icon: '🛵', title: 'Digoreng & Diantar', text: 'Risol digoreng fresh setelah kamu pesan, lalu diantar cepat selagi masih hangat dan renyah.' },
]

export default function Steps() {
  return (
    <section id="cara-pesan" className="section">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">Cara Pesan</span>
          <h2>Semudah Chat Teman</h2>
          <p>Nggak perlu daftar, nggak perlu ribet. Tiga langkah dan risol hangat meluncur ke tempatmu.</p>
        </div>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <article key={s.num} className={`step-card reveal reveal-delay-${i + 1}`}>
              <span className="step-num">{s.num}</span>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {i < steps.length - 1 && <span className="step-arrow">→</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
