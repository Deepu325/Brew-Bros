import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, ChefHat, LogOut, Menu, X, Coffee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/menu', icon: <UtensilsCrossed size={20} />, label: 'Menu Management' },
    { path: '/admin/orders', icon: <ShoppingBag size={20} />, label: 'Orders' },
    { path: '/admin/kitchen', icon: <ChefHat size={20} />, label: 'Kitchen View' },
];

export default function AdminLayout({ children }) {
    const { admin, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = () => { logout(); navigate('/admin/login'); };

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#121110', color: '#E6DDD2' }}>
            {/* SIDEBAR */}
            <aside style={{
                width: sidebarOpen ? '240px' : '70px', flexShrink: 0,
                backgroundColor: '#0E0D0C', borderRight: '1px solid #2E2A26',
                display: 'flex', flexDirection: 'column',
                transition: 'width 0.25s ease', overflow: 'hidden',
            }}>
                {/* Logo */}
                <div style={{
                    padding: '1.5rem 1.25rem', borderBottom: '1px solid #2E2A26',
                    display: 'flex', alignItems: 'center', gap: '0.75rem', minHeight: '70px',
                }}>
                    <Coffee size={24} color="#A6682D" style={{ flexShrink: 0 }} />
                    {sidebarOpen && (
                        <div>
                            <div style={{ color: '#A6682D', fontWeight: 700, fontSize: '1rem', letterSpacing: '2px' }}>BREW BROS</div>
                            <div style={{ color: '#5D422D', fontSize: '0.6rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Admin</div>
                        </div>
                    )}
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: '1rem 0' }}>
                    {navItems.map((item) => (
                        <Link key={item.path} to={item.path} style={{
                            display: 'flex', alignItems: 'center', gap: '0.85rem',
                            padding: '0.85rem 1.25rem', textDecoration: 'none',
                            color: isActive(item.path) ? '#A6682D' : '#AD967D',
                            backgroundColor: isActive(item.path) ? 'rgba(166,104,45,0.1)' : 'transparent',
                            borderLeft: isActive(item.path) ? '2px solid #A6682D' : '2px solid transparent',
                            transition: 'all 0.2s', whiteSpace: 'nowrap',
                        }}
                            onMouseEnter={e => { if (!isActive(item.path)) e.currentTarget.style.color = '#E6DDD2'; }}
                            onMouseLeave={e => { if (!isActive(item.path)) e.currentTarget.style.color = '#AD967D'; }}
                        >
                            <span style={{ flexShrink: 0 }}>{item.icon}</span>
                            {sidebarOpen && <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* User + Logout */}
                <div style={{ borderTop: '1px solid #2E2A26', padding: '1rem 1.25rem' }}>
                    {sidebarOpen && <div style={{ color: '#AD967D', fontSize: '0.8rem', marginBottom: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>👤 {admin}</div>}
                    <button onClick={handleLogout} style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        background: 'none', border: 'none', color: '#5D422D',
                        cursor: 'pointer', padding: '0.5rem 0', fontSize: '0.9rem',
                        transition: 'color 0.2s', whiteSpace: 'nowrap',
                    }}
                        onMouseEnter={e => e.currentTarget.style.color = '#e07070'}
                        onMouseLeave={e => e.currentTarget.style.color = '#5D422D'}
                    >
                        <LogOut size={18} />
                        {sidebarOpen && 'Logout'}
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
                {/* Top bar */}
                <header style={{
                    height: '70px', backgroundColor: '#0E0D0C', borderBottom: '1px solid #2E2A26',
                    display: 'flex', alignItems: 'center', padding: '0 1.5rem', gap: '1rem', flexShrink: 0,
                }}>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
                        background: 'none', border: 'none', color: '#AD967D', cursor: 'pointer', padding: '4px',
                    }}>
                        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                    <span style={{ color: '#AD967D', fontSize: '0.9rem' }}>
                        {navItems.find(n => n.path === location.pathname)?.label || 'Admin'}
                    </span>
                </header>

                <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
