import React from 'react';
import { Reveal } from '../components/Reveal';
import { Zap, Coffee, Users, Star } from 'lucide-react';

const aboutImg = '/images/about-img.png';

const stats = [
    { number: '5+', label: 'Years of Craft' },
    { number: '80+', label: 'Signature Drinks' },
    { number: '200+', label: 'Happy Guests Daily' },
    { number: '4.9', label: 'Avg. Rating' },
];

const values = [
    { icon: <Coffee size={28} color="#A6682D" />, title: 'Craft Every Cup', desc: 'Every brew is a deliberate act — precision, passion, and personality in every sip.' },
    { icon: <Zap size={28} color="#A6682D" />, title: 'Bold & Unapologetic', desc: 'We push flavors, break conventions, and serve experiences that linger long after the last drop.' },
    { icon: <Users size={28} color="#A6682D" />, title: 'Community First', desc: 'More than a café — a space where creatives, dreamers, and coffee lovers collide.' },
    { icon: <Star size={28} color="#A6682D" />, title: 'Obsessed with Quality', desc: 'From the beans we source to the playlists we curate — everything is intentional.' },
];

export default function About() {
    return (
        <div className="page-about" style={{ backgroundColor: '#121110' }}>

            {/* HERO HEADER */}
            <div style={{
                padding: '7rem 0', textAlign: 'center', position: 'relative',
                backgroundImage: "url('/images/hero-bg.png')",
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
                borderBottom: '1px solid #2E2A26',
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(18,17,16,0.55), rgba(18,17,16,0.4), rgba(18,17,16,0.8))' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <Reveal>
                        <span style={{ fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#A6682D' }}>✦ WHO WE ARE ✦</span>
                        <h1 style={{ color: '#E6DDD2', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '3px', margin: '1rem 0 0.5rem' }}>
                            Built Different.
                        </h1>
                        <h1 style={{ color: '#A6682D', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '3px', margin: '0 0 1.5rem' }}>
                            Brewed Better.
                        </h1>
                        <div style={{ width: '50px', height: '1px', background: '#A6682D', margin: '0 auto 1.5rem' }} />
                        <p style={{ color: '#AD967D', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
                            Brew Bros isn't just a café. It's a vibe, a ritual, a place you come back to.
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* STATS BAR */}
            <div style={{ borderBottom: '1px solid #2E2A26', backgroundColor: '#1C1A18' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', textAlign: 'center', padding: '3rem 0' }}>
                        {stats.map((s, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div style={{ padding: '1rem', borderRight: i < stats.length - 1 ? '1px solid #2E2A26' : 'none' }}>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#A6682D', lineHeight: 1 }}>{s.number}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#AD967D', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '0.5rem' }}>{s.label}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* STORY SECTION 1 */}
            <div className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: '5rem', alignItems: 'center', marginBottom: '6rem' }}>
                    <Reveal>
                        <div style={{ position: 'relative' }}>
                            <img src={aboutImg} alt="Brew Bros" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 20px 60px rgba(0,0,0,0.7)', border: '1px solid #2E2A26' }} />
                            <div style={{
                                position: 'absolute', bottom: '1.5rem', left: '1.5rem',
                                background: 'rgba(18,17,16,0.85)', border: '1px solid #2E2A26',
                                backdropFilter: 'blur(8px)', padding: '1rem 1.5rem', borderRadius: '6px',
                            }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#A6682D' }}>Est. 2019</div>
                                <div style={{ fontSize: '0.75rem', color: '#AD967D', letterSpacing: '2px', textTransform: 'uppercase' }}>Bengaluru, Karnataka</div>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div>
                            <span style={{ fontSize: '0.7rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#5D422D' }}>OUR STORY</span>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', margin: '1rem 0 1.5rem', color: '#E6DDD2', lineHeight: 1.2 }}>
                                We started with one idea —<br />
                                <span style={{ color: '#A6682D' }}>make great coffee social.</span>
                            </h2>
                            <p style={{ fontSize: '1.05rem', color: '#AD967D', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                                Brew Bros was born in a small garage in Bengaluru where three friends obsessed over espresso ratios, playlist curation, and the perfect plating. What started as weekend pop-ups turned into a full-blown café culture movement.
                            </p>
                            <p style={{ fontSize: '1.05rem', color: '#AD967D', lineHeight: 1.9 }}>
                                Today, we're known for our <strong style={{ color: '#E6DDD2' }}>signature cold brews</strong>, our <strong style={{ color: '#E6DDD2' }}>late-night bites</strong>, and a space that feels like yours the moment you walk in.
                            </p>
                        </div>
                    </Reveal>
                </div>

                {/* STORY SECTION 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: '5rem', alignItems: 'center', marginBottom: '6rem' }}>
                    <Reveal>
                        <div>
                            <span style={{ fontSize: '0.7rem', letterSpacing: '4px', textTransform: 'uppercase', color: '#5D422D' }}>THE EXPERIENCE</span>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', margin: '1rem 0 1.5rem', color: '#E6DDD2', lineHeight: 1.2 }}>
                                Not just a café.<br />
                                <span style={{ color: '#A6682D' }}>A whole mood.</span>
                            </h2>
                            <p style={{ fontSize: '1.05rem', color: '#AD967D', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                                We designed every corner of Brew Bros to feel intentional — from the warm low-lit interiors and hand-picked playlists to the menu that changes with the season and your cravings.
                            </p>
                            <p style={{ fontSize: '1.05rem', color: '#AD967D', lineHeight: 1.9 }}>
                                Whether you're here for a <strong style={{ color: '#E6DDD2' }}>solo work session</strong>, a <strong style={{ color: '#E6DDD2' }}>date night</strong>, or just killing time — we've got a corner for you and a brew with your name on it.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <img src={aboutImg} alt="Brew Bros Vibe" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 20px 60px rgba(0,0,0,0.7)', border: '1px solid #2E2A26' }} />
                    </Reveal>
                </div>

                {/* VALUES GRID */}
                <Reveal>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <span style={{ fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#A6682D' }}>✦ WHAT DRIVES US ✦</span>
                        <h2 style={{ color: '#E6DDD2', fontSize: '2.2rem', marginTop: '1rem', letterSpacing: '1px' }}>Our Core Values</h2>
                    </div>
                </Reveal>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '1.5rem' }}>
                    {values.map((v, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <div style={{
                                backgroundColor: '#1C1A18', border: '1px solid #2E2A26',
                                borderRadius: '8px', padding: '2rem',
                                transition: 'border-color 0.2s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#A6682D'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = '#2E2A26'}
                            >
                                <div style={{ marginBottom: '1rem' }}>{v.icon}</div>
                                <h3 style={{ color: '#E6DDD2', fontSize: '1.1rem', marginBottom: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{v.title}</h3>
                                <p style={{ color: '#AD967D', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
