import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import useCart from "../context/useCart";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="page container cart-empty">
        <span className="empty-icon"><ShoppingBag size={30} /></span>
        <span className="eyebrow">Your cart</span>
        <h1>Your cart is empty.</h1>
        <p className="page-lead">Explore our products and add something you like.</p>
        <Link className="button button-primary" to="/products">Browse products</Link>
      </main>
    );
  }

  return (
    <main className="page container cart-page">
      <div className="cart-heading">
        <div><span className="eyebrow">Your cart</span><h1>Shopping cart.</h1></div>
        <button className="clear-cart" type="button" onClick={clearCart}>Clear cart</button>
      </div>

      <div className="cart-layout">
        <section className="cart-items" aria-label="Cart items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <Link className="cart-item-image" to={`/products/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="cart-item-copy">
                <small>{item.category}</small>
                <Link to={`/products/${item.id}`}><strong>{item.name}</strong></Link>
                <span>${item.price.toLocaleString()}</span>
              </div>
              <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={15} /></button>
                <span>{item.quantity}</span>
                <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity" disabled={item.stock !== undefined && item.quantity >= item.stock}><Plus size={15} /></button>
              </div>
              <strong className="item-total">${(item.price * item.quantity).toLocaleString()}</strong>
              <button className="remove-item" type="button" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={18} /></button>
            </article>
          ))}
        </section>

        <aside className="order-summary">
          <h2>Order summary</h2>
          <div><span>Subtotal</span><strong>${cartTotal.toLocaleString()}</strong></div>
          <div><span>Delivery</span><strong>Free</strong></div>
          <div className="summary-total"><span>Total</span><strong>${cartTotal.toLocaleString()}</strong></div>
          <Link className="button button-primary checkout-button" to="/checkout">Continue to checkout</Link>
          <small>Taxes are calculated at checkout.</small>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
