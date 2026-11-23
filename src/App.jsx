import { Routes, Route } from 'react-router'
import './App.css'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import OrderPage from './pages/OrderPage'
import SalesHistory from './pages/admin/SalesHistory'
import NotFound from './pages/NotFound'
import Forbidden from './pages/Forbidden'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* user & admin yang sudah login */}
        <Route element={<ProtectedRoute roles={['user', 'admin']} />}>
          <Route path="pesan" element={<OrderPage />} />
        </Route>

        {/* khusus admin */}
        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path="admin/riwayat" element={<SalesHistory />} />
        </Route>

        <Route path="403" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}