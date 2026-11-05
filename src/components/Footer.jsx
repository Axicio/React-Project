import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-grid container">
        <div className="footer-brand">
          <Link to="/" aria-label="Nova home"><img src={logo} alt="" /></Link>
          <p>Reliable tech, thoughtful choices, and friendly support—all in one simple place.</p>
        </div>
        <div className="footer-column"><h2>Shop</h2><Link to="/products">All products</Link><Link to="/cart">Your cart</Link><Link to="/services">Services</Link></div>
        <div className="footer-column"><h2>Company</h2><Link to="/about">About us</Link><Link to="/contact">Contact</Link><Link to="/checkout">Checkout</Link></div>
        <div className="footer-column footer-contact"><h2>Get in touch</h2><a href="mailto:hello@nova.example"><Mail size={16} /> hello@nova.example</a><a href="tel:+85512345678"><Phone size={16} /> +855 12 345 678</a><span><MapPin size={16} /> Phnom Penh, Cambodia</span></div>
      </div>
      <div className="footer-bottom container"><span>© {new Date().getFullYear()} Nova. All rights reserved.</span><span>Demo store built with React.</span></div>
    </footer>
  );
};

export default Footer;
