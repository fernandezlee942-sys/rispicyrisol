import './css/About.css'

const features = [
  { icon: '🌾', title: 'Kulit Tipis & Renyah', text: 'Adonan kulit dibuat sendiri tiap pagi — tipis, nggak alot, dan renyahnya awet walau sudah dingin.' },
  { icon: '🧀', title: 'Isian Melimpah', text: 'Nggak ada isian angin. Setiap risol dipadatkan dengan isian premium sampai benar-benar penuh.' },
  { icon: '🚫', title: 'Tanpa Pengawet', text: '100% bahan segar, tanpa pengawet dan pewarna. Aman buat anak-anak sampai orang tua.' },
  { icon: '❄️', title: 'Ada Frozen Pack', text: 'Mau stok di rumah? Frozen pack tahan 2 minggu di freezer — goreng 5 menit, serasa baru matang.' },
]

export default function About() {
  return (
    <section id="kenapa" className="section">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="kicker">Kenapa Rispicy Risol</span>
          <h2>Bukan Risol Sembarangan</h2>
          <p>Kami mulai dari dapur rumah tahun 2021. Satu prinsip yang nggak pernah berubah: kalau nggak enak buat keluarga sendiri, nggak kami jual.</p>
        </div>
        <div className="about-grid">
          {features.map((f, i) => (
            <article key={f.title} className={`about-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="about-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
