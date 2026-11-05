import { ArrowRight, Headphones, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/image1.jpg";

const Home = () => {
  return (
    <main>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">New arrivals are here</span>
          <h1>Tech you’ll love, without the hassle.</h1>
          <p>Discover thoughtfully selected devices and accessories, backed by friendly support and reliable delivery.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/products">Shop products <ArrowRight size={18} /></Link>
            <Link className="button button-secondary" to="/about">Learn more</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="image-card"><img src={heroImage} alt="Featured tablet" /></div>
          <span className="floating-note">Quality picks<br /><strong>Made simple.</strong></span>
        </div>
      </section>
      <section className="benefits container" aria-label="Shopping benefits">
        <div><Truck /><span><strong>Fast delivery</strong><small>Safe and on time</small></span></div>
        <div><ShieldCheck /><span><strong>Secure shopping</strong><small>Shop with confidence</small></span></div>
        <div><Headphones /><span><strong>Helpful support</strong><small>We’re here for you</small></span></div>
      </section>
    </main>
  );
};

export default Home;
