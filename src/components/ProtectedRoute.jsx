import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'

/* Belum login -> /login, role tidak cocok -> /403 */
export default function ProtectedRoute({ roles }) {
    const { user } = useAuth()
    const location = useLocation()

    if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
    if (roles && !roles.includes(user.role)) return <Navigate to="/403" replace />
    return <Outlet />
}