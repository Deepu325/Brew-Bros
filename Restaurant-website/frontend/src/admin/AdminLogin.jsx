import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, Coffee } from 'lucide-react';

export default function AdminLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(form.username, form.password);
            navigate('/admin/dashboard');
        } catch {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '1rem 1rem 1rem 3rem',
        background: '#121110', border: '1px solid #2E2A26',
        borderRadius: '8px', color: '#E6DDD2', fontSize: '1rem',
        outline: 'none', transition: 'border-color 0.2s',
    };

    return (
        <div style={{
            minHeight: '100vh', backgroundColor: '#0E0D0C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundImage: "url('/images/hero-bg.png')",
            backgroundSize: 'cover', backgroundPosition: 'center',
        }}>
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(14,13,12,0.88)' }} />

            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px', padding: '0 1.5rem' }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <Coffee size={40} color="#A6682D" style={{ marginBottom: '1rem' }} />
                    <h1 style={{ color: '#E6DDD2', fontSize: '2rem', letterSpacing: '3px', margin: 0 }}>BREW BROS</h1>
                    <span style={{ fontSize: '0.65rem', color: '#5D422D', letterSpacing: '4px', textTransform: 'uppercase' }}>Admin Panel</span>
                </div>

                {/* Card */}
                <div style={{
                    backgroundColor: '#1C1A18', border: '1px solid #2E2A26',
                    borderRadius: '12px', padding: '2.5rem',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                }}>
                    <h2 style={{ color: '#E6DDD2', fontSize: '1.3rem', marginBottom: '0.5rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Welcome back</h2>
                    <p style={{ color: '#AD967D', fontSize: '0.9rem', marginBottom: '2rem' }}>Sign in to manage your restaurant</p>

                    {error && (
                        <div style={{
                            background: 'rgba(180,50,50,0.15)', border: '1px solid rgba(180,50,50,0.4)',
                            color: '#e07070', padding: '0.85rem 1rem', borderRadius: '6px',
                            marginBottom: '1.5rem', fontSize: '0.9rem',
                        }}>{error}</div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', color: '#AD967D', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Username</label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} color="#5D422D" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input type="text" required value={form.username}
                                    onChange={e => setForm({ ...form, username: e.target.value })}
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#A6682D'}
                                    onBlur={e => e.target.style.borderColor = '#2E2A26'}
                                    placeholder="admin" />
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', color: '#AD967D', fontSize: '0.8rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} color="#5D422D" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input type="password" required value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value })}
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = '#A6682D'}
                                    onBlur={e => e.target.style.borderColor = '#2E2A26'}
                                    placeholder="••••••••" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} style={{
                            width: '100%', padding: '1rem', background: '#A6682D',
                            color: '#121110', border: 'none', borderRadius: '8px',
                            fontWeight: 700, fontSize: '1rem', letterSpacing: '1px',
                            cursor: 'pointer', transition: 'background 0.2s',
                            opacity: loading ? 0.7 : 1,
                        }}
                            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#C4853E'; }}
                            onMouseLeave={e => e.currentTarget.style.background = '#A6682D'}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
