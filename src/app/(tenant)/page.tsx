"use client";

import { useStore } from '@/store/useStore';

export default function Dashboard() {
  const products = useStore(state => state.products);
  const stores = useStore(state => state.stores);

  const totalRevenue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const activeStores = stores.filter(s => s.status === 'Active').length;
  const lowStockCount = products.filter(p => p.stock < 10 && p.stock > 0).length;

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back to StoreSync. Here's what's happening today.</p>
        </div>
        <button className="btn btn-primary">Download Report</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Inventory Value</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p style={{ fontSize: '0.75rem', color: 'hsl(var(--success))', marginTop: '0.5rem' }}>Calculated from current stock</p>
        </div>
        <div className="card">
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Active Stores</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>{activeStores}</p>
          <p style={{ fontSize: '0.75rem', color: 'hsl(var(--success))', marginTop: '0.5rem' }}>{stores.length} total registered</p>
        </div>
        <div className="card">
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Low Stock Items</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>{lowStockCount}</p>
          <p style={{ fontSize: '0.75rem', color: 'hsl(var(--danger))', marginTop: '0.5rem' }}>Requires immediate attention</p>
        </div>
        <div className="card">
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Sync Status</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>Online</p>
          <p style={{ fontSize: '0.75rem', color: 'hsl(var(--success))', marginTop: '0.5rem' }}>Last synced with SAP 2m ago</p>
        </div>
      </div>
      
      <div className="card" style={{ minHeight: '400px' }}>
        <h2>Recent Transactions</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>You made 265 sales this month.</p>
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          [Transaction Chart Placeholder]
        </div>
      </div>
    </div>
  );
}
