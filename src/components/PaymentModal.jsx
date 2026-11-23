import { useState } from 'react'
import { formatIDR } from './products'
import './css/PaymentModal.css'

export default function PaymentModal({ total, onConfirm, onClose }) {
    const [method, setMethod] = useState('Tunai')
    const [cash, setCash] = useState('')
    const [qrMissing, setQrMissing] = useState(false)

    const received = Number(cash) || 0
    const change = received - total
    const canPay = method === 'QRIS' || received >= total

    // tombol cepat: uang pas + pecahan uang yang cukup
    const quick = [total, ...[10000, 20000, 50000, 100000].filter((n) => n > total)].slice(0, 4)

    const confirm = () =>
        onConfirm(
            method === 'Tunai'
                ? { payment: 'Tunai', paid: received, change }
                : { payment: 'QRIS', paid: total, change: 0 }
        )

    return (
        <div className="pay-overlay">
            <div className="pay-modal">
                <button type="button" className="pay-close" onClick={onClose} aria-label="Tutup">✕</button>
                <h3 className="pay-title">Pembayaran</h3>
                <div className="pay-total-label">Total yang harus dibayar</div>
                <div className="pay-total">{formatIDR(total)}</div>

                <div className="pay-methods">
                    {['Tunai', 'QRIS'].map((m) => (
                        <button
                            type="button"
                            key={m}
                            className={`filter-btn ${method === m ? 'active' : ''}`}
                            onClick={() => setMethod(m)}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                {method === 'Tunai' ? (
                    <>
                        <div className="field">
                            <label htmlFor="cash">Uang diterima (Rp)</label>
                            <input
                                id="cash"
                                inputMode="numeric"
                                value={cash}
                                onChange={(e) => setCash(e.target.value.replace(/\D/g, ''))}
                                placeholder="0"
                                autoFocus
                            />
                        </div>
                        <div className="pay-quick">
                            {quick.map((n, i) => (
                                <button type="button" key={n} onClick={() => setCash(String(n))}>
                                    {i === 0 ? 'Uang pas' : formatIDR(n)}
                                </button>
                            ))}
                        </div>
                        <div className={`pay-change ${change < 0 ? 'short' : ''}`}>
                            <span>{change < 0 ? 'Kurang' : 'Kembalian'}</span>
                            <strong>{formatIDR(Math.abs(change))}</strong>
                        </div>
                    </>
                ) : (
                    <div className="qris-box">
                        {qrMissing ? (
                            <div className="qris-missing">
                                Gambar QRIS belum ada. Simpan gambar QRIS toko sebagai <b>public/qris.png</b>.
                            </div>
                        ) : (
                            <img src="/qris.png" alt="QRIS Rispicy Risol" onError={() => setQrMissing(true)} />
                        )}
                        <p className="qris-note">
                            Minta pelanggan scan dan bayar <b>{formatIDR(total)}</b>, lalu tekan OK
                            untuk menandai pesanan lunas.
                        </p>
                    </div>
                )}

                <div className="pay-actions">
                    <button type="button" className="btn btn-primary" disabled={!canPay} onClick={confirm}>
                        {method === 'QRIS' ? 'OK' : 'Bayar'}
                    </button>
                </div>
            </div>
        </div>
    )
}