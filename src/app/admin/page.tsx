"use client";

import { useStore } from '@/store/useStore';

export default function AdminDashboard() {
  const tenants = useStore(state => state.tenants);

  const activeTenants = tenants.filter(t => t.status === 'Active').length;
  // Mock calculations for MRR
  const mrr = tenants.reduce((acc, t) => {
    if (t.status !== 'Active') return acc;
    if (t.plan === 'Enterprise') return acc + 999;
    if (t.plan === 'Pro') return acc + 299;
    return acc + 99;
  }, 0);

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Platform Overview</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Super Admin dashboard for monitoring SaaS health and metrics.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card">
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Monthly Recurring Revenue (MRR)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>${mrr.toLocaleString()}</p>
          <p style={{ fontSize: '0.75rem', color: 'hsl(var(--success))', marginTop: '0.5rem' }}>+12% from last month</p>
        </div>
        <div className="card">
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Active Customers</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>{activeTenants}</p>
          <p style={{ fontSize: '0.75rem', color: 'hsl(var(--success))', marginTop: '0.5rem' }}>{tenants.length} total tenants</p>
        </div>
        <div className="card">
          <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>System Health</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>99.99%</p>
          <p style={{ fontSize: '0.75rem', color: 'hsl(var(--success))', marginTop: '0.5rem' }}>All services operational</p>
        </div>
      </div>
      
      <div className="card" style={{ minHeight: '300px' }}>
        <h2>Revenue Growth</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Platform adoption over the last 12 months.</p>
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          [MRR Chart Placeholder]
        </div>
      </div>
    </div>
  );
}
