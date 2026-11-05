import { ArrowUpRight, Check, Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../context/useCart";
import useWishlist from "../context/useWishlist";

const Card = ({ product }) => {
  const { name, category, price, description, image } = product;
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const { wishlistIds, toggleWishlist } = useWishlist();
  const isSaved = wishlistIds.includes(product.id);

  const quickAdd = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/products/${product.id}`} aria-label={`View details for ${name}`}>
          <img src={image} alt={name} />
        </Link>
        <button className={isSaved ? "wishlist-button saved" : "wishlist-button"} type="button" onClick={() => toggleWishlist(product.id)} aria-label={isSaved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}><Heart size={18} fill={isSaved ? "currentColor" : "none"} /></button>
      </div>
      <small>{category}</small>
      <Link className="product-name-link" to={`/products/${product.id}`}><strong>{name}</strong></Link>
      <span className="card-rating"><Star size={14} fill="currentColor" /> {product.rating} <small>({product.reviews})</small></span>
      <p className="product-description">{description}</p>
      <div className="card-price-row"><span className="product-price">${price.toLocaleString()}</span><small className={product.stock > 0 ? "in-stock" : "out-of-stock"}>{product.stock > 0 ? "In stock" : "Sold out"}</small></div>
      <div className="card-actions">
        <Link className="card-link" to={`/products/${product.id}`} aria-label={`View ${name}`}>View details <ArrowUpRight size={16} /></Link>
        <button className={added ? "quick-add added" : "quick-add"} type="button" onClick={quickAdd} disabled={product.stock === 0} aria-label={`Add ${name} to cart`}>{added ? <Check size={16} /> : <ShoppingBag size={16} />}{added ? "Added" : "Add"}</button>
      </div>
    </article>
  );
};

export default Card;
