import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import { Plus, Pencil, Trash2, X, ChevronDown, ChevronUp, Upload, ImageOff } from 'lucide-react';

const iStyle = {
    width: '100%', padding: '0.85rem 1rem', background: '#0E0D0C',
    border: '1px solid #2E2A26', borderRadius: '8px', color: '#E6DDD2',
    fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
};
const lStyle = {
    display: 'block', color: '#AD967D', fontSize: '0.75rem',
    textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem', fontWeight: 600,
};
const emptyItem = { name: '', description: '', price: '', is_spicy: false, is_available: true, image_url: '' };

function Modal({ title, onClose, onSubmit, saving, children }) {
    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
            <div style={{ background: '#1C1A18', border: '1px solid #2E2A26', borderRadius: '14px', width: '100%', maxWidth: '520px', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 30px 80px rgba(0,0,0,0.7)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.4rem 1.75rem', borderBottom: '1px solid #2E2A26', position: 'sticky', top: 0, background: '#1C1A18', zIndex: 1 }}>
                    <h3 style={{ color: '#E6DDD2', margin: 0, fontSize: '1.1rem', fontFamily: 'inherit', fontWeight: 600 }}>{title}</h3>
                    <button onClick={onClose} style={{ background: '#2E2A26', border: 'none', color: '#AD967D', cursor: 'pointer', borderRadius: '6px', padding: '6px', display: 'flex', alignItems: 'center' }}>
                        <X size={16} />
                    </button>
                </div>
                <form onSubmit={onSubmit} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {children}
                    <button type="submit" disabled={saving} style={{
                        padding: '1rem', background: saving ? '#5D422D' : '#A6682D', color: '#121110',
                        border: 'none', borderRadius: '8px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
                        fontSize: '0.95rem', letterSpacing: '0.5px', transition: 'background 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    }}>
                        {saving ? '⏳ Saving...' : '✓ Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
}

function ImageUploader({ preview, onFile, onUrl, onClear, urlValue }) {
    const [dragOver, setDragOver] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault(); setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) onFile(file);
    };

    return (
        <div>
            <label style={lStyle}>Item Image</label>

            {preview ? (
                <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', height: '180px', border: '1px solid #2E2A26', marginBottom: '0.75rem' }}>
                    <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                    <button type="button" onClick={onClear} style={{
                        position: 'absolute', top: '0.6rem', right: '0.6rem', background: 'rgba(0,0,0,0.7)',
                        border: '1px solid #e07070', color: '#e07070', borderRadius: '6px',
                        cursor: 'pointer', padding: '5px 8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                        <X size={12} /> Remove
                    </button>
                    <span style={{ position: 'absolute', bottom: '0.6rem', left: '0.75rem', color: '#AD967D', fontSize: '0.75rem' }}>
                        ✓ Image ready
                    </span>
                </div>
            ) : (
                <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    style={{
                        border: `2px dashed ${dragOver ? '#A6682D' : '#2E2A26'}`,
                        borderRadius: '10px', background: dragOver ? 'rgba(166,104,45,0.06)' : '#0E0D0C',
                        padding: '2rem', textAlign: 'center', marginBottom: '0.75rem',
                        transition: 'all 0.2s', cursor: 'pointer',
                    }}
                >
                    <label style={{ cursor: 'pointer', display: 'block' }}>
                        <Upload size={28} color={dragOver ? '#A6682D' : '#5D422D'} style={{ marginBottom: '0.75rem' }} />
                        <div style={{ color: dragOver ? '#A6682D' : '#AD967D', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                            Drag & drop or <span style={{ color: '#A6682D', fontWeight: 600 }}>click to upload</span>
                        </div>
                        <div style={{ color: '#5D422D', fontSize: '0.75rem' }}>PNG, JPG, WEBP up to 5MB</div>
                        <input type="file" accept="image/*" style={{ display: 'none' }}
                            onChange={e => { const f = e.target.files[0]; if (f) onFile(f); }} />
                    </label>
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0.25rem 0' }}>
                <div style={{ flex: 1, height: '1px', background: '#2E2A26' }} />
                <span style={{ color: '#5D422D', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>or paste image URL</span>
                <div style={{ flex: 1, height: '1px', background: '#2E2A26' }} />
            </div>
            <input style={{ ...iStyle, marginTop: '0.5rem' }} value={urlValue || ''} onChange={e => onUrl(e.target.value)}
                onFocus={e => e.target.style.borderColor = '#A6682D'} onBlur={e => e.target.style.borderColor = '#2E2A26'}
                placeholder="https://example.com/image.jpg" />
        </div>
    );
}

function CategoryForm({ catModal, setCatModal, authFetch, fetchAll }) {
    const [name, setName] = useState(catModal.data.name || '');
    const [imageUrl, setImageUrl] = useState(catModal.data.image_url || '');
    const [saving, setSaving] = useState(false);

    const submit = async (e) => {
        e.preventDefault(); setSaving(true);
        const url = catModal.mode === 'edit' ? `${API_URL}/api/categories/${catModal.data.id}/` : `${API_URL}/api/categories/`;
        await authFetch(url, { method: catModal.mode === 'edit' ? 'PUT' : 'POST', body: JSON.stringify({ name, image_url: imageUrl }) });
        await fetchAll(); setCatModal(null); setSaving(false);
    };

    return (
        <Modal title={catModal.mode === 'add' ? '＋ New Category' : '✎ Edit Category'} onClose={() => setCatModal(null)} onSubmit={submit} saving={saving}>
            <div>
                <label style={lStyle}>Category Name</label>
                <input required style={iStyle} value={name} onChange={e => setName(e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#A6682D'} onBlur={e => e.target.style.borderColor = '#2E2A26'}
                    placeholder="e.g. Beverages, Starters..." />
            </div>
            <div>
                <label style={lStyle}>Category Image URL (optional)</label>
                <input style={iStyle} value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#A6682D'} onBlur={e => e.target.style.borderColor = '#2E2A26'}
                    placeholder="https://..." />
            </div>
        </Modal>
    );
}

function ItemForm({ itemModal, setItemModal, authFetch, fetchAll }) {
    const [local, setLocal] = useState({ ...itemModal.data });
    const [preview, setPreview] = useState(
        itemModal.data.image ? `${API_URL}${itemModal.data.image}` : itemModal.data.image_url || null
    );
    const [saving, setSaving] = useState(false);

    const handleFile = (file) => {
        setLocal(p => ({ ...p, imageFile: file, image_url: '' }));
        setPreview(URL.createObjectURL(file));
    };

    const handleUrl = (url) => {
        setLocal(p => ({ ...p, image_url: url, imageFile: null }));
        setPreview(url || null);
    };

    const handleClear = () => {
        setLocal(p => ({ ...p, imageFile: null, image_url: '' }));
        setPreview(null);
    };

    const submit = async (e) => {
        e.preventDefault(); setSaving(true);
        const { mode, categoryId } = itemModal;
        const url = mode === 'edit' ? `${API_URL}/api/menu-items/${local.id}/` : `${API_URL}/api/menu-items/`;
        const token = localStorage.getItem('admin_token');

        if (local.imageFile) {
            const form = new FormData();
            form.append('name', local.name);
            form.append('description', local.description || '');
            form.append('price', parseFloat(local.price || 0));
            form.append('is_spicy', local.is_spicy);
            form.append('is_available', local.is_available);
            form.append('category', categoryId);
            form.append('image', local.imageFile);
            await fetch(url, { method: mode === 'edit' ? 'PUT' : 'POST', headers: { Authorization: `Bearer ${token}` }, body: form });
        } else {
            await fetch(url, {
                method: mode === 'edit' ? 'PUT' : 'POST',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: local.name, description: local.description || '', price: parseFloat(local.price || 0), is_spicy: local.is_spicy, is_available: local.is_available, category: categoryId, image_url: local.image_url || '' }),
            });
        }
        await fetchAll(); setItemModal(null); setSaving(false);
    };

    const f = (key, val) => setLocal(p => ({ ...p, [key]: val }));

    return (
        <Modal title={itemModal.mode === 'add' ? '＋ New Menu Item' : '✎ Edit Menu Item'} onClose={() => setItemModal(null)} onSubmit={submit} saving={saving}>
            {/* Name + Price row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '1rem' }}>
                <div>
                    <label style={lStyle}>Item Name</label>
                    <input required style={iStyle} value={local.name || ''} onChange={e => f('name', e.target.value)}
                        onFocus={e => e.target.style.borderColor = '#A6682D'} onBlur={e => e.target.style.borderColor = '#2E2A26'}
                        placeholder="e.g. Cold Brew" />
                </div>
                <div>
                    <label style={lStyle}>Price (₹)</label>
                    <input required type="number" min="0" step="0.01" style={iStyle} value={local.price || ''} onChange={e => f('price', e.target.value)}
                        onFocus={e => e.target.style.borderColor = '#A6682D'} onBlur={e => e.target.style.borderColor = '#2E2A26'}
                        placeholder="0.00" />
                </div>
            </div>

            <div>
                <label style={lStyle}>Description</label>
                <textarea style={{ ...iStyle, minHeight: '80px', resize: 'vertical' }} value={local.description || ''} onChange={e => f('description', e.target.value)}
                    onFocus={e => e.target.style.borderColor = '#A6682D'} onBlur={e => e.target.style.borderColor = '#2E2A26'}
                    placeholder="Short description of the item..." />
            </div>

            <ImageUploader preview={preview} onFile={handleFile} onUrl={handleUrl} onClear={handleClear} urlValue={local.image_url} />

            {/* Toggles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[['is_spicy', '🌶 Spicy Item'], ['is_available', '✓ Available']].map(([key, label]) => (
                    <label key={key} onClick={() => f(key, !local[key])} style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer',
                        padding: '0.85rem 1rem', borderRadius: '8px', border: `1px solid ${local[key] ? '#A6682D' : '#2E2A26'}`,
                        background: local[key] ? 'rgba(166,104,45,0.1)' : '#0E0D0C',
                        transition: 'all 0.2s', userSelect: 'none',
                    }}>
                        <div style={{
                            width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0,
                            border: `2px solid ${local[key] ? '#A6682D' : '#2E2A26'}`,
                            background: local[key] ? '#A6682D' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {local[key] && <span style={{ color: '#121110', fontSize: '12px', fontWeight: 900 }}>✓</span>}
                        </div>
                        <span style={{ color: local[key] ? '#E6DDD2' : '#AD967D', fontSize: '0.88rem', fontWeight: 500 }}>{label}</span>
                    </label>
                ))}
            </div>
        </Modal>
    );
}

export default function MenuManagement() {
    const { authFetch } = useAuth();
    const [categories, setCategories] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [itemModal, setItemModal] = useState(null);
    const [catModal, setCatModal] = useState(null);

    const fetchAll = () =>
        authFetch(`${API_URL}/api/categories/`).then(r => r.json()).then(setCategories).catch(console.error);

    useEffect(() => { fetchAll(); }, []);

    const toggleExpand = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

    const deleteCategory = async (id) => {
        if (!confirm('Delete this category and all its items?')) return;
        await authFetch(`${API_URL}/api/categories/${id}/`, { method: 'DELETE' });
        fetchAll();
    };

    const deleteItem = async (id) => {
        if (!confirm('Delete this item?')) return;
        await authFetch(`${API_URL}/api/menu-items/${id}/`, { method: 'DELETE' });
        fetchAll();
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ color: '#E6DDD2', fontSize: '1.5rem', margin: 0 }}>Menu Management</h2>
                    <p style={{ color: '#AD967D', fontSize: '0.85rem', margin: '0.25rem 0 0' }}>
                        {categories.length} categories · {categories.reduce((a, c) => a + (c.items?.length || 0), 0)} items
                    </p>
                </div>
                <button onClick={() => setCatModal({ mode: 'add', data: { name: '', image_url: '' } })} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.4rem',
                    background: '#A6682D', color: '#121110', border: 'none', borderRadius: '8px',
                    fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem', letterSpacing: '0.5px',
                    boxShadow: '0 4px 14px rgba(166,104,45,0.35)',
                }}
                    onMouseEnter={e => e.currentTarget.style.background = '#C4853E'}
                    onMouseLeave={e => e.currentTarget.style.background = '#A6682D'}
                >
                    <Plus size={16} /> New Category
                </button>
            </div>

            {categories.length === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem', border: '1px dashed #2E2A26', borderRadius: '12px', color: '#5D422D' }}>
                    <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>No categories yet</p>
                    <button onClick={() => setCatModal({ mode: 'add', data: { name: '', image_url: '' } })}
                        style={{ padding: '0.65rem 1.5rem', background: '#A6682D', color: '#121110', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
                        Create your first category
                    </button>
                </div>
            )}

            {categories.map((cat) => (
                <div key={cat.id} style={{ backgroundColor: '#1C1A18', border: '1px solid #2E2A26', borderRadius: '12px', marginBottom: '1rem', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                    {/* Category row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', cursor: 'pointer', background: expanded[cat.id] ? 'rgba(166,104,45,0.05)' : 'transparent' }}
                        onClick={() => toggleExpand(cat.id)}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {expanded[cat.id] ? <ChevronUp size={18} color="#A6682D" /> : <ChevronDown size={18} color="#5D422D" />}
                            <span style={{ color: '#E6DDD2', fontWeight: 600, fontSize: '1rem' }}>{cat.name}</span>
                            <span style={{ background: '#2E2A26', color: '#AD967D', padding: '2px 10px', borderRadius: '50px', fontSize: '0.75rem' }}>
                                {cat.items?.length || 0} items
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }} onClick={e => e.stopPropagation()}>
                            <button onClick={() => setCatModal({ mode: 'edit', data: { id: cat.id, name: cat.name, image_url: cat.image_url || '' } })}
                                style={{ background: 'transparent', border: '1px solid #2E2A26', color: '#AD967D', borderRadius: '6px', padding: '0.4rem 0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#A6682D'; e.currentTarget.style.color = '#A6682D'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2E2A26'; e.currentTarget.style.color = '#AD967D'; }}
                            >
                                <Pencil size={13} /> Edit
                            </button>
                            <button onClick={() => deleteCategory(cat.id)}
                                style={{ background: 'transparent', border: '1px solid #2E2A26', color: '#AD967D', borderRadius: '6px', padding: '0.4rem 0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(180,50,50,0.6)'; e.currentTarget.style.color = '#e07070'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2E2A26'; e.currentTarget.style.color = '#AD967D'; }}
                            >
                                <Trash2 size={13} /> Delete
                            </button>
                        </div>
                    </div>

                    {/* Items grid */}
                    {expanded[cat.id] && (
                        <div style={{ borderTop: '1px solid #2E2A26', padding: '1.25rem 1.5rem', background: '#161412' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
                                <button onClick={() => setItemModal({ mode: 'add', data: { ...emptyItem }, categoryId: cat.id })}
                                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.55rem 1.1rem', background: 'rgba(166,104,45,0.12)', border: '1px solid #A6682D', color: '#A6682D', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(166,104,45,0.25)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(166,104,45,0.12)'}
                                >
                                    <Plus size={15} /> Add Item
                                </button>
                            </div>

                            {(!cat.items || cat.items.length === 0) ? (
                                <div style={{ textAlign: 'center', padding: '2.5rem', border: '1px dashed #2E2A26', borderRadius: '8px', color: '#5D422D', fontSize: '0.9rem' }}>
                                    No items yet — click "Add Item" to get started
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px,100%), 1fr))', gap: '1rem' }}>
                                    {cat.items.map(item => {
                                        const imgSrc = item.image ? `${API_URL}${item.image}` : item.image_url || null;
                                        return (
                                            <div key={item.id} style={{ background: '#1C1A18', border: '1px solid #2E2A26', borderRadius: '10px', overflow: 'hidden', transition: 'border-color 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.borderColor = '#A6682D40'}
                                                onMouseLeave={e => e.currentTarget.style.borderColor = '#2E2A26'}
                                            >
                                                {/* Image */}
                                                <div style={{ height: '130px', background: '#121110', position: 'relative', overflow: 'hidden' }}>
                                                    {imgSrc ? (
                                                        <img src={imgSrc} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    ) : (
                                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            <ImageOff size={28} color="#2E2A26" />
                                                        </div>
                                                    )}
                                                    <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.35rem' }}>
                                                        <span style={{ background: item.is_spicy ? 'rgba(180,50,50,0.85)' : 'rgba(50,120,50,0.85)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700 }}>
                                                            {item.is_spicy ? '🌶 SPICY' : 'MILD'}
                                                        </span>
                                                        {!item.is_available && (
                                                            <span style={{ background: 'rgba(0,0,0,0.8)', color: '#e07070', padding: '2px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 700 }}>
                                                                UNAVAIL.
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Info */}
                                                <div style={{ padding: '0.85rem 1rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                                                        <span style={{ color: '#E6DDD2', fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</span>
                                                        <span style={{ color: '#A6682D', fontWeight: 700, fontSize: '1rem' }}>₹{item.price}</span>
                                                    </div>
                                                    {item.description && (
                                                        <p style={{ color: '#5D422D', fontSize: '0.78rem', margin: '0 0 0.85rem', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                                            {item.description}
                                                        </p>
                                                    )}
                                                    <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #2E2A26' }}>
                                                        <button onClick={() => setItemModal({ mode: 'edit', data: { ...item, price: item.price.toString() }, categoryId: cat.id })}
                                                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '0.45rem', background: 'rgba(166,104,45,0.1)', border: '1px solid #A6682D40', color: '#A6682D', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s' }}
                                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(166,104,45,0.25)'}
                                                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(166,104,45,0.1)'}
                                                        >
                                                            <Pencil size={13} /> Edit
                                                        </button>
                                                        <button onClick={() => deleteItem(item.id)}
                                                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '0.45rem', background: 'rgba(180,50,50,0.08)', border: '1px solid rgba(180,50,50,0.3)', color: '#e07070', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s' }}
                                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(180,50,50,0.2)'}
                                                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(180,50,50,0.08)'}
                                                        >
                                                            <Trash2 size={13} /> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}

            {catModal && <CategoryForm catModal={catModal} setCatModal={setCatModal} authFetch={authFetch} fetchAll={fetchAll} />}
            {itemModal && <ItemForm itemModal={itemModal} setItemModal={setItemModal} authFetch={authFetch} fetchAll={fetchAll} />}
        </AdminLayout>
    );
}
