import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: isActive(path) ? '#A6682D' : '#AD967D',
    fontWeight: 500,
    fontSize: '0.95rem',
    letterSpacing: '0.5px',
    transition: 'color 0.2s',
    borderBottom: isActive(path) ? '2px solid #A6682D' : '2px solid transparent',
    paddingBottom: '4px',
  });

  return (
    <nav style={{
      padding: '1rem 0',
      backgroundColor: '#121110',
      borderBottom: '1px solid #2E2A26',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 20px rgba(0,0,0,0.5)',
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* LOGO */}
        <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setIsMobileMenuOpen(false)}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{
              fontSize: '1.7rem', margin: 0, lineHeight: 1,
              color: '#A6682D', fontFamily: 'var(--font-heading)',
              letterSpacing: '2px', textTransform: 'uppercase',
            }}>
              BREW BROS
            </h1>
            <span style={{
              fontSize: '0.65rem', color: '#5D422D',
              textTransform: 'uppercase', letterSpacing: '4px', marginTop: '3px',
            }}>
              Coffee House
            </span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="nav-links desktop-only" style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
          {['/', '/menu', '/reviews', '/about', '/contact'].map((path) => {
            const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <li key={path}>
                <Link to={path} style={linkStyle(path)}
                  onMouseEnter={e => { if (!isActive(path)) e.target.style.color = '#E6DDD2'; }}
                  onMouseLeave={e => { if (!isActive(path)) e.target.style.color = '#AD967D'; }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link to="/book-table" style={{
              textDecoration: 'none', padding: '0.45rem 1.25rem',
              fontSize: '0.88rem', fontWeight: 600, letterSpacing: '0.5px',
              background: '#A6682D', color: '#121110',
              borderRadius: '50px', transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(166,104,45,0.35)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#C4853E'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(166,104,45,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#A6682D'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(166,104,45,0.35)'; }}
            >
              Book Table
            </Link>
          </li>
          <li>
            <Link to="/cart" style={{ position: 'relative', display: 'block', lineHeight: 0 }}>
              <ShoppingBag color="#AD967D" size={22} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -6,
                  background: '#A6682D', color: '#121110',
                  fontSize: '0.65rem', width: '17px', height: '17px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700,
                }}>{totalItems}</span>
              )}
            </Link>
          </li>
        </ul>

        {/* MOBILE ICONS & TOGGLE */}
        <div className="mobile-only" style={{ alignItems: 'center', gap: '1.25rem' }}>
          <Link to="/cart" style={{ position: 'relative', lineHeight: 0 }} onClick={() => setIsMobileMenuOpen(false)}>
            <ShoppingBag color="#AD967D" size={22} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: -5, right: -5,
                background: '#A6682D', color: '#121110',
                fontSize: '0.6rem', width: '15px', height: '15px',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700,
              }}>{totalItems}</span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: '#AD967D', padding: 0, lineHeight: 0 }}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed', top: '65px', left: 0, right: 0, bottom: 0,
          backgroundColor: '#121110', borderTop: '1px solid #2E2A26',
          padding: '2.5rem 2rem', zIndex: 999,
          display: 'flex', flexDirection: 'column', gap: '0',
        }}>
          {['/', '/menu', '/reviews', '/about', '/contact'].map((path, i) => {
            const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <Link
                key={path} to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: isActive(path) ? '#A6682D' : '#AD967D',
                  fontSize: '1.4rem', fontWeight: 500,
                  padding: '1rem 0',
                  borderBottom: '1px solid #2E2A26',
                  letterSpacing: '0.5px',
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </Link>
            );
          })}
          <Link
            to="/book-table"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              marginTop: '2rem', textDecoration: 'none',
              textAlign: 'center', padding: '1rem',
              fontSize: '1rem', fontWeight: 600, letterSpacing: '1px',
              background: '#A6682D', color: '#121110',
              borderRadius: '50px', boxShadow: '0 4px 12px rgba(166,104,45,0.35)',
            }}
          >
            Book Table
          </Link>
        </div>
      )}
    </nav>
  );
}
