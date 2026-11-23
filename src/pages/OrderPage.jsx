import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { products, formatIDR, WA_NUMBER } from '../components/products'
import { useAuth } from '../context/AuthContext'
import { addSale } from '../lib/sales'
import PaymentModal from '../components/PaymentModal'
import ReceiptModal from '../components/ReceiptModal'
import './css/Form.css'
import './css/Order.css'

export default function OrderPage() {
    const { user } = useAuth()
    const isAdmin = user.role === 'admin'

    const [cart, setCart] = useState({}) // { productId: qty }
    const [customer, setCustomer] = useState(isAdmin ? '' : user.name)
    const [note, setNote] = useState('')
    const [payOpen, setPayOpen] = useState(false)
    const [receipt, setReceipt] = useState(null)
    const [error, setError] = useState('')
    const [toast, setToast] = useState('')
    const toastTimer = useRef(null)

    const items = Object.entries(cart).map(([id, qty]) => {
        const p = products.find((x) => x.id === id)
        return { id, name: p.name, price: p.price, qty }
    })
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
    const count = items.reduce((sum, i) => sum + i.qty, 0)

    const changeQty = (id, qty) => {
        setCart((c) => {
            const next = { ...c }
            if (qty <= 0) delete next[id]
            else next[id] = qty
            return next
        })
    }

    const showToast = (msg) => {
        setToast(msg)
        clearTimeout(toastTimer.current)
        toastTimer.current = setTimeout(() => setToast(''), 2600)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (items.length === 0) {
            setError('Pilih minimal satu menu dulu ya.')
            return
        }
        setError('')

        // admin (kasir): lanjut ke pembayaran dulu, baru disimpan
        if (isAdmin) {
            setPayOpen(true)
            return
        }

        // user (online): simpan lalu konfirmasi ke WhatsApp toko
        const name = customer.trim() || user.name
        const sale = addSale({
            channel: 'online',
            customer: name,
            note: note.trim(),
            payment: 'WhatsApp',
            items,
            total,
            createdBy: { id: user.id, name: user.name, role: user.role },
        })
        const lines = items.map((i) => `- ${i.name} x${i.qty} = ${formatIDR(i.price * i.qty)}`)
        const text =
            `Halo Risolle! Saya mau pesan (${sale.id}):\n${lines.join('\n')}\n` +
            `Total: ${formatIDR(total)}\nAtas nama: ${name}` +
            (note.trim() ? `\nCatatan: ${note.trim()}` : '') +
            `\nTerima kasih!`
        window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank')

        setCart({})
        setNote('')
        showToast(`Pesanan ${sale.id} tersimpan`)
    }

    // dipanggil setelah pembayaran dikonfirmasi di PaymentModal
    const handlePaid = ({ payment, paid, change }) => {
        const sale = addSale({
            channel: 'offline',
            customer: customer.trim() || 'Pelanggan offline',
            note: note.trim(),
            payment,
            paid,
            change,
            items,
            total,
            createdBy: { id: user.id, name: user.name, role: user.role },
        })
        setPayOpen(false)
        setReceipt(sale) // tampilkan struk
        setCart({})
        setNote('')
        setCustomer('')
        showToast(`Penjualan ${sale.id} lunas`)
    }

    return (
        <section className="order-page">
            <div className="wrap">
                <div className="section-head">
                    <span className="kicker">{isAdmin ? 'Input Penjualan' : 'Pesan Sekarang'}</span>
                    <h2>{isAdmin ? 'Kasir Penjualan Offline' : 'Pilih Risol Favoritmu'}</h2>
                    <p>
                        {isAdmin
                            ? 'Pilih menu, proses pembayaran, lalu cetak struk. Tercatat otomatis sebagai penjualan offline.'
                            : 'Atur jumlah pesananmu, lalu kirim lewat WhatsApp untuk konfirmasi.'}
                    </p>
                    {isAdmin && (
                        <Link to="/admin/riwayat" className="order-history-link">Lihat Riwayat Penjualan →</Link>
                    )}
                </div>

                <form className="order-grid" onSubmit={handleSubmit}>
                    <div className="order-list">
                        {products.map((p) => {
                            const qty = cart[p.id] || 0
                            return (
                                <div key={p.id} className="order-item">
                                    {p.img ? (
                                        <img className="order-thumb" src={p.img} alt={p.name} />
                                    ) : (
                                        <div className="order-thumb order-thumb-empty">🥟</div>
                                    )}
                                    <div className="order-info">
                                        <strong>{p.name}</strong>
                                        <span className="variant-badge">{p.tag}</span>
                                        <div className="order-price">{formatIDR(p.price)}<small>/pcs</small></div>
                                    </div>
                                    {qty === 0 ? (
                                        <button type="button" className="add-btn" onClick={() => changeQty(p.id, 1)}>
                                            + Tambah
                                        </button>
                                    ) : (
                                        <div className="qty-control">
                                            <button type="button" onClick={() => changeQty(p.id, qty - 1)} aria-label="Kurangi">−</button>
                                            <span>{qty}</span>
                                            <button type="button" onClick={() => changeQty(p.id, qty + 1)} aria-label="Tambah">+</button>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <aside className="order-summary">
                        <h3>Ringkasan Pesanan 🧺</h3>

                        {items.length === 0 ? (
                            <p className="order-empty">Belum ada item dipilih.</p>
                        ) : (
                            <div className="summary-lines">
                                {items.map((i) => (
                                    <div key={i.id} className="summary-line">
                                        <span>{i.name} × {i.qty}</span>
                                        <strong>{formatIDR(i.price * i.qty)}</strong>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="cart-total">
                            <span>Total ({count} pcs)</span>
                            <strong>{formatIDR(total)}</strong>
                        </div>
                        <p className="cart-note">Beli 10 pcs gratis 1 — diskon dihitung manual saat konfirmasi.</p>

                        <div className="field">
                            <label htmlFor="customer">{isAdmin ? 'Nama Pelanggan (opsional)' : 'Atas Nama'}</label>
                            <input id="customer" value={customer} onChange={(e) => setCustomer(e.target.value)} required={!isAdmin} />
                        </div>
                        <div className="field">
                            <label htmlFor="note">{isAdmin ? 'Catatan' : 'Alamat / Catatan'}</label>
                            <textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} />
                        </div>

                        {error && <div className="form-error">{error}</div>}

                        <button className="btn btn-primary order-submit">
                            {isAdmin ? 'Lanjut ke Pembayaran' : 'Kirim Pesanan via WhatsApp 💬'}
                        </button>
                    </aside>
                </form>
            </div>

            {payOpen && (
                <PaymentModal total={total} onConfirm={handlePaid} onClose={() => setPayOpen(false)} />
            )}
            {receipt && (
                <ReceiptModal
                    sale={receipt}
                    title="Pembayaran Berhasil ✅"
                    closeLabel="Selesai"
                    onClose={() => setReceipt(null)}
                />
            )}

            {toast && (
                <div className="toast">
                    <span className="dot" /> {toast}
                </div>
            )}
        </section>
    )
}