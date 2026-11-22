import { products, formatIDR } from './products'
import './css/CartDrawer.css'

export default function CartDrawer({ open, cart, total, onClose, onChangeQty, onCheckout }) {
  const entries = Object.entries(cart)

  return (
    <>
      <div className={`cart-overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="cart-head">
          <h3>Keranjang Kamu 🧺</h3>
          <button className="cart-close" onClick={onClose} aria-label="Tutup keranjang">✕</button>
        </div>

        {entries.length === 0 ? (
          <div className="cart-empty">
            <span>🥟</span>
            <p>Keranjangmu masih kosong.</p>
            <button className="btn btn-primary" onClick={onClose}>Lihat Menu</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {entries.map(([id, qty]) => {
                const p = products.find((x) => x.id === id)
                if (!p) return null
                return (
                  <div key={id} className="cart-item">
                    {p.img && <img src={p.img} alt={p.name} />}
                    <div className="cart-item-info">
                      <strong>{p.name}</strong>
                      <span>{formatIDR(p.price)} × {qty}</span>
                    </div>
                    <div className="qty-control">
                      <button onClick={() => onChangeQty(id, qty - 1)} aria-label="Kurangi">−</button>
                      <span>{qty}</span>
                      <button onClick={() => onChangeQty(id, qty + 1)} aria-label="Tambah">+</button>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="cart-foot">
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatIDR(total)}</strong>
              </div>
              <p className="cart-note">Beli 10 pcs gratis 1 — diskon dihitung manual saat konfirmasi di WhatsApp ya!</p>
              <button className="btn btn-primary cart-checkout" onClick={onCheckout}>
                Checkout via WhatsApp 💬
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
