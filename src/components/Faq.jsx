import { useState } from 'react'
import './css/Faq.css'

const faqs = [
  { q: 'Minimal order berapa?', a: 'Untuk pengantaran, minimal order 5 pcs. Di bawah itu tetap bisa, tapi ambil sendiri di dapur kami ya.' },
  { q: 'Bisa pesan frozen (mentah) nggak?', a: 'Bisa banget! Semua varian tersedia dalam frozen pack isi 5 atau 10. Tahan sampai 2 minggu di freezer, tinggal goreng 5 menit kapan pun kamu mau.' },
  { q: 'Bisa order banyak buat acara?', a: 'Bisa! Kami melayani order 50–500 pcs untuk acara kantor, arisan, pengajian, dan ulang tahun. Pesan minimal H-1 lewat WhatsApp biar kami siapkan dengan rapi.' },
  { q: 'Pengantarannya ke mana aja?', a: 'Kami antar sendiri untuk radius 5 km (gratis ongkir untuk pembelian di atas Rp50.000). Di luar itu bisa pakai ojek online, atau ambil langsung di dapur.' },
  { q: 'Tahan berapa lama setelah digoreng?', a: 'Paling enak dimakan dalam 2 jam setelah digoreng. Kalau mau dihangatkan lagi, pakai air fryer / oven 3 menit — jangan microwave, kulitnya jadi lembek!' },
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="section">
      <div className="wrap faq-wrap">
        <div className="section-head reveal">
          <span className="kicker">FAQ</span>
          <h2>Sering Ditanyakan</h2>
        </div>
        <div className="faq-list reveal">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <span className="faq-chevron">{open === i ? '−' : '+'}</span>
              </button>
              <div className="faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
