import { useState } from 'react'
import { Link } from 'react-router'
import { getSales } from '../../lib/sales'
import { formatIDR } from '../../components/products'
import '../css/SalesHistory.css'

const tabs = [
    ['semua', 'Semua'],
    ['online', 'Online'],
    ['offline', 'Offline'],
]

const formatDate = (iso) =>
    new Date(iso).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })

const isPaid = (s) => s.paid != null || s.channel === 'offline'

const sum = (list) => list.reduce((a, s) => a + s.total, 0)

export default function SalesHistory() {
    const [sales] = useState(() => getSales())
    const [tab, setTab] = useState('semua')

    const online = sales.filter((s) => s.channel === 'online')
    const offline = sales.filter((s) => s.channel === 'offline')
    const shown = tab === 'semua' ? sales : tab === 'online' ? online : offline

    const stats = [
        ['Total Transaksi', sales.length, 'transaksi'],
        ['Total Pendapatan', formatIDR(sum(sales)), 'semua channel'],
        ['Penjualan Online', formatIDR(sum(online)), `${online.length} transaksi`],
        ['Penjualan Offline', formatIDR(sum(offline)), `${offline.length} transaksi`],
    ]

    return (
        <section className="history-page">
            <div className="wrap">
                <div className="section-head">
                    <span className="kicker">Panel Admin</span>
                    <h2>Riwayat Penjualan</h2>
                    <p>Semua penjualan yang diinput oleh user (online) maupun admin (offline).</p>
                    <Link to="/pesan" className="btn btn-primary history-add">+ Input Penjualan</Link>
                </div>

                <div className="stat-grid">
                    {stats.map(([label, value, hint]) => (
                        <div key={label} className="stat-card">
                            <span>{label}</span>
                            <strong>{value}</strong>
                            <small>{hint}</small>
                        </div>
                    ))}
                </div>

                <div className="menu-filters">
                    {tabs.map(([key, label]) => (
                        <button
                            key={key}
                            className={`filter-btn ${tab === key ? 'active' : ''}`}
                            onClick={() => setTab(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {shown.length === 0 ? (
                    <p className="menu-empty">Belum ada data penjualan 🥟</p>
                ) : (
                    <div className="history-table-wrap">
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Waktu</th>
                                    <th>Channel</th>
                                    <th>Pelanggan</th>
                                    <th>Pesanan</th>
                                    <th>Pembayaran</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Dicatat Oleh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shown.map((s) => (
                                    <tr key={s.id}>
                                        <td><strong>{s.id}</strong></td>
                                        <td>{formatDate(s.createdAt)}</td>
                                        <td><span className={`channel-badge ${s.channel}`}>{s.channel}</span></td>
                                        <td>
                                            {s.customer}
                                            {s.note && <small className="row-note">{s.note}</small>}
                                        </td>
                                        <td>
                                            {s.items.map((i) => (
                                                <div key={i.id}>{i.name} × {i.qty}</div>
                                            ))}
                                        </td>
                                        <td>{s.payment}</td>
                                        <td>
                                            <span className={`status-badge ${isPaid(s) ? 'paid' : 'unpaid'}`}>
                                                {isPaid(s) ? 'Lunas' : 'Belum bayar'}
                                            </span>
                                        </td>
                                        <td className="row-total">{formatIDR(s.total)}</td>
                                        <td>{s.createdBy.name} <small className="row-note">{s.createdBy.role}</small></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    )
}