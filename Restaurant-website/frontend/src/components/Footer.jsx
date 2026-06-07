import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{
            backgroundColor: '#0E0D0C',
            borderTop: '1px solid #2E2A26',
            color: '#AD967D',
            padding: '5rem 0 2rem',
            marginTop: 'auto',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Subtle background image overlay */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: "url('/images/hero-bg.png')",
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: 0.04, pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '3.5rem', marginBottom: '4rem',
                }}>

                    {/* Brand */}
                    <div>
                        <h2 className="text-kannada" style={{
                            color: '#A6682D', marginBottom: '0.4rem',
                            fontSize: '2rem', letterSpacing: '3px',
                        }}>
                            BREW BROS
                        </h2>
                        <span style={{
                            display: 'block', fontSize: '0.65rem', letterSpacing: '4px',
                            color: '#5D422D', textTransform: 'uppercase', marginBottom: '1.5rem',
                        }}>
                            Coffee House
                        </span>
                        <div style={{ width: '40px', height: '1px', background: '#5D422D', marginBottom: '1.5rem' }} />
                        <p style={{ color: '#AD967D', lineHeight: '1.8', fontSize: '0.95rem', maxWidth: '300px' }}>
                            Every bite at BREW BROS is a tribute to the timeless traditions of Karnataka's rural kitchens. Pure vegetarian, clay-pot cooked, heart-served.
                        </p>
                        <div style={{ display: 'flex', gap: '1.25rem', marginTop: '2rem' }}>
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <Link key={i} to="#" style={{ color: '#5D422D', transition: 'color 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#A6682D'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#5D422D'}
                                >
                                    <Icon size={20} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 style={{
                            color: '#E6DDD2', fontSize: '0.75rem', letterSpacing: '4px',
                            textTransform: 'uppercase', marginBottom: '2rem',
                            paddingBottom: '0.75rem', borderBottom: '1px solid #2E2A26',
                        }}>
                            Explore
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[['/', 'Home'], ['/menu', 'Our Menu'], ['/about', 'Our Heritage'], ['/reviews', 'Guest Love'], ['/contact', 'Get in Touch']].map(([path, label]) => (
                                <li key={path}>
                                    <Link to={path} style={{ color: '#AD967D', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#A6682D'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#AD967D'}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{
                            color: '#E6DDD2', fontSize: '0.75rem', letterSpacing: '4px',
                            textTransform: 'uppercase', marginBottom: '2rem',
                            paddingBottom: '0.75rem', borderBottom: '1px solid #2E2A26',
                        }}>
                            Visit Us
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <MapPin size={18} color="#A6682D" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>123, Temple Road, Malgudi Town, Karnataka — 577401</p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <Phone size={18} color="#A6682D" />
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>+91 98765 43210</p>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <Mail size={18} color="#A6682D" />
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>hello@brewbros.com</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: '1px solid #2E2A26', paddingTop: '2rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexWrap: 'wrap', gap: '1rem',
                }}>
                    <span style={{ color: '#5D422D', fontSize: '0.85rem' }}>
                        &copy; {new Date().getFullYear()} BREW BROS. Handcrafted with traditional love.
                    </span>
                    <span style={{ color: '#5D422D', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        Coffee House
                    </span>
                </div>
            </div>
        </footer>
    );
}
