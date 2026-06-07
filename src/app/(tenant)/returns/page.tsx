"use client";

import { useState } from 'react';
import { useStore } from '@/store/useStore';

export default function Returns() {
  const returns = useStore(state => state.orders).filter(o => o.type === 'Return');
  const createOrder = useStore(state => state.createOrder);
  const processOrder = useStore(state => state.processOrder);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newReturn, setNewReturn] = useState({
    productSku: '',
    quantity: 1,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    createOrder({
      ...newReturn,
      type: 'Return',
      status: 'Pending',
      date: new Date().toISOString(),
    });
    setIsModalOpen(false);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Returns Management (RMA)</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Process customer returns and route items back to inventory or damage bins.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Process Return</button>
      </div>

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1rem' }}>RMA ID</th>
              <th style={{ padding: '1rem' }}>Product SKU</th>
              <th style={{ padding: '1rem' }}>Qty</th>
              <th style={{ padding: '1rem' }}>Date Logged</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Disposition</th>
            </tr>
          </thead>
          <tbody>
            {returns.map(ret => (
              <tr key={ret.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>RMA-{ret.id.toUpperCase()}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{ret.productSku}</td>
                <td style={{ padding: '1rem' }}>{ret.quantity}</td>
                <td style={{ padding: '1rem' }}>{new Date(ret.date).toLocaleDateString()}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)',
                    backgroundColor: ret.status === 'Processed' ? 'rgba(var(--success), 0.2)' : 'rgba(var(--warning), 0.2)', 
                    color: ret.status === 'Processed' ? 'hsl(var(--success))' : 'hsl(var(--warning))'
                  }}>
                    {ret.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  {ret.status === 'Pending' ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'hsl(var(--primary))' }} onClick={() => processOrder(ret.id)}>
                        Return to Stock
                      </button>
                      <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', color: 'hsl(var(--danger))' }} onClick={() => processOrder(ret.id)}>
                        Mark Damaged
                      </button>
                    </div>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Resolved</span>
                  )}
                </td>
              </tr>
            ))}
            {returns.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No returns pending.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Log New Return</h2>
            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Scanned Product SKU</label>
                <input required type="text" className="input" placeholder="e.g. WH-1000XM4" value={newReturn.productSku} onChange={e => setNewReturn({...newReturn, productSku: e.target.value})} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Quantity Returned</label>
                <input required type="number" min="1" className="input" value={newReturn.quantity} onChange={e => setNewReturn({...newReturn, quantity: parseInt(e.target.value)})} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Log Return</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
