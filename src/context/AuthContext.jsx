import { createContext, useContext, useState } from 'react'

const USERS_KEY = 'rr_users'
const SESSION_KEY = 'rr_session'

/* Kode rahasia untuk daftar sebagai admin */
export const ADMIN_CODE = 'RISPICY-ADMIN'

/* Akun admin bawaan (dibuat otomatis saat pertama kali dipakai) */
const SEED_ADMIN = { name: 'Admin Rispicy', email: 'admin@rispicy.com', password: 'admin123' }

const read = (key, fallback) => {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback
    } catch {
        return fallback
    }
}
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value))

async function hash(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
    return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function ensureSeed() {
    const users = read(USERS_KEY, [])
    if (users.some((u) => u.email === SEED_ADMIN.email)) return
    users.push({
        id: 'u-admin',
        name: SEED_ADMIN.name,
        email: SEED_ADMIN.email,
        role: 'admin',
        password: await hash(SEED_ADMIN.password),
    })
    write(USERS_KEY, users)
}

const publicUser = ({ id, name, email, role }) => ({ id, name, email, role })

/* Tujuan setelah login berdasarkan role */
export const homeFor = (u) => (u.role === 'admin' ? '/admin/riwayat' : '/pesan')

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const id = localStorage.getItem(SESSION_KEY)
        const found = read(USERS_KEY, []).find((u) => u.id === id)
        return found ? publicUser(found) : null
    })

    const login = async (email, password) => {
        await ensureSeed()
        const users = read(USERS_KEY, [])
        const found = users.find((u) => u.email === email.trim().toLowerCase())
        if (!found || found.password !== (await hash(password))) {
            return { ok: false, error: 'Email atau password salah.' }
        }
        localStorage.setItem(SESSION_KEY, found.id)
        setUser(publicUser(found))
        return { ok: true }
    }

    const register = async ({ name, email, password, role, adminCode }) => {
        await ensureSeed()
        const users = read(USERS_KEY, [])
        const mail = email.trim().toLowerCase()

        if (name.trim().length < 3) return { ok: false, error: 'Nama minimal 3 karakter.' }
        if (password.length < 6) return { ok: false, error: 'Password minimal 6 karakter.' }
        if (users.some((u) => u.email === mail)) return { ok: false, error: 'Email sudah terdaftar.' }
        if (role === 'admin' && adminCode !== ADMIN_CODE) {
            return { ok: false, error: 'Kode admin salah.' }
        }

        const created = {
            id: 'u-' + Date.now().toString(36),
            name: name.trim(),
            email: mail,
            role: role === 'admin' ? 'admin' : 'user',
            password: await hash(password),
        }
        write(USERS_KEY, [...users, created])
        localStorage.setItem(SESSION_KEY, created.id)
        setUser(publicUser(created))
        return { ok: true }
    }

    const logout = () => {
        localStorage.removeItem(SESSION_KEY)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)