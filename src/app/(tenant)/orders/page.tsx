"use client";

import { useState } from 'react';
import { useStore } from '@/store/useStore';

export default function Orders() {
  const orders = useStore(state => state.orders).filter(o => o.type === 'Procurement');
  const createOrder = useStore(state => state.createOrder);
  const processOrder = useStore(state => state.processOrder);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newOrder, setNewOrder] = useState({
    productSku: '',
    quantity: 10,
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    createOrder({
      ...newOrder,
      type: 'Procurement',
      status: 'Pending',
      date: new Date().toISOString(),
    });
    setIsModalOpen(false);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Purchase Orders</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage procurement and restock inventory from suppliers.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Create PO</button>
      </div>

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1rem' }}>Order ID</th>
              <th style={{ padding: '1rem' }}>Product SKU</th>
              <th style={{ padding: '1rem' }}>Quantity</th>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>PO-{order.id.toUpperCase()}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{order.productSku}</td>
                <td style={{ padding: '1rem' }}>{order.quantity}</td>
                <td style={{ padding: '1rem' }}>{new Date(order.date).toLocaleDateString()}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)',
                    backgroundColor: order.status === 'Received' ? 'rgba(var(--success), 0.2)' : 'rgba(var(--warning), 0.2)', 
                    color: order.status === 'Received' ? 'hsl(var(--success))' : 'hsl(var(--warning))'
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  {order.status === 'Pending' ? (
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: 'hsl(var(--primary))', borderColor: 'hsl(var(--primary))' }} onClick={() => processOrder(order.id)}>
                      Mark Received
                    </button>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Completed</span>
                  )}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No purchase orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Create Purchase Order</h2>
            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Product SKU</label>
                <input required type="text" className="input" placeholder="e.g. WH-1000XM4" value={newOrder.productSku} onChange={e => setNewOrder({...newOrder, productSku: e.target.value})} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Quantity to Order</label>
                <input required type="number" min="1" className="input" value={newOrder.quantity} onChange={e => setNewOrder({...newOrder, quantity: parseInt(e.target.value)})} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit PO</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
