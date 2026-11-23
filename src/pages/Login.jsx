import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router'
import { useAuth, homeFor } from '../context/AuthContext'
import './css/Form.css'
import './css/Auth.css'

export default function Login() {
    const { user, login } = useAuth()
    const location = useLocation()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    if (user) return <Navigate to={location.state?.from || homeFor(user)} replace />

    const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        const res = await login(form.email, form.password)
        setLoading(false)
        if (!res.ok) setError(res.error)
    }

    return (
        <section className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1>Masuk</h1>
                <p className="auth-sub">Masuk sebagai user atau admin untuk mulai memesan risol.</p>

                {error && <div className="form-error">{error}</div>}

                <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={form.email} onChange={update} required />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={form.password} onChange={update} required />
                </div>

                <button className="btn btn-primary auth-submit" disabled={loading}>
                    {loading ? 'Memproses...' : 'Masuk'}
                </button>

                <p className="auth-switch">
                    Belum punya akun? <Link to="/register">Daftar</Link>
                </p>
                <p className="auth-hint">
                    Akun admin demo: admin@rispicy.com / admin123
                </p>
            </form>
        </section>
    )
}