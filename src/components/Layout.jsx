import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'
import useReveal from './useReveal'
import { WA_NUMBER } from './products'

export default function Layout() {
    const { pathname, hash } = useLocation()
    useReveal()

    useEffect(() => {
        if (hash) document.querySelector(hash)?.scrollIntoView()
        else window.scrollTo(0, 0)
    }, [pathname, hash])

    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />

            <a
                className="wa-float"
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Risolle! Saya mau tanya-tanya dulu tentang risolnya.')}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat WhatsApp"
            >
                💬
            </a>
        </>
    )
}