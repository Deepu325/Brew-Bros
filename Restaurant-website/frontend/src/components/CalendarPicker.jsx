import React, { useState, useRef, useEffect } from 'react';

function formatYMD(d) {
    if (!d) return '';
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function parseYMD(s) {
    if (!s) return null;
    const [y, m, d] = s.split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
}

export default function CalendarPicker({ value, onChange, minDate }) {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(() => parseYMD(value) || new Date());
    const wrapperRef = useRef();

    useEffect(() => {
        function handleClick(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    useEffect(() => {
        if (value) {
            const d = parseYMD(value);
            if (d) setCurrent(d);
        }
    }, [value]);

    const selected = parseYMD(value);
    const min = parseYMD(minDate);

    const startOfMonth = new Date(current.getFullYear(), current.getMonth(), 1);
    const startDay = startOfMonth.getDay();

    const weeks = [];
    let day = 1 - startDay;
    for (let w = 0; w < 6; w++) {
        const week = [];
        for (let i = 0; i < 7; i++, day++) {
            const d = new Date(current.getFullYear(), current.getMonth(), day);
            week.push(d);
        }
        weeks.push(week);
    }

    function isDisabled(d) {
        if (!d) return true;
        if (d.getMonth() !== current.getMonth()) return true;
        if (min && d < min) return true;
        return false;
    }

    function pick(d) {
        if (isDisabled(d)) return;
        onChange(formatYMD(d));
        setOpen(false);
    }

    return (
        <div ref={wrapperRef} style={{ position: 'relative' }}>
            <input
                readOnly
                value={value || ''}
                onClick={() => setOpen(v => !v)}
                placeholder="Select a date"
                style={{ width: '100%', padding: '1.2rem', borderRadius: 8, border: '1px solid #2E2A26', background: '#121110', color: '#E6DDD2', fontSize: '1.05rem', cursor: 'pointer' }}
            />

            {open && (
                <div style={{ position: 'absolute', zIndex: 40, top: 'calc(100% + 8px)', left: 0, background: '#1C1A18', border: '1px solid #2E2A26', padding: '0.75rem', borderRadius: 8, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <button type="button" onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1))} style={{ background: 'transparent', border: 'none', color: '#E6DDD2', cursor: 'pointer' }}>{'‹'}</button>
                        <div style={{ color: '#E6DDD2', fontWeight: 600 }}>{current.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
                        <button type="button" onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1))} style={{ background: 'transparent', border: 'none', color: '#E6DDD2', cursor: 'pointer' }}>{'›'}</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', gap: 6, textAlign: 'center', marginBottom: 6 }}>
                        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} style={{ color: '#AD967D', fontSize: 12 }}>{d}</div>)}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 36px)', gap: 6 }}>
                        {weeks.flat().map((d, idx) => {
                            const disabled = isDisabled(d);
                            const isSelected = selected && d && d.getFullYear() === selected.getFullYear() && d.getMonth() === selected.getMonth() && d.getDate() === selected.getDate();
                            return (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => pick(d)}
                                    disabled={disabled}
                                    style={{
                                        height: 36, lineHeight: '36px', borderRadius: 6,
                                        background: isSelected ? '#A6682D' : (disabled ? 'transparent' : '#2E2A26'),
                                        color: isSelected ? '#121110' : (disabled ? '#6b6b6b' : '#E6DDD2'),
                                        border: 'none', cursor: disabled ? 'default' : 'pointer'
                                    }}
                                >
                                    {d.getMonth() === current.getMonth() ? d.getDate() : ''}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
