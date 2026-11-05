import { ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="page container not-found">
    <span className="error-number">404</span>
    <span className="eyebrow">Page not found</span>
    <h1>This page wandered off.</h1>
    <p className="page-lead">The address may be incorrect, or the page may have moved somewhere else.</p>
    <div className="hero-actions"><Link className="button button-primary" to="/"><Home size={18} /> Go home</Link><Link className="button button-secondary" to="/products"><ArrowLeft size={18} /> Browse products</Link></div>
  </main>
);

export default NotFound;
