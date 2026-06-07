"use client";

import { useState } from 'react';
import { useStore, Tenant } from '@/store/useStore';

export default function AdminTenants() {
  const tenants = useStore(state => state.tenants);
  const addTenant = useStore(state => state.addTenant);
  const toggleTenantStatus = useStore(state => state.toggleTenantStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newTenant, setNewTenant] = useState<Omit<Tenant, 'id' | 'joinDate'>>({
    name: '',
    email: '',
    plan: 'Pro',
    status: 'Active',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    addTenant(newTenant);
    setIsModalOpen(false);
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Customer Companies</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your tenants and provision new customer accounts.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>+ Onboard New Company</button>
      </div>

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '1rem' }}>Company Name</th>
              <th style={{ padding: '1rem' }}>Admin Email</th>
              <th style={{ padding: '1rem' }}>Plan</th>
              <th style={{ padding: '1rem' }}>Joined</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map(tenant => (
              <tr key={tenant.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>{tenant.name}</td>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{tenant.email}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'hsl(var(--primary))' }}>
                    {tenant.plan}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{new Date(tenant.joinDate).toLocaleDateString()}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)',
                    backgroundColor: tenant.status === 'Active' ? 'rgba(var(--success), 0.2)' : 'rgba(var(--danger), 0.2)', 
                    color: tenant.status === 'Active' ? 'hsl(var(--success))' : 'hsl(var(--danger))'
                  }}>
                    {tenant.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button 
                    className="btn btn-outline" 
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }} 
                    onClick={() => toggleTenantStatus(tenant.id)}
                  >
                    {tenant.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Provision New Tenant</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              Creating a tenant automatically generates an isolated database schema and emails the login credentials to the admin.
            </p>
            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Company Name</label>
                <input required type="text" className="input" placeholder="e.g. Wayne Enterprises" value={newTenant.name} onChange={e => setNewTenant({...newTenant, name: e.target.value})} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Company Admin Email</label>
                <input required type="email" className="input" placeholder="admin@company.com" value={newTenant.email} onChange={e => setNewTenant({...newTenant, email: e.target.value})} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Subscription Plan</label>
                <select 
                  className="input" 
                  value={newTenant.plan} 
                  onChange={e => setNewTenant({...newTenant, plan: e.target.value as any})}
                >
                  <option value="Basic">Basic ($99/mo)</option>
                  <option value="Pro">Pro ($299/mo)</option>
                  <option value="Enterprise">Enterprise ($999/mo)</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Workspace</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
