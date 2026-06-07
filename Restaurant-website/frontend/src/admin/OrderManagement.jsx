import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import { ChevronDown, ChevronUp, RefreshCw, ShoppingBag, CalendarCheck } from 'lucide-react';

const STATUS_COLOR = {
    Pending: '#e0a840', Preparing: '#AD967D', Ready: '#70b870',
    Completed: '#A6682D', Confirmed: '#70b870', Cancelled: '#e07070',
};
const STATUS_BG = (s) => `${STATUS_COLOR[s] || '#AD967D'}18`;

const STATUS_OPTIONS_ORDER = ['Pending', 'Preparing', 'Ready', 'Completed', 'Cancelled'];
const STATUS_OPTIONS_BOOKING = ['Confirmed', 'Completed', 'Cancelled'];

const Badge = ({ status }) => (
    <span style={{
        background: STATUS_BG(status), color: STATUS_COLOR[status] || '#AD967D',
        padding: '4px 14px', borderRadius: '50px', fontSize: '0.75rem',
        fontWeight: 700, letterSpacing: '0.5px', whiteSpace: 'nowrap',
        border: `1px solid ${STATUS_COLOR[status] || '#AD967D'}40`,
    }}>{status}</span>
);

const InfoChip = ({ icon, label }) => (
    <div style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        background: '#121110', border: '1px solid #2E2A26',
        borderRadius: '6px', padding: '0.35rem 0.75rem',
        color: '#AD967D', fontSize: '0.82rem', whiteSpace: 'nowrap',
    }}>
        <span style={{ color: '#5D422D' }}>{icon}</span> {label}
    </div>
);

export default function OrderManagement() {
    const { authFetch } = useAuth();
    const [tab, setTab] = useState('bookings');
    const [orders, setOrders] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            authFetch(`${API_URL}/api/inquiries/`).then(r => r.json()),
            authFetch(`${API_URL}/api/table-bookings/`).then(r => r.json()),
        ]).then(([o, b]) => { setOrders(o); setBookings(b); setLoading(false); }).catch(console.error);
    };

    useEffect(() => { fetchData(); }, []);

    const updateStatus = async (type, id, status) => {
        const url = type === 'order' ? `${API_URL}/api/inquiries/${id}/` : `${API_URL}/api/table-bookings/${id}/`;
        await authFetch(url, { method: 'PATCH', body: JSON.stringify({ status }) });
        fetchData();
    };

    const selectStyle = {
        background: '#1C1A18', border: '1px solid #2E2A26', color: '#E6DDD2',
        borderRadius: '6px', padding: '0.45rem 0.75rem', fontSize: '0.85rem',
        cursor: 'pointer', outline: 'none', fontFamily: 'inherit',
    };

    const renderOrders = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#5D422D', border: '1px dashed #2E2A26', borderRadius: '10px' }}>
                    <ShoppingBag size={36} color="#2E2A26" style={{ marginBottom: '1rem' }} />
                    <p>No food orders yet</p>
                </div>
            )}
            {orders.map(o => {
                const isOpen = expanded === `o${o.id}`;
                let parsedItems = [];
                try { parsedItems = JSON.parse(o.items_json); } catch {}
                return (
                    <div key={o.id} style={{ background: '#1C1A18', border: `1px solid ${isOpen ? '#A6682D40' : '#2E2A26'}`, borderRadius: '10px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                        {/* Header row */}
                        <div style={{ padding: '1.1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', cursor: 'pointer' }}
                            onClick={() => setExpanded(isOpen ? null : `o${o.id}`)}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, flexWrap: 'wrap' }}>
                                <span style={{ color: '#5D422D', fontSize: '0.75rem', fontWeight: 700, minWidth: '32px' }}>#{o.id}</span>
                                <div>
                                    <div style={{ color: '#E6DDD2', fontWeight: 600, fontSize: '0.95rem' }}>{o.customer_name}</div>
                                    <div style={{ color: '#5D422D', fontSize: '0.78rem' }}>{o.phone}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginLeft: '0.5rem' }}>
                                    <InfoChip icon="🕐" label={new Date(o.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} />
                                    <InfoChip icon="🛍" label={`${parsedItems.length} item${parsedItems.length !== 1 ? 's' : ''}`} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                                <span style={{ color: '#A6682D', fontWeight: 800, fontSize: '1.1rem' }}>₹{o.total_amount}</span>
                                <Badge status={o.status} />
                                <select value={o.status} onChange={e => updateStatus('order', o.id, e.target.value)} style={selectStyle}>
                                    {STATUS_OPTIONS_ORDER.map(s => <option key={s} value={s} style={{ background: '#1C1A18' }}>{s}</option>)}
                                </select>
                                {isOpen ? <ChevronUp size={16} color="#5D422D" /> : <ChevronDown size={16} color="#5D422D" />}
                            </div>
                        </div>

                        {/* Expanded items */}
                        {isOpen && (
                            <div style={{ borderTop: '1px solid #2E2A26', padding: '1.25rem 1.5rem', background: '#161412' }}>
                                <p style={{ color: '#5D422D', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Order Items</p>
                                {parsedItems.length === 0
                                    ? <p style={{ color: '#5D422D', fontSize: '0.9rem' }}>No items found</p>
                                    : <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        {parsedItems.map((item, i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: '#1C1A18', borderRadius: '6px', border: '1px solid #2E2A26' }}>
                                                <span style={{ color: '#E6DDD2', fontSize: '0.9rem' }}>{item.name}</span>
                                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                                    <span style={{ color: '#AD967D', fontSize: '0.85rem' }}>× {item.qty ?? item.quantity ?? 1}</span>
                                                    <span style={{ color: '#A6682D', fontWeight: 700, fontSize: '0.9rem' }}>₹{(parseFloat(item.price) * (item.qty ?? item.quantity ?? 1)).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        ))}
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #2E2A26' }}>
                                            <span style={{ color: '#E6DDD2', fontWeight: 700 }}>Total: <span style={{ color: '#A6682D' }}>₹{o.total_amount}</span></span>
                                        </div>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );

    const renderBookings = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {bookings.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#5D422D', border: '1px dashed #2E2A26', borderRadius: '10px' }}>
                    <CalendarCheck size={36} color="#2E2A26" style={{ marginBottom: '1rem' }} />
                    <p>No table bookings yet</p>
                </div>
            )}
            {bookings.map(b => (
                <div key={b.id} style={{ background: '#1C1A18', border: '1px solid #2E2A26', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ padding: '1.1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                        {/* Left info */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, flexWrap: 'wrap' }}>
                            <span style={{ color: '#5D422D', fontSize: '0.75rem', fontWeight: 700 }}>#{b.id}</span>
                            <div>
                                <div style={{ color: '#E6DDD2', fontWeight: 600, fontSize: '0.95rem' }}>{b.customer_name}</div>
                                <div style={{ color: '#5D422D', fontSize: '0.78rem' }}>{b.phone}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <InfoChip icon="📅" label={b.date} />
                                <InfoChip icon="🕐" label={b.time_slot} />
                                <InfoChip icon="👥" label={`${b.guests} guests`} />
                                <InfoChip icon="🪑" label={`Table #${b.table_number}`} />
                                {b.special_requests && <InfoChip icon="📝" label={b.special_requests} />}
                            </div>
                        </div>
                        {/* Right controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                            <Badge status={b.status} />
                            <select value={b.status} onChange={e => updateStatus('booking', b.id, e.target.value)} style={selectStyle}>
                                {STATUS_OPTIONS_BOOKING.map(s => <option key={s} value={s} style={{ background: '#1C1A18' }}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <AdminLayout>
            {/* Page header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ color: '#E6DDD2', fontSize: '1.5rem', margin: 0 }}>Order Management</h2>
                    <p style={{ color: '#AD967D', fontSize: '0.85rem', marginTop: '0.25rem' }}>Manage food orders and table reservations</p>
                </div>
                <button onClick={fetchData} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.1rem', background: '#1C1A18', border: '1px solid #2E2A26', color: '#AD967D', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <RefreshCw size={15} /> Refresh
                </button>
            </div>

            {/* Tab bar */}
            <div style={{ display: 'flex', gap: '0', marginBottom: '1.75rem', background: '#1C1A18', border: '1px solid #2E2A26', borderRadius: '8px', padding: '4px', width: 'fit-content' }}>
                {[['orders', <ShoppingBag size={15} />, `Food Orders`, orders.length],
                  ['bookings', <CalendarCheck size={15} />, `Table Bookings`, bookings.length]].map(([id, icon, label, count]) => (
                    <button key={id} onClick={() => setTab(id)} style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.6rem 1.25rem', border: 'none', borderRadius: '6px',
                        cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem',
                        background: tab === id ? '#A6682D' : 'transparent',
                        color: tab === id ? '#121110' : '#AD967D',
                        transition: 'all 0.2s',
                    }}>
                        {icon} {label}
                        <span style={{ background: tab === id ? 'rgba(18,17,16,0.25)' : '#2E2A26', color: tab === id ? '#121110' : '#5D422D', borderRadius: '50px', padding: '1px 8px', fontSize: '0.75rem', fontWeight: 700 }}>{count}</span>
                    </button>
                ))}
            </div>

            {loading
                ? <div style={{ textAlign: 'center', padding: '4rem', color: '#AD967D' }}>Loading...</div>
                : tab === 'orders' ? renderOrders() : renderBookings()
            }
        </AdminLayout>
    );
}
