import { Link } from 'react-router'
import ErrorPage from '../components/ErrorPage'
import { useAuth } from '../context/AuthContext'

export default function Forbidden() {
    const { user } = useAuth()

    return (
        <ErrorPage
            code="403"
            emoji="🔒"
            title="Akses ditolak"
            text="Kamu tidak punya izin untuk membuka halaman ini. Halaman ini hanya bisa diakses oleh admin."
        >
            <Link to="/" className="btn btn-primary">Ke Beranda</Link>
            {!user && <Link to="/login" className="btn btn-ghost">Masuk</Link>}
        </ErrorPage>
    )
}