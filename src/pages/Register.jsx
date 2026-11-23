import { useState } from 'react'
import { Link, Navigate } from 'react-router'
import { useAuth, homeFor } from '../context/AuthContext'
import './css/Form.css'
import './css/Auth.css'

export default function Register() {
    const { user, register } = useAuth()
    const [role, setRole] = useState('user')
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', adminCode: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    if (user) return <Navigate to={homeFor(user)} replace />

    const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (form.password !== form.confirm) {
            setError('Konfirmasi password tidak sama.')
            return
        }
        setLoading(true)
        const res = await register({ ...form, role })
        setLoading(false)
        if (!res.ok) setError(res.error)
    }

    return (
        <section className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1>Daftar Akun</h1>
                <p className="auth-sub">Buat akun baru untuk memesan atau mengelola penjualan.</p>

                <div className="role-toggle">
                    {[['user', 'Daftar sebagai User'], ['admin', 'Daftar sebagai Admin']].map(([key, label]) => (
                        <button
                            type="button"
                            key={key}
                            className={`filter-btn ${role === key ? 'active' : ''}`}
                            onClick={() => setRole(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {error && <div className="form-error">{error}</div>}

                <div className="field">
                    <label htmlFor="name">Nama Lengkap</label>
                    <input id="name" name="name" value={form.name} onChange={update} required />
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={update} required />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={form.password} onChange={update} required />
                </div>
                <div className="field">
                    <label htmlFor="confirm">Konfirmasi Password</label>
                    <input id="confirm" name="confirm" type="password" value={form.confirm} onChange={update} required />
                </div>
                {role === 'admin' && (
                    <div className="field">
                        <label htmlFor="adminCode">Kode Admin</label>
                        <input id="adminCode" name="adminCode" value={form.adminCode} onChange={update} required />
                    </div>
                )}

                <button className="btn btn-primary auth-submit" disabled={loading}>
                    {loading ? 'Memproses...' : 'Daftar'}
                </button>

                <p className="auth-switch">
                    Sudah punya akun? <Link to="/login">Masuk</Link>
                </p>
            </form>
        </section>
    )
}