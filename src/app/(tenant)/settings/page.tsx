export default function Settings() {
  return (
    <div className="container animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1>Settings</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your platform preferences and ERP integrations.</p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Organization Profile</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Company Name</label>
            <input type="text" className="input" defaultValue="Acme Corp" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Contact Email</label>
            <input type="email" className="input" defaultValue="admin@acmecorp.com" />
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>Save Changes</button>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>ERP Integrations</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
          Connect your platform with enterprise systems like SAP or Infor to sync data automatically.
        </p>

        <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>SAP S/4HANA Integration</h3>
            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: 'rgba(var(--success), 0.2)', color: 'hsl(var(--success))', borderRadius: 'var(--radius-sm)' }}>Connected</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>API Endpoint URL</label>
              <input type="text" className="input" defaultValue="https://api.sap.example.com/v1" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>API Key</label>
              <input type="password" className="input" defaultValue="************************" />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button className="btn btn-outline">Test Connection</button>
              <button className="btn btn-primary">Update Config</button>
            </div>
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Infor CloudSuite Integration</h3>
            <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}>Connect</button>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Not configured.</p>
        </div>
      </div>
    </div>
  );
}
