import { formatIDR } from './products'
import './css/Receipt.css'

const formatDate = (iso) =>
    new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })

export default function Receipt({ sale }) {
    const isPaid = sale.paid != null

    return (
        <div className="receipt">
            <div className="receipt-head">
                <strong>Rispicy Risol</strong>
                <span>Jl. Dr. Mansyur depan ATM BNI</span>
                <span>Metro Swalayan USU</span>
                <span>0812-3456-7890</span>
            </div>

            <div className="receipt-sep" />
            <div className="receipt-meta">
                <div><span>No</span><span>{sale.id}</span></div>
                <div><span>Waktu</span><span>{formatDate(sale.createdAt)}</span></div>
                <div><span>Kasir</span><span>{sale.createdBy.name}</span></div>
                <div><span>Pelanggan</span><span>{sale.customer}</span></div>
            </div>

            <div className="receipt-sep" />
            {sale.items.map((i) => (
                <div key={i.id} className="receipt-item">
                    <span>{i.name}</span>
                    <div>
                        <span>{i.qty} x {formatIDR(i.price)}</span>
                        <span>{formatIDR(i.price * i.qty)}</span>
                    </div>
                </div>
            ))}

            <div className="receipt-sep" />
            <div className="receipt-row total"><span>TOTAL</span><span>{formatIDR(sale.total)}</span></div>
            {isPaid ? (
                <>
                    <div className="receipt-row"><span>Bayar ({sale.payment})</span><span>{formatIDR(sale.paid)}</span></div>
                    {sale.payment === 'Tunai' && (
                        <div className="receipt-row"><span>Kembali</span><span>{formatIDR(sale.change ?? 0)}</span></div>
                    )}
                    <div className="receipt-row"><span>Status</span><span>LUNAS</span></div>
                </>
            ) : (
                <div className="receipt-row"><span>Pembayaran</span><span>{sale.payment}</span></div>
            )}

            <div className="receipt-sep" />
            <p className="receipt-foot">Terima kasih sudah jajan di Rispicy Risol!</p>
        </div>
    )
}