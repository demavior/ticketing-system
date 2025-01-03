import ContactForm from '../components/ContactForm';

function Contact() {
    return (
      <div className="container">
        <main>
          <section>
            <h2>Contact Us</h2>
            <ContactForm />
          </section>
          <section>
            <h2>Visit Our Partner Website</h2>
            <p>Check out our partner's website for more information.</p>
            <a href="https://www.panimick.com" target="_blank" rel="noopener noreferrer">Panimick bakery</a>
          </section>
        </main>
      </div>
    );
  }
  
  export default Contact;