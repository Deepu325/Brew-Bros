import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import { ShoppingBag, Star, CalendarCheck, UtensilsCrossed } from 'lucide-react';

const StatCard = ({ icon, label, value, color }) => (
    <div style={{
        backgroundColor: '#1C1A18', border: '1px solid #2E2A26', borderRadius: '10px',
        padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem',
    }}>
        <div style={{ background: `${color}18`, padding: '1rem', borderRadius: '10px' }}>
            {React.cloneElement(icon, { color, size: 26 })}
        </div>
        <div>
            <div style={{ color: '#AD967D', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
            <div style={{ color: '#E6DDD2', fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 }}>{value}</div>
        </div>
    </div>
);

export default function Dashboard() {
    const { authFetch } = useAuth();
    const [stats, setStats] = useState({ orders: 0, bookings: 0, reviews: 0, menuItems: 0 });
    const [recentOrders, setRecentOrders] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {
        Promise.all([
            authFetch(`${API_URL}/api/inquiries/`).then(r => r.json()),
            authFetch(`${API_URL}/api/table-bookings/`).then(r => r.json()),
            authFetch(`${API_URL}/api/reviews/`).then(r => r.json()),
            authFetch(`${API_URL}/api/menu-items/`).then(r => r.json()),
        ]).then(([orders, bookings, reviews, items]) => {
            setStats({ orders: orders.length, bookings: bookings.length, reviews: reviews.length, menuItems: items.length });
            setRecentOrders(orders.slice(0, 5));
            setRecentBookings(bookings.slice(0, 5));
        }).catch(console.error);
    }, []);

    const statusColor = (s) => ({ 'Pending': '#e0a840', 'Confirmed': '#70b870', 'Completed': '#A6682D', 'Cancelled': '#e07070' }[s] || '#AD967D');

    return (
        <AdminLayout>
            <h2 style={{ color: '#E6DDD2', fontSize: '1.5rem', marginBottom: '0.25rem' }}>Dashboard</h2>
            <p style={{ color: '#AD967D', fontSize: '0.9rem', marginBottom: '2rem' }}>Welcome back! Here's what's happening today.</p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <StatCard icon={<ShoppingBag />} label="Total Orders" value={stats.orders} color="#A6682D" />
                <StatCard icon={<CalendarCheck />} label="Table Bookings" value={stats.bookings} color="#AD967D" />
                <StatCard icon={<Star />} label="Reviews" value={stats.reviews} color="#e0a840" />
                <StatCard icon={<UtensilsCrossed />} label="Menu Items" value={stats.menuItems} color="#70b870" />
            </div>

            {/* Recent tables */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px,100%), 1fr))', gap: '1.5rem' }}>
                {/* Recent Orders */}
                <div style={{ backgroundColor: '#1C1A18', border: '1px solid #2E2A26', borderRadius: '10px', padding: '1.5rem' }}>
                    <h3 style={{ color: '#E6DDD2', fontSize: '1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-body)' }}>Recent Orders</h3>
                    {recentOrders.length === 0 ? <p style={{ color: '#5D422D', fontSize: '0.9rem' }}>No orders yet</p> : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #2E2A26' }}>
                                    {['Customer', 'Amount', 'Status'].map(h => (
                                        <th key={h} style={{ color: '#5D422D', textAlign: 'left', padding: '0.5rem 0.75rem', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map(o => (
                                    <tr key={o.id} style={{ borderBottom: '1px solid #2E2A2620' }}>
                                        <td style={{ padding: '0.75rem', color: '#E6DDD2' }}>{o.customer_name}</td>
                                        <td style={{ padding: '0.75rem', color: '#A6682D' }}>₹{o.total_amount}</td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <span style={{ background: `${statusColor(o.status)}20`, color: statusColor(o.status), padding: '2px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600 }}>{o.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Recent Bookings */}
                <div style={{ backgroundColor: '#1C1A18', border: '1px solid #2E2A26', borderRadius: '10px', padding: '1.5rem' }}>
                    <h3 style={{ color: '#E6DDD2', fontSize: '1rem', marginBottom: '1.25rem', fontFamily: 'var(--font-body)' }}>Recent Table Bookings</h3>
                    {recentBookings.length === 0 ? <p style={{ color: '#5D422D', fontSize: '0.9rem' }}>No bookings yet</p> : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #2E2A26' }}>
                                    {['Customer', 'Date', 'Table', 'Status'].map(h => (
                                        <th key={h} style={{ color: '#5D422D', textAlign: 'left', padding: '0.5rem 0.75rem', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map(b => (
                                    <tr key={b.id} style={{ borderBottom: '1px solid #2E2A2620' }}>
                                        <td style={{ padding: '0.75rem', color: '#E6DDD2' }}>{b.customer_name}</td>
                                        <td style={{ padding: '0.75rem', color: '#AD967D' }}>{b.date}</td>
                                        <td style={{ padding: '0.75rem', color: '#AD967D' }}>#{b.table_number}</td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <span style={{ background: `${statusColor(b.status)}20`, color: statusColor(b.status), padding: '2px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600 }}>{b.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
