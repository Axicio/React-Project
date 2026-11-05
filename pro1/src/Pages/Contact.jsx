import { Check, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [sent, setSent] = useState(false);

  const submitMessage = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  };

  return (
    <main className="page container contact-page">
      <div className="contact-intro"><span className="eyebrow">Contact us</span><h1>How can we help?</h1><p className="page-lead">Have a product question or need support? Send us a message and our team will get back to you.</p><div className="contact-methods"><a href="mailto:hello@nova.example"><Mail /><span><small>Email</small><strong>hello@nova.example</strong></span></a><a href="tel:+85512345678"><Phone /><span><small>Phone</small><strong>+855 12 345 678</strong></span></a><div><MapPin /><span><small>Location</small><strong>Phnom Penh, Cambodia</strong></span></div></div></div>

      <form className="contact-form" onSubmit={submitMessage}>
        <div><span className="eyebrow">Send a message</span><h2>Tell us what you need.</h2></div>
        {sent && <div className="message-sent" role="status"><Check size={18} /> Thanks! Your demo message has been received.</div>}
        <label>Name<input type="text" name="name" autoComplete="name" required /></label>
        <label>Email<input type="email" name="email" autoComplete="email" required /></label>
        <label>Subject<select name="subject" defaultValue="Product question"><option>Product question</option><option>Order support</option><option>Returns</option><option>Something else</option></select></label>
        <label>Message<textarea name="message" rows="5" required /></label>
        <button className="button button-primary" type="submit">Send message</button>
      </form>
    </main>
  );
};

export default Contact;
