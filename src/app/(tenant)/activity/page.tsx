'use client';

import { useStore } from '@/store/useStore';

export default function ActivityLogPage() {
  const logs = useStore(state => state.logs);

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Activity Log</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Audit trail of all inventory and system changes</p>
        </div>
      </div>

      <div className="card">
        {logs.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No activity recorded yet.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {logs.map((log, index) => (
              <div key={log.id} style={{ 
                display: 'flex', 
                gap: '1rem', 
                paddingBottom: index !== logs.length - 1 ? '1.5rem' : '0',
                borderBottom: index !== logs.length - 1 ? '1px solid var(--border-color)' : 'none'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--bg-secondary)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: 'hsl(var(--primary))'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{log.action}</h3>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {new Date(log.date).toLocaleString()}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: '1.5' }}>
                    {log.details}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    By {log.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
