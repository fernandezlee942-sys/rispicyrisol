import { Link } from 'react-router'
import ErrorPage from '../components/ErrorPage'

export default function NotFound() {
    return (
        <ErrorPage
            code="404"
            emoji="🥟"
            title="Yah, risolnya nggak ketemu"
            text="Halaman yang kamu cari tidak ada atau sudah dipindahkan. Cek lagi alamatnya, atau balik ke beranda ya."
        >
            <Link to="/" className="btn btn-primary">Ke Beranda</Link>
            <Link to="/#menu" className="btn btn-ghost">Lihat Menu</Link>
        </ErrorPage>
    )
}