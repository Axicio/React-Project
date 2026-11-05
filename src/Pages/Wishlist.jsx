import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import useWishlist from "../context/useWishlist";
import { products } from "../data";

const Wishlist = () => {
  const { wishlistIds } = useWishlist();
  const savedProducts = products.filter((product) => wishlistIds.includes(product.id));

  if (savedProducts.length === 0) {
    return (
      <main className="page container cart-empty">
        <span className="empty-icon"><Heart size={30} /></span>
        <span className="eyebrow">Wishlist</span>
        <h1>Nothing saved yet.</h1>
        <p className="page-lead">Tap the heart on a product to keep it here for later.</p>
        <Link className="button button-primary" to="/products">Discover products</Link>
      </main>
    );
  }

  return (
    <main className="page container">
      <span className="eyebrow">Wishlist</span>
      <h1>Saved for later.</h1>
      <p className="page-lead">Your favorite products, all in one place.</p>
      <div className="results-row"><span>{savedProducts.length} saved {savedProducts.length === 1 ? "product" : "products"}</span></div>
      <div className="product-grid product-results">{savedProducts.map((product) => <Card key={product.id} product={product} />)}</div>
    </main>
  );
};

export default Wishlist;
