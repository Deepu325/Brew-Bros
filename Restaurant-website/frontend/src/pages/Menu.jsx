import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { API_URL } from '../config';
const menuHeaderBg = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'; // Traditional Indian food spread

const PageHeader = ({ title, subtitle }) => (
    <div style={{
        padding: '6rem 0',
        textAlign: 'center',
        marginBottom: '4rem',
        backgroundImage: `linear-gradient(to bottom, rgba(18,17,16,0.6) 0%, rgba(18,17,16,0.4) 50%, rgba(18,17,16,0.75) 100%), url(${menuHeaderBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        borderBottom: '1px solid #2E2A26',
    }}>
        <Reveal>
            <span style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#A6682D', marginBottom: '1rem' }}>✦ BREW BROS ✦</span>
            <h1 style={{ color: '#E6DDD2', fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '2px' }}>{title}</h1>
            <div style={{ width: '50px', height: '1px', background: '#A6682D', margin: '0 auto 1.25rem' }} />
            <p style={{ color: '#AD967D', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>{subtitle}</p>
        </Reveal>
    </div>
);

export default function Menu() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`${API_URL}/api/categories/`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching menu:", err);
                setLoading(false);
            });
    }, []);

    const resolveImageSrc = (img) => {
        if (!img) return null;
        // already absolute
        if (img.startsWith('http://') || img.startsWith('https://')) return img;
        // already begins with API_URL (avoid duplication)
        if (img.startsWith(API_URL)) return img;
        // ensure leading slash
        if (!img.startsWith('/')) return `${API_URL}/${img}`;
        return `${API_URL}${img}`;
    };

    if (loading) return (
        <div style={{ padding: '8rem', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--color-primary)', fontSize: '2rem' }}>Cooking your menu...</h2>
        </div>
    );

    return (
        <div className="page-menu">
            <PageHeader
                title="Taste the Tradition"
                subtitle="Wholesome, pure vegetarian delicacies cooked in authentic clay pots."
            />

            <div className="container" style={{ paddingBottom: '6rem' }}>
                {categories.map((category, catIndex) => (
                    <div key={category.id} style={{ marginBottom: '6rem' }}>
                        <Reveal delay={catIndex * 0.1}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
                                <div style={{ height: '1px', background: '#2E2A26', flex: 1 }}></div>
                                <h2 className="text-kannada" style={{ color: '#A6682D', fontSize: '2.2rem', whiteSpace: 'nowrap', letterSpacing: '2px' }}>{category.name}</h2>
                                <div style={{ height: '1px', background: '#2E2A26', flex: 1 }}></div>
                            </div>
                        </Reveal>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '2.5rem' }}>
                            {category.items.map((item, itemIndex) => (
                                <Reveal key={item.id} delay={(catIndex * 0.1) + (itemIndex * 0.05)}>
                                    <div className="menu-card" style={{
                                        backgroundColor: '#1C1A18',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        border: '1px solid #2E2A26'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-10px)';
                                            e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
                                        }}>
                                        <div style={{ height: '220px', overflow: 'hidden', background: '#2E2A26' }}>
                                            {(item.image || item.image_url) ? (
                                                <img
                                                    src={resolveImageSrc(item.image || item.image_url)}
                                                    alt={item.name}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5D422D', fontSize: '0.85rem' }}>
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                                                <h3 style={{ fontSize: '1.2rem', margin: 0, color: '#E6DDD2' }}>{item.name}</h3>
                                                <span style={{
                                                    backgroundColor: item.is_spicy ? 'rgba(180,50,50,0.15)' : 'rgba(50,120,50,0.15)',
                                                    color: item.is_spicy ? '#e07070' : '#70b870',
                                                    padding: '3px 10px', borderRadius: '50px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '1px'
                                                }}>
                                                    {item.is_spicy ? 'SPICY' : 'MILD'}
                                                </span>
                                            </div>
                                            <p style={{ color: '#AD967D', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1, lineHeight: '1.6' }}>
                                                {item.description}
                                            </p>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid #2E2A26' }}>
                                                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#A6682D' }}>
                                                    ₹{item.price}
                                                </span>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    style={{
                                                        padding: '0.55rem 1.25rem', borderRadius: '8px', border: '1px solid #A6682D',
                                                        background: 'transparent', color: '#A6682D', fontWeight: 600,
                                                        fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onMouseEnter={e => { e.currentTarget.style.background = '#A6682D'; e.currentTarget.style.color = '#121110'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#A6682D'; }}
                                                >
                                                    <Plus size={16} /> Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
