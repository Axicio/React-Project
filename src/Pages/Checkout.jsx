import { Check, LockKeyhole, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useCart from "../context/useCart";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState(null);

  const placeOrder = (event) => {
    event.preventDefault();
    setOrderNumber(`NOVA-${Date.now().toString().slice(-6)}`);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (orderNumber) {
    return (
      <main className="page container checkout-success">
        <span className="success-icon"><Check size={34} /></span>
        <span className="eyebrow">Order confirmed</span>
        <h1>Thank you for your order.</h1>
        <p className="page-lead">Your order number is <strong>{orderNumber}</strong>. We’ll send delivery updates to your email.</p>
        <Link className="button button-primary" to="/products">Continue shopping</Link>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="page container cart-empty">
        <span className="empty-icon"><ShoppingBag size={30} /></span>
        <span className="eyebrow">Checkout</span>
        <h1>There’s nothing to check out.</h1>
        <p className="page-lead">Add a product to your cart first.</p>
        <Link className="button button-primary" to="/products">Browse products</Link>
      </main>
    );
  }

  return (
    <main className="page container checkout-page">
      <span className="eyebrow">Secure checkout</span>
      <h1>Complete your order.</h1>

      <form className="checkout-layout" onSubmit={placeOrder}>
        <div className="checkout-form">
          <section className="form-section">
            <div className="section-heading"><span>1</span><div><h2>Contact</h2><p>We’ll send your receipt and delivery updates here.</p></div></div>
            <div className="form-grid">
              <label className="full-field">Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" required /></label>
              <label>First name<input type="text" name="firstName" autoComplete="given-name" required /></label>
              <label>Last name<input type="text" name="lastName" autoComplete="family-name" required /></label>
            </div>
          </section>

          <section className="form-section">
            <div className="section-heading"><span>2</span><div><h2>Delivery address</h2><p>Where should we send your order?</p></div></div>
            <div className="form-grid">
              <label className="full-field">Street address<input type="text" name="address" autoComplete="street-address" required /></label>
              <label>City<input type="text" name="city" autoComplete="address-level2" required /></label>
              <label>Postal code<input type="text" name="postalCode" autoComplete="postal-code" required /></label>
              <label className="full-field">Country<select name="country" autoComplete="country-name" defaultValue="Cambodia" required><option>Cambodia</option><option>Thailand</option><option>Vietnam</option><option>United States</option></select></label>
            </div>
          </section>

          <section className="form-section">
            <div className="section-heading"><span>3</span><div><h2>Payment</h2><p>Demo only—no payment will be processed.</p></div></div>
            <div className="demo-notice"><LockKeyhole size={19} /> Use any correctly formatted test details.</div>
            <div className="form-grid">
              <label className="full-field">Card number<input type="text" name="cardNumber" inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242" pattern="[0-9 ]{15,19}" required /></label>
              <label>Expiry date<input type="text" name="expiry" inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" pattern="(0[1-9]|1[0-2])/[0-9]{2}" required /></label>
              <label>Security code<input type="text" name="securityCode" inputMode="numeric" autoComplete="cc-csc" placeholder="123" pattern="[0-9]{3,4}" required /></label>
            </div>
          </section>
        </div>

        <aside className="checkout-summary">
          <h2>Your order</h2>
          <div className="checkout-products">{cartItems.map((item) => <div className="checkout-product" key={item.id}><span className="checkout-thumb"><img src={item.image} alt="" /><small>{item.quantity}</small></span><span>{item.name}</span><strong>${(item.price * item.quantity).toLocaleString()}</strong></div>)}</div>
          <div className="checkout-line"><span>Subtotal</span><strong>${cartTotal.toLocaleString()}</strong></div>
          <div className="checkout-line"><span>Delivery</span><strong>Free</strong></div>
          <div className="checkout-line checkout-total"><span>Total</span><strong>${cartTotal.toLocaleString()}</strong></div>
          <button className="button button-primary place-order" type="submit"><LockKeyhole size={17} /> Place demo order</button>
          <small className="secure-copy">This is a demonstration checkout. No charge will occur.</small>
        </aside>
      </form>
    </main>
  );
};

export default Checkout;
