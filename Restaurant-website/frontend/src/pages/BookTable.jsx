import React, { useState } from 'react';
import { Calendar, Clock, Users, Phone, User } from 'lucide-react';
import CalendarPicker from '../components/CalendarPicker';
import { useNavigate } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { API_URL } from '../config';

const inputStyle = {
    width: '100%', padding: '1.2rem', borderRadius: '8px',
    border: '1px solid #2E2A26', fontSize: '1.05rem', outline: 'none',
    transition: 'border-color 0.3s', background: '#121110', color: '#E6DDD2',
};
const labelStyle = {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    marginBottom: '0.8rem', fontWeight: 600, fontSize: '1.05rem', color: '#E6DDD2',
};

const PageHeader = ({ title }) => (
    <div style={{
        padding: '4rem 0', textAlign: 'center', marginBottom: '4rem',
        backgroundImage: "linear-gradient(to bottom, rgba(18,17,16,0.6) 0%, rgba(18,17,16,0.4) 50%, rgba(18,17,16,0.75) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
        borderBottom: '1px solid #2E2A26',
    }}>
        <Reveal>
            <span style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#A6682D', marginBottom: '1rem' }}>✦ BREW BROS ✦</span>
            <h1 style={{ color: '#E6DDD2', fontSize: '3rem', letterSpacing: '2px' }}>{title}</h1>
            <div style={{ width: '50px', height: '1px', background: '#A6682D', margin: '1rem auto 0' }} />
        </Reveal>
    </div>
);

export default function BookTable() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', phone: '', date: '', timeSlot: '', guests: 2, specialRequests: '' });
    const [submitting, setSubmitting] = useState(false);

    const timeSlots = [
        '11:00 AM - 12:30 PM', '12:30 PM - 02:00 PM', '02:00 PM - 03:30 PM',
        '06:00 PM - 07:30 PM', '07:30 PM - 09:00 PM', '09:00 PM - 10:30 PM'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        const tableNumber = Math.floor(Math.random() * 20) + 1;
        const payload = {
            customer_name: formData.name, phone: formData.phone,
            date: formData.date, time_slot: formData.timeSlot,
            guests: formData.guests, table_number: tableNumber,
            special_requests: formData.specialRequests, status: 'Confirmed'
        };
        fetch(`${API_URL}/api/table-bookings/`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => { if (res.ok) return res.json(); throw new Error('Failed to book table'); })
            .then(data => {
                navigate('/thank-you', {
                    state: {
                        type: 'table_booking', customerName: formData.name, phone: formData.phone,
                        date: formData.date, timeSlot: formData.timeSlot,
                        guests: formData.guests, tableNumber: data.table_number || tableNumber
                    }
                });
            })
            .catch(err => { console.error(err); alert('Failed to book table. Please try again or call us directly.'); })
            .finally(() => setSubmitting(false));
    };

    const today = new Date().toISOString().split('T')[0];
    const onFocus = e => e.target.style.borderColor = '#A6682D';
    const onBlur = e => e.target.style.borderColor = '#2E2A26';

    return (
        <div className="page-book-table">
            <PageHeader title="Reserve Your Table" />

            <div className="container" style={{ paddingBottom: '6rem', maxWidth: '800px', margin: '0 auto' }}>
                <Reveal>
                    <div style={{
                        backgroundColor: '#1C1A18', padding: '3rem',
                        borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                        border: '1px solid #2E2A26'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#A6682D' }}>Book Your Experience</h2>
                            <p style={{ fontSize: '1.05rem', color: '#AD967D', lineHeight: '1.7' }}>
                                Reserve a table at BREW BROS and enjoy authentic village-style dining in our traditional ambience.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div style={{ display: 'grid', gap: '2rem' }}>
                                <div>
                                    <label style={labelStyle}><User size={20} color="#A6682D" />Your Name</label>
                                    <input required type="text" value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        style={inputStyle} placeholder="Enter your full name"
                                        onFocus={onFocus} onBlur={onBlur} />
                                </div>

                                <div>
                                    <label style={labelStyle}><Phone size={20} color="#A6682D" />Phone Number</label>
                                    <input required type="tel" value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        style={inputStyle} placeholder="Enter your mobile number"
                                        onFocus={onFocus} onBlur={onBlur} />
                                </div>

                                <div className="stack-on-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div>
                                        <label style={labelStyle}><Calendar size={20} color="#A6682D" />Date</label>
                                            <CalendarPicker value={formData.date} onChange={val => setFormData({ ...formData, date: val })} minDate={today} />
                                    </div>
                                    <div>
                                        <label style={labelStyle}><Users size={20} color="#A6682D" />Guests</label>
                                        <input required type="number" min="1" max="12" value={formData.guests}
                                            onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}><Clock size={20} color="#A6682D" />Preferred Time Slot</label>
                                    <select required value={formData.timeSlot}
                                        onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                                        style={{ ...inputStyle, cursor: 'pointer' }}
                                        onFocus={onFocus} onBlur={onBlur}>
                                        <option value="" style={{ background: '#1C1A18' }}>Select a time slot</option>
                                        {timeSlots.map(slot => (
                                            <option key={slot} value={slot} style={{ background: '#1C1A18' }}>{slot}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600, fontSize: '1.05rem', color: '#E6DDD2' }}>
                                        Special Requests (Optional)
                                    </label>
                                    <textarea value={formData.specialRequests}
                                        onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                                        style={{ ...inputStyle, minHeight: '120px', fontFamily: 'inherit', resize: 'vertical' }}
                                        placeholder="Any special occasion, dietary requirements, or seating preferences?"
                                        onFocus={onFocus} onBlur={onBlur} />
                                </div>

                                <button type="submit" disabled={submitting}
                                    style={{
                                        width: '100%', padding: '1.5rem', fontSize: '1.1rem',
                                        fontWeight: 600, letterSpacing: '1px', borderRadius: '8px',
                                        background: '#A6682D', color: '#121110', border: 'none',
                                        cursor: 'pointer', marginTop: '1rem',
                                        boxShadow: '0 6px 20px rgba(166,104,45,0.35)',
                                        transition: 'background 0.2s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#C4853E'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#A6682D'}
                                >
                                    {submitting ? 'Reserving...' : 'Confirm Reservation'}
                                </button>
                            </div>
                        </form>

                        <div style={{
                            marginTop: '3rem', padding: '1.5rem',
                            backgroundColor: '#2E2A26', borderRadius: '8px',
                            borderLeft: '3px solid #A6682D'
                        }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', color: '#AD967D', lineHeight: '1.7' }}>
                                <strong style={{ color: '#E6DDD2' }}>Note:</strong> Your reservation will be confirmed immediately. Please arrive 10 minutes before your scheduled time.
                                For groups larger than 12 people, please call us directly at <strong style={{ color: '#E6DDD2' }}>+91 98765 43210</strong>.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
