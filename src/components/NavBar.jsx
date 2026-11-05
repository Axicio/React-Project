import { useState } from "react";
import logo from "../assets/logo.png";
import { Heart, Menu, ShoppingBag, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import useCart from "../context/useCart";
import useWishlist from "../context/useWishlist";

const links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Services",
    path: "/services",
  },
  {
    label: "Products",
    path: "/products",
  },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main navigation">
      <Link to="/" className="brand" aria-label="Home">
        <img className="logo" src={logo} alt="" />
      </Link>
      <button onClick={() => setIsOpen(!isOpen)} className="menu-button" aria-label="Toggle menu" aria-expanded={isOpen}>
        {isOpen ? <X /> : <Menu />}
      </button>
      <ul className={isOpen ? "nav-lists open" : "nav-lists"}>
        {links.map((link) => (
          <li
            onClick={() => setIsOpen(false)}
            key={link.label}
            className="nav-link"
          >
            <NavLink to={link.path} end={link.path === "/"}>{link.label}</NavLink>
          </li>
        ))}
        <li className="nav-link nav-icon-link">
          <NavLink to="/wishlist" onClick={() => setIsOpen(false)} aria-label={`Wishlist with ${wishlistCount} items`}>
            <Heart size={19} /> <span className="nav-icon-label">Wishlist</span>
            {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink className="cart-nav-link" to="/cart" onClick={() => setIsOpen(false)}>
            <ShoppingBag size={19} /> Cart
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>
        </li>
      </ul>
      </nav>
    </header>
  );
};

export default NavBar;
