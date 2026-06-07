import React from 'react';
import { Reveal } from '../components/Reveal';
import { Link } from 'react-router-dom';

const heroBg = '/images/hero-bg.png';
const imgGrid1 = '/images/hero-bg.png';
const imgGrid2 = '/images/hero-bg.png';
const imgGrid3 = '/images/hero-bg.png';

export default function Home() {
    return (
        <div className="page-home">
            {/* HERO SECTION */}
            <section className="hero" style={{
                minHeight: '90vh', // Made it slightly taller for impact
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                // Using local asset for background with overlay
                background: `linear-gradient(to bottom, rgba(18,17,16,0.55) 0%, rgba(18,17,16,0.35) 50%, rgba(18,17,16,0.7) 100%), url(${heroBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                color: '#E6DDD2',
                padding: '0 var(--spacing-sm)'
            }}>
                <div className="hero-content">
                    <Reveal>
                        <div style={{
                            border: '1px solid rgba(166,104,45,0.35)',
                            padding: '2.5rem 3rem',
                            backdropFilter: 'blur(6px)',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(18,17,16,0.45)',
                        }}>
                            <span style={{
                                display: 'block',
                                fontSize: '0.8rem',
                                letterSpacing: '6px',
                                marginBottom: '1.25rem',
                                textTransform: 'uppercase',
                                color: '#A6682D',
                                fontWeight: 500,
                            }}>
                                ✦ Pure Vegetarian ✦
                            </span>
                            <h1 className="text-kannada" style={{
                                fontSize: 'clamp(3rem, 6vw, 6rem)',
                                marginBottom: '0.75rem',
                                color: '#E6DDD2',
                                letterSpacing: '6px',
                                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            }}>
                                BREW BROS
                            </h1>
                            <div style={{ width: '60px', height: '1px', background: '#A6682D', margin: '1rem auto' }} />
                            <h2 style={{
                                fontSize: '1.15rem', fontFamily: 'var(--font-heading)',
                                fontStyle: 'italic', fontWeight: 300,
                                color: '#AD967D', letterSpacing: '1px',
                            }}>
                                "Every Meal feels like Home"
                            </h2>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p style={{ fontSize: '1.1rem', maxWidth: '520px', margin: '2rem auto', color: '#AD967D', lineHeight: 1.9, letterSpacing: '0.3px' }}>
                            Authentic clay-pot cooking. Farm-fresh ingredients.<br />
                            The true taste of Karnataka's heritage.
                        </p>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link to="/menu" style={{
                                textDecoration: 'none', padding: '0.9rem 2.5rem', fontSize: '1rem',
                                fontWeight: 600, letterSpacing: '1px', background: '#A6682D',
                                color: '#121110', borderRadius: '50px',
                                boxShadow: '0 6px 20px rgba(166,104,45,0.4)',
                            }}>
                                Explore Menu
                            </Link>
                            <Link to="/about" style={{
                                textDecoration: 'none', padding: '0.9rem 2.5rem', fontSize: '1rem',
                                fontWeight: 600, letterSpacing: '1px', border: '1px solid #AD967D',
                                color: '#AD967D', borderRadius: '50px', background: 'transparent',
                            }}>
                                Our Story
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* INTRO SECTION */}
            <section style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center', backgroundColor: '#121110' }}>
                <div className="container">
                    <Reveal>
                        <span style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#A6682D', marginBottom: '1rem' }}>✦ BREW BROS ✦</span>
                        <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginBottom: '1.5rem', color: '#E6DDD2', letterSpacing: '1px' }}>
                            Where Every Sip Tells a Story
                        </h3>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem', color: '#AD967D', lineHeight: '1.9' }}>
                            Bold flavors, crafted drinks, and a space that feels like yours.
                            Brew Bros is where good food meets great company.
                        </p>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '1.5rem' }}>
                            {[
                                { img: imgGrid1, label: 'Signature Brews', sub: 'Crafted with precision' },
                                { img: imgGrid2, label: 'Chef Specials', sub: 'Bold & unforgettable' },
                                { img: imgGrid3, label: 'The Vibe', sub: 'Your space to unwind' },
                            ].map(({ img, label, sub }) => (
                                <div key={label} style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', border: '1px solid #2E2A26', height: '350px', cursor: 'pointer' }}
                                    onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'}
                                    onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
                                >
                                    <img src={img} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,17,16,0.92) 0%, rgba(18,17,16,0.2) 60%, transparent 100%)' }} />
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem' }}>
                                        <div style={{ width: '28px', height: '1px', background: '#A6682D', marginBottom: '0.75rem' }} />
                                        <h3 style={{ color: '#E6DDD2', fontSize: '1.3rem', margin: '0 0 0.3rem', letterSpacing: '0.5px' }}>{label}</h3>
                                        <p style={{ color: '#AD967D', fontSize: '0.85rem', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>{sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
