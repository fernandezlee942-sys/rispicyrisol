import './css/Marquee.css'

const items = [
  'Risol Mayo', 'Ragout Ayam', 'Smoked Beef Cheese', 'Risol Mercon',
  'Pisang Coklat Lumer', 'Sayur Bihun', 'Frozen Pack Tersedia', 'Bisa Order Partai Besar',
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="marquee-item">✦ {t}</span>
        ))}
      </div>
    </div>
  )
}
