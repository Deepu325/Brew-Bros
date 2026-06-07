import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Reveal } from '../components/Reveal';
const contactHero = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'; // Restaurant interior

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            alert("Thanks for contacting us! We'll get back to you soon.");
            setFormData({ name: '', email: '', message: '' });
            setSubmitting(false);
        }, 1000);
    };

    return (
        <div className="page-contact">
            <div style={{
                padding: '6rem 0',
                textAlign: 'center',
                marginBottom: '4rem',
                backgroundImage: `linear-gradient(to bottom, rgba(18,17,16,0.6) 0%, rgba(18,17,16,0.4) 50%, rgba(18,17,16,0.75) 100%), url(${contactHero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                borderBottom: '1px solid #2E2A26',
            }}>
                <Reveal>
                    <span style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#A6682D', marginBottom: '1rem' }}>✦ BREW BROS ✦</span>
                    <h1 style={{ color: '#E6DDD2', fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '2px' }}>Get in Touch</h1>
                    <div style={{ width: '50px', height: '1px', background: '#A6682D', margin: '0 auto 1.25rem' }} />
                    <p style={{ color: '#AD967D', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        We'd love to hear from you. Visit us, call us, or write to us.
                    </p>
                </Reveal>
            </div>

            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', paddingBottom: '6rem' }}>

                {/* Contact Info */}
                <Reveal>
                    <div>
                        <h2 style={{ color: '#A6682D', marginBottom: '2.5rem', fontSize: '2rem' }}>Contact Info</h2>

                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            <div style={{ background: '#2E2A26', padding: '1rem', borderRadius: '50%', height: 'fit-content' }}>
                                <MapPin color="#A6682D" size={24} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#E6DDD2' }}>Our Location</h4>
                                <p style={{ color: '#AD967D', fontSize: '1rem', lineHeight: '1.6' }}>
                                    123, Temple Road,<br />
                                    Malgudi Town, Karnataka - 577401
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            <div style={{ background: '#2E2A26', padding: '1rem', borderRadius: '50%', height: 'fit-content' }}>
                                <Phone color="#A6682D" size={24} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#E6DDD2' }}>Phone Numbers</h4>
                                <p style={{ color: '#AD967D', fontSize: '1rem' }}>+91 98765 43210</p>
                                <p style={{ color: '#AD967D', fontSize: '1rem' }}>+91 99000 12345</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <div style={{ background: '#2E2A26', padding: '1rem', borderRadius: '50%', height: 'fit-content' }}>
                                <Mail color="#A6682D" size={24} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, marginBottom: '0.5rem', fontSize: '1.1rem', color: '#E6DDD2' }}>Email Support</h4>
                                <p style={{ color: '#AD967D', fontSize: '1rem' }}>hello@brewbros.com</p>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* Contact Form */}
                <Reveal delay={0.2}>
                    <div style={{
                        backgroundColor: '#1C1A18',
                        padding: '3rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
                        border: '1px solid #2E2A26'
                    }}>
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#A6682D' }}>Send a Message</h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#E6DDD2' }}>Your Name</label>
                                <input
                                    required type="text" value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #2E2A26', fontSize: '1rem', outline: 'none', background: '#121110', color: '#E6DDD2', transition: 'border-color 0.3s' }}
                                    onFocus={e => e.target.style.borderColor = '#A6682D'}
                                    onBlur={e => e.target.style.borderColor = '#2E2A26'}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#E6DDD2' }}>Email Address</label>
                                <input
                                    required type="email" value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #2E2A26', fontSize: '1rem', outline: 'none', background: '#121110', color: '#E6DDD2', transition: 'border-color 0.3s' }}
                                    onFocus={e => e.target.style.borderColor = '#A6682D'}
                                    onBlur={e => e.target.style.borderColor = '#2E2A26'}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: '#E6DDD2' }}>Your Message</label>
                                <textarea
                                    required value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #2E2A26', fontSize: '1rem', minHeight: '150px', outline: 'none', transition: 'border-color 0.3s', fontFamily: 'inherit', background: '#121110', color: '#E6DDD2' }}
                                    onFocus={e => e.target.style.borderColor = '#A6682D'}
                                    onBlur={e => e.target.style.borderColor = '#2E2A26'}
                                    placeholder="Tell us about your catering needs or feedback..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', padding: '1.2rem', fontSize: '1.1rem' }}
                            >
                                {submitting ? 'Sending...' : 'Send Message'} <Send size={20} style={{ marginLeft: '10px' }} />
                            </button>
                        </form>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
