import { useMemo, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Menu from './components/Menu'
import Steps from './components/Steps'
import Testimonials from './components/Testimonials'
import Faq from './components/Faq'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import useReveal from './components/useReveal'
import { products, WA_NUMBER } from './components/products'

export default function App() {
  const [cart, setCart] = useState({}) // { productId: qty }
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState('')

  useReveal()

  const cartCount = useMemo(
    () => Object.values(cart).reduce((a, b) => a + b, 0),
    [cart]
  )
  const cartTotal = useMemo(
    () =>
      Object.entries(cart).reduce((sum, [id, qty]) => {
        const p = products.find((x) => x.id === id)
        return p ? sum + p.price * qty : sum
      }, 0),
    [cart]
  )

  const showToast = (msg) => {
    setToast(msg)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(''), 2200)
  }

  const addToCart = (product) => {
    setCart((c) => ({ ...c, [product.id]: (c[product.id] || 0) + 1 }))
    showToast(`${product.name} masuk keranjang`)
  }

  const changeQty = (id, qty) => {
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  }

  const checkoutWA = () => {
    const lines = Object.entries(cart).map(([id, qty]) => {
      const p = products.find((x) => x.id === id)
      return `- ${p.name} x${qty} = Rp${(p.price * qty).toLocaleString('id-ID')}`
    })
    const text =
      `Halo Risolle! Saya mau pesan:\n${lines.join('\n')}\n` +
      `Total: Rp${cartTotal.toLocaleString('id-ID')}\nTerima kasih!`
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Menu cart={cart} onAdd={addToCart} onChangeQty={changeQty} />
        <Steps />
        <Testimonials />
        <Faq />
      </main>
      <Footer />

      <CartDrawer
        open={cartOpen}
        cart={cart}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        onChangeQty={changeQty}
        onCheckout={checkoutWA}
      />

      <a
        className="wa-float"
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo Risolle! Saya mau tanya-tanya dulu tentang risolnya.')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat WhatsApp"
      >
        💬
      </a>

      {toast && (
        <div className="toast">
          <span className="dot" /> {toast}
        </div>
      )}
    </>
  )
}
