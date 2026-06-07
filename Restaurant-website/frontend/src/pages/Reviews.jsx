import React, { useState, useEffect } from 'react';
import { Star, User, MessageCircle } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { API_URL } from '../config';
const reviewsBg = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'; // Food background

const PageHeader = ({ title, subtitle }) => (
    <div style={{
        padding: '6rem 0',
        textAlign: 'center',
        marginBottom: '4rem',
        backgroundImage: `linear-gradient(to bottom, rgba(18,17,16,0.6) 0%, rgba(18,17,16,0.4) 50%, rgba(18,17,16,0.75) 100%), url(${reviewsBg})`,
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

export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ customer_name: '', rating: 5, comment: '' });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const fetchReviews = () => {
        fetch(`${API_URL}/api/reviews/`)
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching reviews:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        fetch(`${API_URL}/api/reviews/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => {
                if (res.ok) {
                    setFormData({ customer_name: '', rating: 5, comment: '' }); // Reset form
                    setMessage({ type: 'success', text: 'Thank you for your review! It means a lot to us.' });
                    fetchReviews(); // Refresh list
                } else {
                    setMessage({ type: 'error', text: 'Failed to submit review. Please try again.' });
                }
            })
            .catch(() => setMessage({ type: 'error', text: 'Network error.' }))
            .finally(() => setSubmitting(false));
    };

    return (
        <div className="page-reviews">
            <PageHeader
                title="Guest Journals"
                subtitle="Stories of spice, clay, and tradition shared by our beloved guests."
            />

            <div className="container" style={{ paddingBottom: '6rem' }}>

                {/* REVIEWS GRID */}
                {loading ? (
                    <p className="text-center" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>Reading the journals...</p>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '2.5rem',
                        marginBottom: '6rem'
                    }}>
                        {reviews.length === 0 ? (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', backgroundColor: '#1C1A18', borderRadius: '12px', border: '1px solid #2E2A26' }}>
                                <MessageCircle size={48} color="var(--color-text-muted)" style={{ marginBottom: '1rem' }} />
                                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>The journal is empty. Be the first to share your experience!</p>
                            </div>
                        ) : (
                            reviews.map((review, index) => (
                                <Reveal key={review.id} delay={index * 0.1}>
                                    <div style={{
                                        backgroundColor: '#1C1A18',
                                        padding: '2.5rem',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                                        borderBottom: '2px solid #A6682D',
                                        border: '1px solid #2E2A26',
                                        position: 'relative',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div style={{ position: 'absolute', top: '15px', right: '20px', opacity: 0.1 }}>
                                            <MessageCircle size={60} color="var(--color-secondary)" />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.05rem', color: '#E6DDD2' }}>
                                                <div style={{ background: '#2E2A26', padding: '0.6rem', borderRadius: '50%' }}>
                                                    <User size={20} color="#A6682D" />
                                                </div>
                                                {review.customer_name}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', marginBottom: '1rem' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={18} fill={i < review.rating ? "#FFC107" : "none"} stroke={i < review.rating ? "#FFC107" : "#ccc"} />
                                            ))}
                                        </div>
                                        <p style={{ color: '#AD967D', lineHeight: '1.8', fontStyle: 'italic', fontSize: '1rem', flex: 1 }}>
                                            "{review.comment}"
                                        </p>
                                        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #2E2A26' }}>
                                            <small style={{ color: '#5D422D', fontWeight: 600 }}>
                                                {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </small>
                                        </div>
                                    </div>
                                </Reveal>
                            ))
                        )}
                    </div>
                )}

                {/* WRITE A REVIEW FORM */}
                <Reveal>
                    <div style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        backgroundColor: '#1C1A18',
                        padding: '4rem',
                        borderRadius: '12px',
                        boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
                        border: '1px solid #2E2A26'
                    }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#A6682D', fontSize: '2rem' }}>Share Your Story</h3>
                        <p style={{ textAlign: 'center', color: '#AD967D', marginBottom: '2.5rem' }}>How was your clay-pot experience at BREW BROS?</p>

                        {message && (
                            <div style={{
                                padding: '1.2rem', marginBottom: '2rem', borderRadius: '8px',
                                backgroundColor: message.type === 'success' ? 'rgba(50,120,50,0.15)' : 'rgba(180,50,50,0.15)',
                                color: message.type === 'success' ? '#70b870' : '#e07070',
                                fontWeight: 600, textAlign: 'center', border: `1px solid ${message.type === 'success' ? '#70b870' : '#e07070'}`
                            }}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#E6DDD2' }}>Guest Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.customer_name}
                                    onChange={e => setFormData({ ...formData, customer_name: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #2E2A26', fontSize: '1rem', outline: 'none', background: '#121110', color: '#E6DDD2', transition: 'border-color 0.3s' }}
                                    onFocus={e => e.target.style.borderColor = '#A6682D'}
                                    onBlur={e => e.target.style.borderColor = '#2E2A26'}
                                    placeholder="Your name"
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Your Rating</label>
                                <div style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <Star
                                            key={star}
                                            size={40}
                                            onClick={() => setFormData({ ...formData, rating: star })}
                                            fill={star <= formData.rating ? "#FFC107" : "none"}
                                            stroke={star <= formData.rating ? "#FFC107" : "#ccc"}
                                            style={{ transition: 'transform 0.2s', transform: star <= formData.rating ? 'scale(1.1)' : 'scale(1)' }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#E6DDD2' }}>Share Your Experience</label>
                                <textarea
                                    required
                                    value={formData.comment}
                                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                                    style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #2E2A26', fontSize: '1rem', minHeight: '150px', outline: 'none', fontFamily: 'inherit', lineHeight: '1.6', background: '#121110', color: '#E6DDD2', transition: 'border-color 0.3s' }}
                                    onFocus={e => e.target.style.borderColor = '#A6682D'}
                                    onBlur={e => e.target.style.borderColor = '#2E2A26'}
                                    placeholder="What did you love about the food and ambience?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', padding: '1.2rem', fontSize: '1.1rem', borderRadius: '12px' }}
                            >
                                {submitting ? 'Sharing...' : 'Publish My Story'}
                            </button>
                        </form>
                    </div>
                </Reveal>

            </div>
        </div>
    );
}
