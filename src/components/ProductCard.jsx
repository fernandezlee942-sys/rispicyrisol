import { formatIDR } from './products'
import './css/ProductCard.css'

export default function ProductCard({ product, qty, onAdd, onChangeQty }) {
  return (
    <article className="product-card">
      <div className="product-img">
        <img src={product.img} alt={product.name} loading="lazy" />
        <span className="product-tag">{product.tag}</span>
        <span className="product-rating">⭐ {product.rating}</span>
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p>{product.desc}</p>
        <div className="product-foot">
          <div className="product-price">
            {formatIDR(product.price)}
            <span>/pcs</span>
          </div>
          {qty === 0 ? (
            <button className="add-btn" onClick={() => onAdd(product)}>
              + Keranjang
            </button>
          ) : (
            <div className="qty-control">
              <button onClick={() => onChangeQty(product.id, qty - 1)} aria-label="Kurangi">−</button>
              <span>{qty}</span>
              <button onClick={() => onChangeQty(product.id, qty + 1)} aria-label="Tambah">+</button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
