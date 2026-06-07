import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { API_URL } from '../config';

const inputStyle = {
    width: '100%', padding: '0.9rem 1rem', background: '#121110',
    border: '1px solid #2E2A26', borderRadius: '8px', color: '#E6DDD2',
    fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
};
const labelStyle = {
    display: 'block', color: '#AD967D', fontSize: '0.78rem',
    textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem', fontWeight: 600,
};

const resolveImageSrc = (img) => {
    if (!img) return null;
    if (img.startsWith('http://') || img.startsWith('https://')) return img;
    if (!img.startsWith('/')) return `${API_URL}/${img}`;
    return `${API_URL}${img}`;
};

export default function Cart() {
    const { cartItems, removeFromCart, updateQty, clearCart, totalPrice, gstAmount, grandTotal } = useCart();
    const [formData, setFormData] = useState({ name: '', phone: '', message: '', tableNumber: '' });
    const [orderType, setOrderType] = useState('takeaway');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;
        if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
            alert('Razorpay public key is not configured. Please set VITE_RAZORPAY_KEY_ID in frontend/.env.');
            return;
        }
        if (!window.Razorpay) {
            alert('Razorpay SDK is not loaded. Please refresh the page.');
            return;
        }

        setSubmitting(true);

        // Step 1: Create Razorpay order on backend
        fetch(`${API_URL}/api/payment/create-order/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: grandTotal }),
        })
            .then(r => r.json())
            .then(rzpOrder => {
                if (!rzpOrder.order_id) throw new Error(rzpOrder.error || 'Failed to create payment order');

                // Step 2: Open Razorpay checkout
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                    amount: rzpOrder.amount,
                    currency: rzpOrder.currency,
                    name: 'Brew Bros',
                    description: 'Food Order',
                    order_id: rzpOrder.order_id,
                    prefill: { name: formData.name, contact: formData.phone },
                    theme: { color: '#A6682D' },
                    handler(response) {
                        // Step 3: Save inquiry with payment ID
                        fetch(`${API_URL}/api/inquiries/`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                customer_name: formData.name,
                                phone: formData.phone,
                                message: formData.message,
                                items_json: JSON.stringify(cartItems),
                                total_amount: grandTotal,
                                order_type: orderType,
                                table_number: orderType === 'dine_in' ? formData.tableNumber : null,
                                payment_id: response.razorpay_payment_id,
                                razorpay_order_id: rzpOrder.order_id,
                                status: 'Pending',
                            }),
                        })
                            .then(res => {
                                if (res.ok) {
                                    clearCart();
                                    navigate('/thank-you', { state: { type: 'order', customerName: formData.name, phone: formData.phone, totalAmount: grandTotal, orderType, tableNumber: formData.tableNumber } });
                                } else {
                                    alert('Order save failed. Contact support with payment ID: ' + response.razorpay_payment_id);
                                }
                            })
                            .catch(() => alert('Order save failed. Contact support with payment ID: ' + response.razorpay_payment_id))
                            .finally(() => setSubmitting(false));
                    },
                    modal: { ondismiss() { setSubmitting(false); } },
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            })
            .catch(err => { alert(err.message || 'Payment error.'); setSubmitting(false); });
    };

    // Empty state
    if (cartItems.length === 0) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121110', textAlign: 'center', padding: '2rem' }}>
                <div style={{ background: '#1C1A18', border: '1px solid #2E2A26', padding: '2.5rem', borderRadius: '50%', marginBottom: '2rem' }}>
                    <ShoppingBag size={56} color="#5D422D" />
                </div>
                <h2 style={{ color: '#E6DDD2', fontSize: '1.8rem', marginBottom: '0.75rem' }}>Your cart is empty</h2>
                <p style={{ color: '#AD967D', fontSize: '1rem', marginBottom: '2rem', maxWidth: '320px', lineHeight: 1.7 }}>
                    Looks like you haven't added anything yet. Browse our menu and find something you'll love.
                </p>
                <Link to="/menu" style={{
                    textDecoration: 'none', padding: '0.9rem 2rem', background: '#A6682D',
                    color: '#121110', borderRadius: '50px', fontWeight: 700, fontSize: '0.95rem',
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                    boxShadow: '0 6px 20px rgba(166,104,45,0.35)',
                }}>
                    Browse Menu <ArrowRight size={16} />
                </Link>
            </div>
        );
    }

    const itemCount = cartItems.reduce((a, i) => a + i.qty, 0);

    return (
        <div className="page-cart" style={{ backgroundColor: '#121110', minHeight: '100vh' }}>
            {/* Page header */}
            <div style={{
                padding: '3.5rem 0', textAlign: 'center', position: 'relative',
                backgroundImage: "url('/images/hero-bg.png')",
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
                borderBottom: '1px solid #2E2A26',
            }}>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(18,17,16,0.82)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#A6682D' }}>✦ YOUR ORDER ✦</span>
                    <h1 style={{ color: '#E6DDD2', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '2px', margin: '0.75rem 0 0' }}>Review & Confirm</h1>
                </div>
            </div>

            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))', gap: '2.5rem', alignItems: 'start' }}>

                    {/* LEFT — Cart Items */}
                    <Reveal>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                <h3 style={{ color: '#E6DDD2', fontSize: '1.1rem', fontFamily: 'var(--font-body)', fontWeight: 600, margin: 0 }}>
                                    Order Items <span style={{ color: '#5D422D', fontSize: '0.85rem', fontWeight: 400 }}>({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                                </h3>
                                <button onClick={clearCart} style={{ background: 'none', border: 'none', color: '#5D422D', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#e07070'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#5D422D'}
                                >
                                    <Trash2 size={13} /> Clear all
                                </button>
                            </div>

                            {/* Items */}
                            <div style={{ background: '#1C1A18', border: '1px solid #2E2A26', borderRadius: '12px', overflow: 'hidden' }}>
                                {cartItems.map((item, i) => (
                                    <div key={item.id} style={{
                                        display: 'flex', alignItems: 'center', gap: '1rem',
                                        padding: '1.1rem 1.25rem',
                                        borderBottom: i < cartItems.length - 1 ? '1px solid #2E2A26' : 'none',
                                        transition: 'background 0.15s',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#201E1C'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                    >
                                        {/* Item image or placeholder */}
                                        <div style={{ width: '52px', height: '52px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#2E2A26' }}>
                                            {(item.image || item.image_url) ? (
                                                <img src={resolveImageSrc(item.image || item.image_url)} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Tag size={18} color="#5D422D" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Name + price */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ color: '#E6DDD2', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                                            <div style={{ color: '#AD967D', fontSize: '0.82rem' }}>₹{item.price} each</div>
                                        </div>

                                        {/* Qty controls */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0', background: '#121110', border: '1px solid #2E2A26', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                            <button onClick={() => updateQty(item.id, -1)} style={{ padding: '0.45rem 0.75rem', background: 'none', border: 'none', color: '#AD967D', cursor: 'pointer', fontSize: '1rem', fontWeight: 700, transition: 'color 0.15s' }}
                                                onMouseEnter={e => e.currentTarget.style.color = '#E6DDD2'}
                                                onMouseLeave={e => e.currentTarget.style.color = '#AD967D'}
                                            >
                                                <Minus size={13} />
                                            </button>
                                            <span style={{ padding: '0 0.6rem', color: '#E6DDD2', fontWeight: 700, fontSize: '0.95rem', minWidth: '28px', textAlign: 'center', borderLeft: '1px solid #2E2A26', borderRight: '1px solid #2E2A26' }}>{item.qty}</span>
                                            <button onClick={() => updateQty(item.id, 1)} style={{ padding: '0.45rem 0.75rem', background: 'none', border: 'none', color: '#AD967D', cursor: 'pointer', fontSize: '1rem', fontWeight: 700, transition: 'color 0.15s' }}
                                                onMouseEnter={e => e.currentTarget.style.color = '#E6DDD2'}
                                                onMouseLeave={e => e.currentTarget.style.color = '#AD967D'}
                                            >
                                                <Plus size={13} />
                                            </button>
                                        </div>

                                        {/* Subtotal */}
                                        <div style={{ color: '#A6682D', fontWeight: 700, fontSize: '0.95rem', minWidth: '60px', textAlign: 'right', flexShrink: 0 }}>
                                            ₹{(item.price * item.qty).toFixed(0)}
                                        </div>

                                        {/* Remove */}
                                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#2E2A26', cursor: 'pointer', padding: '0.35rem', borderRadius: '6px', flexShrink: 0, transition: 'color 0.2s' }}
                                            onMouseEnter={e => e.currentTarget.style.color = '#e07070'}
                                            onMouseLeave={e => e.currentTarget.style.color = '#2E2A26'}
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                ))}

                                {/* Total row */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', background: '#161412', borderTop: '1px solid #2E2A26' }}>
                                    <div>
                                        <div style={{ color: '#5D422D', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.2rem' }}>Total</div>
                                        <div style={{ color: '#AD967D', fontSize: '0.82rem' }}>{itemCount} {itemCount === 1 ? 'item' : 'items'}</div>
                                        <div style={{ color: '#5D422D', fontSize: '0.75rem', marginTop: '0.15rem' }}>incl. GST ₹{gstAmount.toFixed(2)}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ color: '#5D422D', fontSize: '0.75rem', textDecoration: 'line-through', marginBottom: '0.1rem' }}>₹{totalPrice.toFixed(2)}</div>
                                        <div style={{ color: '#A6682D', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>₹{grandTotal.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Continue shopping */}
                            <Link to="/menu" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#5D422D', fontSize: '0.82rem', textDecoration: 'none', marginTop: '1rem', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#A6682D'}
                                onMouseLeave={e => e.currentTarget.style.color = '#5D422D'}
                            >
                                ← Continue shopping
                            </Link>
                        </div>
                    </Reveal>

                    {/* RIGHT — Order form */}
                    <Reveal delay={0.15}>
                        <div style={{ background: '#1C1A18', border: '1px solid #2E2A26', borderRadius: '12px', overflow: 'hidden', position: 'sticky', top: '90px' }}>
                            <div style={{ padding: '1.5rem', borderBottom: '1px solid #2E2A26' }}>
                                <h3 style={{ color: '#E6DDD2', margin: 0, fontSize: '1.1rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>Place Your Order</h3>
                                <p style={{ color: '#5D422D', fontSize: '0.8rem', marginTop: '0.3rem' }}>We'll call you to confirm</p>
                            </div>

                            <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                                {/* Order type toggle */}
                                <div style={{ display: 'flex', background: '#121110', border: '1px solid #2E2A26', borderRadius: '8px', overflow: 'hidden' }}>
                                    {['takeaway', 'dine_in'].map(type => (
                                        <button key={type} type="button" onClick={() => setOrderType(type)}
                                            style={{
                                                flex: 1, padding: '0.7rem', border: 'none', cursor: 'pointer',
                                                fontWeight: 600, fontSize: '0.88rem', transition: 'background 0.2s, color 0.2s',
                                                background: orderType === type ? '#A6682D' : 'transparent',
                                                color: orderType === type ? '#121110' : '#AD967D',
                                            }}
                                        >
                                            {type === 'takeaway' ? '🥡 Takeaway' : '🍽️ Dine In'}
                                        </button>
                                    ))}
                                </div>

                                {orderType === 'dine_in' && (
                                    <div>
                                        <label style={labelStyle}>Table Number</label>
                                        <input required type="text" value={formData.tableNumber}
                                            onChange={e => setFormData({ ...formData, tableNumber: e.target.value })}
                                            style={inputStyle} placeholder="e.g. 5"
                                            onFocus={e => e.target.style.borderColor = '#A6682D'}
                                            onBlur={e => e.target.style.borderColor = '#2E2A26'}
                                        />
                                    </div>
                                )}

                                <div>
                                    <label style={labelStyle}>Your Name</label>
                                    <input required type="text" value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        style={inputStyle} placeholder="Full name"
                                        onFocus={e => e.target.style.borderColor = '#A6682D'}
                                        onBlur={e => e.target.style.borderColor = '#2E2A26'}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Phone Number</label>
                                    <input required type="tel" value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        style={inputStyle} placeholder="+91 XXXXX XXXXX"
                                        onFocus={e => e.target.style.borderColor = '#A6682D'}
                                        onBlur={e => e.target.style.borderColor = '#2E2A26'}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Special Requests <span style={{ color: '#5D422D', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                                    <textarea value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        style={{ ...inputStyle, minHeight: '90px', resize: 'vertical' }}
                                        placeholder="Allergies, preferences, delivery notes..."
                                        onFocus={e => e.target.style.borderColor = '#A6682D'}
                                        onBlur={e => e.target.style.borderColor = '#2E2A26'}
                                    />
                                </div>

                                {/* Order summary mini */}
                                <div style={{ background: '#121110', border: '1px solid #2E2A26', borderRadius: '8px', padding: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                        <span style={{ color: '#AD967D', fontSize: '0.85rem' }}>Subtotal ({itemCount} items)</span>
                                        <span style={{ color: '#E6DDD2', fontSize: '0.85rem' }}>₹{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                        <span style={{ color: '#AD967D', fontSize: '0.85rem' }}>GST (5%)</span>
                                        <span style={{ color: '#AD967D', fontSize: '0.85rem' }}>₹{gstAmount.toFixed(2)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.6rem', borderTop: '1px solid #2E2A26' }}>
                                        <span style={{ color: '#AD967D', fontSize: '0.9rem', fontWeight: 600 }}>Total</span>
                                        <span style={{ color: '#A6682D', fontSize: '1.1rem', fontWeight: 800 }}>₹{grandTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button type="submit" disabled={submitting} style={{
                                    padding: '1rem', background: submitting ? '#5D422D' : '#A6682D',
                                    color: '#121110', border: 'none', borderRadius: '8px',
                                    fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer',
                                    fontSize: '1rem', letterSpacing: '0.5px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                    boxShadow: '0 6px 20px rgba(166,104,45,0.3)',
                                    transition: 'background 0.2s, box-shadow 0.2s',
                                }}
                                    onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = '#C4853E'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = submitting ? '#5D422D' : '#A6682D'; }}
                                >
                                    {submitting ? 'Placing Order...' : <>Confirm Order <ArrowRight size={16} /></>}
                                </button>

                                <p style={{ color: '#5D422D', fontSize: '0.75rem', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
                                    We process payments manually. Our team will call you shortly to confirm.
                                </p>
                            </form>
                        </div>
                    </Reveal>

                </div>
            </div>
        </div>
    );
}
