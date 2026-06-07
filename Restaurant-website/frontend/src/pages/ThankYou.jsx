import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CircleCheckBig, Calendar, Clock, Users, Phone, Home, UtensilsCrossed } from 'lucide-react';
import { Reveal } from '../components/Reveal';

const InfoRow = ({ icon, label, value }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid #2E2A26' }}>
        <div style={{ background: 'rgba(166,104,45,0.12)', border: '1px solid #A6682D40', borderRadius: '8px', padding: '0.6rem', flexShrink: 0, display: 'flex' }}>
            {React.cloneElement(icon, { size: 18, color: '#A6682D' })}
        </div>
        <div>
            <div style={{ color: '#5D422D', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.15rem' }}>{label}</div>
            <div style={{ color: '#E6DDD2', fontWeight: 600, fontSize: '0.95rem' }}>{value}</div>
        </div>
    </div>
);

export default function ThankYou() {
    const location = useLocation();
    const orderData = location.state || {};
    const isTableBooking = orderData.type === 'table_booking';
    const isDineIn = orderData.orderType === 'dine_in';

    return (
        <div style={{
            minHeight: '100vh', backgroundColor: '#121110',
            backgroundImage: "url('/images/hero-bg.png')",
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
            position: 'relative',
        }}>
            {/* Overlay */}
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(18,17,16,0.88)' }} />

            <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '560px' }}>
                <Reveal>
                    <div style={{
                        background: '#1C1A18', border: '1px solid #2E2A26',
                        borderRadius: '16px', overflow: 'hidden',
                        boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
                    }}>
                        {/* Top accent bar */}
                        <div style={{ height: '3px', background: 'linear-gradient(to right, #5D422D, #A6682D, #5D422D)' }} />

                        <div style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
                            {/* Icon */}
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                background: 'rgba(112,184,112,0.1)', border: '2px solid rgba(112,184,112,0.4)',
                                borderRadius: '50%', padding: '1.5rem', marginBottom: '1.75rem',
                                animation: 'popIn 0.5s cubic-bezier(0.22,1,0.36,1)',
                            }}>
                                <CircleCheckBig size={52} color="#70b870" strokeWidth={1.8} />
                            </div>

                            {/* Eyebrow */}
                            <span style={{ fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#A6682D' }}>
                                ✦ {isTableBooking ? 'Reservation Confirmed' : 'Order Received'} ✦
                            </span>

                            {/* Heading */}
                            <h1 style={{ color: '#E6DDD2', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '1px', margin: '0.75rem 0 0.75rem', fontFamily: 'var(--font-heading)' }}>
                                {isTableBooking ? 'Table Reserved!' : "You're all set!"}
                            </h1>

                            {/* Subtext */}
                            <p style={{ color: '#AD967D', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                                Thank you, <strong style={{ color: '#E6DDD2' }}>{orderData.customerName || 'Guest'}</strong>!{' '}
                                {isTableBooking
                                    ? 'Your table has been reserved. We look forward to having you.'
                                    : isDineIn
                                        ? 'Your order is confirmed. Your food will be served at your table shortly.'
                                        : "We've got your order. We'll call you when it's ready for pickup."}
                            </p>
                        </div>

                        {/* Details card */}
                        <div style={{ margin: '0 2.5rem 2rem', background: '#121110', border: '1px solid #2E2A26', borderRadius: '10px', padding: '0.25rem 1.25rem' }}>
                            {isTableBooking ? (
                                <>
                                    <InfoRow icon={<Calendar />} label="Date" value={orderData.date || '—'} />
                                    <InfoRow icon={<Clock />} label="Time Slot" value={orderData.timeSlot || '—'} />
                                    <InfoRow icon={<Users />} label="Guests" value={`${orderData.guests || '—'} ${orderData.guests === 1 ? 'Guest' : 'Guests'}`} />
                                    <InfoRow icon={<UtensilsCrossed />} label="Table Number" value={`Table #${orderData.tableNumber || 'TBD'}`} />
                                    <InfoRow icon={<Phone />} label="Contact" value={orderData.phone || '—'} />
                                </>
                            ) : (
                                <>
                                    {isDineIn
                                        ? <InfoRow icon={<UtensilsCrossed />} label="Table Number" value={`Table #${orderData.tableNumber || '—'}`} />
                                        : <InfoRow icon={<Phone />} label="We'll call you at" value={orderData.phone || '—'} />
                                    }
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
                                        <span style={{ color: '#AD967D', fontSize: '0.9rem' }}>Order Total</span>
                                        <span style={{ color: '#A6682D', fontWeight: 800, fontSize: '1.6rem' }}>₹{orderData.totalAmount || '0'}</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* What's next */}
                        <div style={{ margin: '0 2.5rem 2.5rem', background: 'rgba(166,104,45,0.06)', border: '1px dashed #A6682D40', borderRadius: '10px', padding: '1.25rem' }}>
                            <div style={{ color: '#A6682D', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem', fontWeight: 600 }}>What's Next</div>
                            <p style={{ color: '#AD967D', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                                {isTableBooking
                                    ? 'Please arrive 10 minutes before your slot. For changes, call us at +91 98765 43210.'
                                    : isDineIn
                                        ? 'Sit back and relax! Our team has received your order and will bring it to your table shortly.'
                                        : 'Our team will call you within 15–30 minutes to confirm your order and let you know when it\'s ready for pickup.'}
                            </p>
                        </div>

                        {/* CTAs */}
                        <div style={{ display: 'flex', gap: '0.75rem', padding: '0 2.5rem 2.5rem', flexWrap: 'wrap' }}>
                            <Link to="/" style={{
                                flex: 1, textDecoration: 'none', padding: '0.9rem',
                                background: '#A6682D', color: '#121110', borderRadius: '8px',
                                fontWeight: 700, fontSize: '0.9rem', textAlign: 'center',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                boxShadow: '0 4px 14px rgba(166,104,45,0.35)',
                            }}>
                                <Home size={15} /> Home
                            </Link>
                            <Link to="/menu" style={{
                                flex: 1, textDecoration: 'none', padding: '0.9rem',
                                background: 'transparent', color: '#AD967D',
                                border: '1px solid #2E2A26', borderRadius: '8px',
                                fontWeight: 600, fontSize: '0.9rem', textAlign: 'center',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                            }}>
                                <UtensilsCrossed size={15} /> Menu
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>

            <style>{`
                @keyframes popIn {
                    0% { transform: scale(0.6); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
