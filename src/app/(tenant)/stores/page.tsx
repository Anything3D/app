"use client";

import { useState } from 'react';
import { useStore } from '@/store/useStore';

export default function Stores() {
  const stores = useStore(state => state.stores);
  const addStore = useStore(state => state.addStore);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStore, setNewStore] = useState({ name: '', address: '', manager: '', status: 'Active' as const });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addStore(newStore);
    setIsModalOpen(false);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Store Locations</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your physical stores and warehouses.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Add Store</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {stores.map(store => (
          <div key={store.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{store.name}</h3>
              <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: store.status === 'Active' ? 'rgba(var(--success), 0.2)' : 'rgba(var(--warning), 0.2)', color: store.status === 'Active' ? 'hsl(var(--success))' : 'hsl(var(--warning))', borderRadius: 'var(--radius-sm)' }}>
                {store.status}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{store.address}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Manager: {store.manager}</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-outline" style={{ flex: 1 }}>View Inventory</button>
              <button className="btn btn-outline" style={{ flex: 1 }}>Edit Details</button>
            </div>
          </div>
        ))}
        {stores.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No stores available.</p>}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Add New Store</h2>
            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Store Name</label>
                <input required type="text" className="input" value={newStore.name} onChange={e => setNewStore({...newStore, name: e.target.value})} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Address</label>
                <input required type="text" className="input" value={newStore.address} onChange={e => setNewStore({...newStore, address: e.target.value})} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Manager Name</label>
                <input required type="text" className="input" value={newStore.manager} onChange={e => setNewStore({...newStore, manager: e.target.value})} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Store</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
