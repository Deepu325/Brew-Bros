import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import { RefreshCw } from 'lucide-react';

const STATUS_FLOW = ['Pending', 'Preparing', 'Ready', 'Completed'];

const statusColor = (s) => ({
    'Pending': '#e0a840', 'Preparing': '#AD967D', 'Ready': '#70b870', 'Completed': '#5D422D'
}[s] || '#AD967D');

const statusBg = (s) => ({
    'Pending': 'rgba(224,168,64,0.12)', 'Preparing': 'rgba(173,150,125,0.12)',
    'Ready': 'rgba(112,184,112,0.12)', 'Completed': 'rgba(93,66,45,0.12)'
}[s] || '#1C1A18');

export default function KitchenView() {
    const { authFetch } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchOrders = () => {
        authFetch(`${API_URL}/api/inquiries/`).then(r => r.json())
            .then(data => {
                const active = data.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled');
                setOrders(active);
                setLastUpdated(new Date());
                setLoading(false);
            }).catch(console.error);
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 30000); // auto-refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const nextStatus = (current) => {
        const idx = STATUS_FLOW.indexOf(current);
        return STATUS_FLOW[idx + 1] || current;
    };

    const updateStatus = async (id, status) => {
        await authFetch(`${API_URL}/api/inquiries/${id}/`, { method: 'PATCH', body: JSON.stringify({ status }) });
        fetchOrders();
    };

    const columns = STATUS_FLOW.slice(0, 3); // Pending, Preparing, Ready

    return (
        <AdminLayout>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ color: '#E6DDD2', fontSize: '1.5rem', margin: 0 }}>Kitchen View</h2>
                    <p style={{ color: '#AD967D', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
                        {lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Loading...'}
                        &nbsp;· Auto-refreshes every 30s
                    </p>
                </div>
                <button onClick={fetchOrders} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.25rem',
                    background: '#1C1A18', border: '1px solid #2E2A26', color: '#AD967D',
                    borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem',
                }}>
                    <RefreshCw size={16} /> Refresh
                </button>
            </div>

            {loading ? <p style={{ color: '#AD967D' }}>Loading orders...</p> : (
                orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem', color: '#5D422D' }}>
                        <p style={{ fontSize: '1.2rem' }}>🎉 No active orders right now</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        {columns.map(col => (
                            <div key={col}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: statusColor(col) }} />
                                    <h3 style={{ color: statusColor(col), margin: 0, fontSize: '0.9rem', fontFamily: 'var(--font-body)', letterSpacing: '1px', textTransform: 'uppercase' }}>{col}</h3>
                                    <span style={{ color: '#5D422D', fontSize: '0.8rem' }}>({orders.filter(o => o.status === col).length})</span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {orders.filter(o => o.status === col).map(order => (
                                        <div key={order.id} style={{
                                            background: statusBg(col), border: `1px solid ${statusColor(col)}40`,
                                            borderRadius: '10px', padding: '1.25rem',
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                                <span style={{ color: '#E6DDD2', fontWeight: 700, fontSize: '1rem' }}>#{order.id} — {order.customer_name}</span>
                                                <span style={{ color: '#A6682D', fontWeight: 700 }}>₹{order.total_amount}</span>
                                            </div>
                                            <div style={{ marginBottom: '0.5rem' }}>
                                                {(() => {
                                                    try {
                                                        return JSON.parse(order.items_json).map((item, i) => (
                                                            <div key={i} style={{ color: '#AD967D', fontSize: '0.88rem', padding: '2px 0' }}>
                                                                • {item.name} × {item.quantity}
                                                            </div>
                                                        ));
                                                    } catch { return <span style={{ color: '#5D422D' }}>—</span>; }
                                                })()}
                                            </div>
                                            <div style={{ color: '#5D422D', fontSize: '0.78rem', marginBottom: '1rem' }}>
                                                {new Date(order.created_at).toLocaleTimeString('en-IN')}
                                            </div>
                                            {col !== 'Ready' && (
                                                <button onClick={() => updateStatus(order.id, nextStatus(col))} style={{
                                                    width: '100%', padding: '0.6rem', background: statusColor(nextStatus(col)) + '20',
                                                    border: `1px solid ${statusColor(nextStatus(col))}`,
                                                    color: statusColor(nextStatus(col)), borderRadius: '6px',
                                                    cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                                                    transition: 'all 0.2s',
                                                }}>
                                                    Mark as {nextStatus(col)} →
                                                </button>
                                            )}
                                            {col === 'Ready' && (
                                                <button onClick={() => updateStatus(order.id, 'Completed')} style={{
                                                    width: '100%', padding: '0.6rem', background: 'rgba(166,104,45,0.2)',
                                                    border: '1px solid #A6682D', color: '#A6682D', borderRadius: '6px',
                                                    cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                                                }}>
                                                    ✓ Mark Completed
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    {orders.filter(o => o.status === col).length === 0 && (
                                        <div style={{ border: '1px dashed #2E2A26', borderRadius: '10px', padding: '2rem', textAlign: 'center', color: '#2E2A26', fontSize: '0.85rem' }}>
                                            No orders
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </AdminLayout>
    );
}
