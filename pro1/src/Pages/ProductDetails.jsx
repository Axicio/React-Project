import { ArrowLeft, Check, Heart, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data";
import useCart from "../context/useCart";
import Card from "../components/Card";
import useWishlist from "../context/useWishlist";

const ProductDetails = () => {
  const { productId } = useParams();
  const product = products.find((item) => item.id === Number(productId));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { wishlistIds, toggleWishlist } = useWishlist();
  const isSaved = product ? wishlistIds.includes(product.id) : false;
  const relatedProducts = products
    .filter((item) => item.id !== product?.id)
    .sort((a, b) => Number(b.category === product?.category) - Number(a.category === product?.category));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  if (!product) {
    return (
      <main className="page container empty-state">
        <span className="eyebrow">Not found</span>
        <h1>We couldn’t find that product.</h1>
        <Link className="button button-primary" to="/products">
          <ArrowLeft size={18} /> Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="product-detail container">
      <Link className="back-link" to="/products">
        <ArrowLeft size={17} /> Back to products
      </Link>
      <div className="detail-layout">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span><Star size={17} fill="currentColor" /> {product.rating}</span><small>{product.reviews} customer reviews</small></div>
          <p className="detail-price">${product.price.toLocaleString()}</p>
          <p className="detail-description">{product.description}</p>
          <p className={product.stock > 0 ? "detail-stock available" : "detail-stock unavailable"}>{product.stock > 0 ? `${product.stock} available in stock` : "Currently out of stock"}</p>
          <div className="purchase-row">
            <div className="detail-quantity" aria-label="Product quantity">
              <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} disabled={quantity === 1} aria-label="Decrease quantity"><Minus size={17} /></button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))} disabled={quantity >= product.stock} aria-label="Increase quantity"><Plus size={17} /></button>
            </div>
            <button className={added ? "button button-primary add-button added" : "button button-primary add-button"} type="button" onClick={handleAddToCart} disabled={product.stock === 0}>
              {added ? <><Check size={18} /> Added to cart</> : product.stock > 0 ? "Add to cart" : "Sold out"}
            </button>
            <button className={isSaved ? "detail-wishlist saved" : "detail-wishlist"} type="button" onClick={() => toggleWishlist(product.id)} aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}><Heart size={20} fill={isSaved ? "currentColor" : "none"} /></button>
          </div>
          <div className="specifications"><h2>Product details</h2>{Object.entries(product.specifications).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
          <div className="detail-benefits">
            <div><Truck size={21} /><span><strong>Fast delivery</strong><small>Carefully packed and delivered</small></span></div>
            <div><ShieldCheck size={21} /><span><strong>Shop confidently</strong><small>Quality products and secure checkout</small></span></div>
          </div>
        </div>
      </div>
      <section className="related-products"><div><span className="eyebrow">Keep exploring</span><h2>More products</h2></div><div className="product-grid">{relatedProducts.map((item) => <Card key={item.id} product={item} />)}</div></section>
    </main>
  );
};

export default ProductDetails;
